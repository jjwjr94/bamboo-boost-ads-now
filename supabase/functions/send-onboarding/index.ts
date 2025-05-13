
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
    console.log("Received onboarding request");
    const body = await req.text();
    console.log("Request body text:", body);
    
    let data;
    try {
      data = JSON.parse(body);
      console.log("Parsed request data:", data);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    
    const { email, phone, companyUrl, companyDescription } = data as OnboardingRequest;

    // Validate inputs
    if (!email || !phone || !companyUrl || !companyDescription) {
      console.error("Missing required fields:", { email, phone, companyUrl, companyDescription });
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // During development, send an email to the verified email address
    // In production with a verified domain, you'd send to hello@withbamboo.com
    const verifiedEmail = "jay@withbamboo.com"; // Updated to the new verified email
    
    try {
      // Prepare email content that would normally go to hello@withbamboo.com
      const htmlContent = `
        <h2>New Onboarding Request from Bamboo AI</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company Website:</strong> <a href="${companyUrl}" target="_blank">${companyUrl}</a></p>
        <p><strong>Company Description:</strong></p>
        <p>${companyDescription.replace(/\n/g, "<br/>")}</p>
      `;
      
      console.log("Sending email with Resend");
      // Send email to the verified email (for development)
      const emailResult = await resend.emails.send({
        from: "Bamboo AI Onboarding <onboarding@resend.dev>",
        to: [verifiedEmail], // Send to the verified email
        reply_to: email,
        subject: "[DEV] New Onboarding Request (would go to hello@withbamboo.com)",
        html: htmlContent,
      });

      console.log("Resend API response:", emailResult);
      
      return new Response(JSON.stringify({ 
        success: true, 
        note: "Email sent to verified development email. In production, this would go to hello@withbamboo.com." 
      }), {
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
