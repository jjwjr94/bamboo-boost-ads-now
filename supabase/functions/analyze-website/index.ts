
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { website } = await req.json();
    
    if (!website) {
      return new Response(
        JSON.stringify({ error: "Website URL is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Format website URL
    let websiteUrl = website;
    if (!websiteUrl.startsWith('http://') && !websiteUrl.startsWith('https://')) {
      websiteUrl = `https://${websiteUrl}`;
    }

    // Get OpenAI API key from environment variable
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You're a marketing strategist and research bot helping ad agencies understand new client websites.`
          },
          {
            role: "user",
            content: `We have a new prospective client with website, ${websiteUrl}

Based on their website, generate the following structured data:

Business Description — 2-3 sentence summary of what the business does.

Product List — A simple bulleted list of products or services they offer.

Marketing Objective — Choose one or two words to represent the key goal(s) for their campaign. (Examples: store visits, leads, website purchases). Use discretion in terms of how many objectives to prioritize. I.e. an e-commerce only business should just be "website purchases".

Top 3 Audiences — A prioritized list of ideal customer segments to target.

Channel Prioritization — Recommend how to sequence marketing activation across the following channels, from most to least important: Google PPC, YouTube, Meta, TikTok.

Output the result as structured JSON like this:
{
  "description": "....",
  "products": ["...", "..."],
  "objectives": ["...", "..."],
  "audiences": ["...", "...", "..."],
  "channel_priority": ["...", "...", "...", "..."]
}`
          }
        ]
      })
    });

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        success: true,
        data: data.choices[0].message.content
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
