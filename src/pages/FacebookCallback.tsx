import { useEffect, useState } from "react";

const FacebookCallback = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing Meta authorization...');

  useEffect(() => {
    const sendCodeToMCP = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code')?.trim();
        const state = urlParams.get('state')?.trim();

        if (!code) {
          setStatus('error');
          setMessage('No authorization code found in URL');
          return;
        }

        // Replace with your MCP server's public URL
        const MCP_SERVER_URL = "https://your-mcp-server.com/auth/facebook/callback";

        const response = await fetch(MCP_SERVER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // if you want to set cookies/session
          body: JSON.stringify({
            code,
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
        console.error('Error sending code to MCP server:', error);
        setStatus('error');
        setMessage('Unexpected error. Please try again.');
      }
    };

    sendCodeToMCP();
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
      </div>
    </div>
  );
};

export default FacebookCallback;