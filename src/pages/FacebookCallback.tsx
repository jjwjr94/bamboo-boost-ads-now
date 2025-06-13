
import { useEffect, useState } from "react";

const FacebookCallback = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing Meta authorization...');

  const exchangeCodeForToken = async (code: string) => {
    // You'll need to replace these with your actual Facebook App credentials
    const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID || 'YOUR_FACEBOOK_APP_ID';
    const FACEBOOK_APP_SECRET = process.env.REACT_APP_FACEBOOK_APP_SECRET || 'YOUR_FACEBOOK_APP_SECRET';
    const REDIRECT_URI = `${window.location.origin}/auth/facebook/callback`;

    const params = new URLSearchParams({
      client_id: FACEBOOK_APP_ID,
      redirect_uri: REDIRECT_URI,
      client_secret: FACEBOOK_APP_SECRET,
      code,
    });

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/oauth/access_token?${params.toString()}`
      );
      
      if (!response.ok) {
        throw new Error(`Facebook API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Facebook OAuth error: ${data.error.message}`);
      }
      
      return data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };

  useEffect(() => {
    const handleFacebookAuth = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')?.trim();
        const state = urlParams.get('state')?.trim();
        const error = urlParams.get('error');

        // Check for OAuth errors from Facebook
        if (error) {
          const errorDescription = urlParams.get('error_description') || 'Unknown error';
          console.error('Facebook OAuth error:', error, errorDescription);
          setStatus('error');
          setMessage(`Facebook authorization failed: ${errorDescription}`);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code found in URL');
          return;
        }

        setMessage('Exchanging code for access token...');
        
        // Exchange the code for an access token
        const accessToken = await exchangeCodeForToken(code);
        
        setMessage('Sending token to server...');

        // Replace with your MCP server's public URL
        const MCP_SERVER_URL = "https://your-mcp-server.com/auth/facebook/token";

        const response = await fetch(MCP_SERVER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // if you want to set cookies/session
          body: JSON.stringify({
            access_token: accessToken,
            state,
            timestamp: new Date().toISOString(),
            source: 'meta_facebook_callback'
          }),
        });

        if (response.ok) {
          setStatus('success');
          setMessage('Meta authorization complete! You can close this window.');
        } else {
          const errorText = await response.text();
          console.error(`MCP server responded with status: ${response.status}`, errorText);
          setStatus('error');
          setMessage('Failed to complete authorization. Please try again.');
        }
      } catch (error) {
        console.error('Error during Facebook authentication:', error);
        setStatus('error');
        setMessage('Unexpected error during authorization. Please try again.');
      }
    };

    handleFacebookAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Meta Authorization</h1>
        <div className="mb-6">
          {status === 'processing' && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
          {status === 'success' && (
            <div className="text-blue-600">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-600">
              <svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>
        <p className={`text-gray-600 mb-4 ${status === 'error' ? 'text-red-600' : ''}`}>
          {message}
        </p>
        {status === 'success' && (
          <p className="text-gray-500 text-sm">You can close this window.</p>
        )}
        {status === 'error' && (
          <p className="text-gray-500 text-sm mt-4">
            Check the console for detailed error information.
          </p>
        )}
      </div>
    </div>
  );
};

export default FacebookCallback;
