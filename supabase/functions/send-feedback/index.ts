
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@1.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  name: string;
  email: string;
  feedback: string;
  contactConsent: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, feedback, contactConsent } = await req.json() as FeedbackRequest;

    // Validate inputs
    if (!name || !email || !feedback) {
      return new Response(
        JSON.stringify({ error: "Name, email and feedback are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Send email
    const data = await resend.emails.send({
      from: "Bamboo AI Feedback <onboarding@resend.dev>",
      to: ["notifications@bamboo-ai.com"], // Replace with your actual email
      reply_to: contactConsent ? email : undefined,
      subject: `New Feedback from ${name}`,
      html: `
        <h2>New Feedback from Bamboo AI</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact consent:</strong> ${contactConsent ? "Yes" : "No"}</p>
        <p><strong>Feedback:</strong></p>
        <p>${feedback.replace(/\n/g, "<br/>")}</p>
      `,
    });

    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-feedback function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
