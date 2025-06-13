
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, state, redirect_uri } = await req.json();

    if (!code) {
      return new Response(
        JSON.stringify({ success: false, error: 'Authorization code is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get Facebook App credentials from Supabase secrets
    const FACEBOOK_APP_ID = Deno.env.get('FACEBOOK_APP_ID');
    const FACEBOOK_APP_SECRET = Deno.env.get('FACEBOOK_APP_SECRET');

    if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) {
      console.error('Facebook App credentials not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Facebook App credentials not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Exchanging Facebook code for access token...');

    // Exchange code for access token
    const params = new URLSearchParams({
      client_id: FACEBOOK_APP_ID,
      redirect_uri: redirect_uri,
      client_secret: FACEBOOK_APP_SECRET,
      code: code,
    });

    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?${params.toString()}`
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Facebook token exchange failed:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to exchange code for token' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      console.error('Facebook OAuth error:', tokenData.error);
      return new Response(
        JSON.stringify({ success: false, error: tokenData.error.message }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Successfully obtained Facebook access token');

    // TODO: Store the access token or send it to your MCP server
    // For now, we'll just return success
    // You can add your MCP server integration here
    const MCP_SERVER_URL = "https://your-mcp-server.com/auth/facebook/token";
    
    try {
      const mcpResponse = await fetch(MCP_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: tokenData.access_token,
          state,
          timestamp: new Date().toISOString(),
          source: 'meta_facebook_callback'
        }),
      });

      if (!mcpResponse.ok) {
        console.error('MCP server error:', await mcpResponse.text());
        return new Response(
          JSON.stringify({ success: false, error: 'Failed to send token to MCP server' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    } catch (mcpError) {
      console.error('Error calling MCP server:', mcpError);
      // Continue anyway - you might want to handle this differently
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Facebook auth error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
