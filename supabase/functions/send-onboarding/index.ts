
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OnboardingRequest {
  email: string;
  phone: string;
  companyUrl: string;
  companyDescription: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, phone, companyUrl, companyDescription } = await req.json() as OnboardingRequest;

    // Validate inputs
    if (!email || !phone || !companyUrl || !companyDescription) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send email to hello@withbamboo.com
    try {
      const data = await resend.emails.send({
        from: "Bamboo AI Onboarding <onboarding@resend.dev>",
        to: ["hello@withbamboo.com"],
        reply_to: email,
        subject: "New Onboarding Request",
        html: `
          <h2>New Onboarding Request from Bamboo AI</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Company Website:</strong> <a href="${companyUrl}" target="_blank">${companyUrl}</a></p>
          <p><strong>Company Description:</strong></p>
          <p>${companyDescription.replace(/\n/g, "<br/>")}</p>
        `,
      });

      console.log("Onboarding email sent successfully:", data);
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (emailError: any) {
      console.error("Error sending onboarding email:", emailError);
      
      return new Response(
        JSON.stringify({ 
          error: "Failed to send email",
          details: emailError.message
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
  } catch (error: any) {
    console.error("Error in send-onboarding function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
