
import { useEffect, useState } from "react";

const OAuth2Callback = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing authorization...');

  useEffect(() => {
    const sendCodeToWebhook = async () => {
      try {
        // Extract the authorization code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (!code) {
          setStatus('error');
          setMessage('No authorization code found in URL');
          return;
        }

        console.log('Authorization code:', code);

        // Send the code to the webhook
        const response = await fetch('https://jayjeffwong.app.n8n.cloud/webhook/cdd21577-04ee-4881-83e1-b9f1bb188cf6', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            timestamp: new Date().toISOString(),
            source: 'oauth2_callback'
          }),
        });

        if (response.ok) {
          setStatus('success');
          setMessage('Authorization code sent successfully!');
        } else {
          throw new Error(`Webhook responded with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error sending code to webhook:', error);
        setStatus('error');
        setMessage('Failed to send authorization code. Please try again.');
      }
    };

    sendCodeToWebhook();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Authorization Complete!</h1>
        
        <div className="mb-6">
          {status === 'processing' && (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          )}
          
          {status === 'success' && (
            <div className="text-green-600">
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

export default OAuth2Callback;
