
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

    // The email we will send to - in development mode, we need to use a verified email
    // For production, you would verify your domain at resend.com/domains
    const toEmail = "jay@adocointech.com"; // This should be a verified email in your Resend account

    // Send email
    try {
      const data = await resend.emails.send({
        from: "Bamboo AI Feedback <onboarding@resend.dev>",
        to: [toEmail],
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
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (emailError: any) {
      // If the email fails to send, log the error but still consider the feedback submission successful
      console.error("Error sending email:", emailError);
      
      // Return success but with a warning
      return new Response(
        JSON.stringify({ 
          success: true, 
          warning: "Feedback received but there was an issue with the email notification" 
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
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
