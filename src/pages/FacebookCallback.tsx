
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const FacebookCallback = () => {
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('Processing Meta authorization...');

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
          
          // Notify parent window of error
          if (window.opener) {
            window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: errorDescription }, window.location.origin);
          }
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authorization code found in URL');
          
          // Notify parent window of error
          if (window.opener) {
            window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: 'No authorization code found' }, window.location.origin);
          }
          return;
        }

        setMessage('Processing Facebook authorization...');

        // Call our Supabase Edge Function to handle the token exchange securely
        const { data, error: functionError } = await supabase.functions.invoke('facebook-auth', {
          body: {
            code,
            state,
            redirect_uri: `${window.location.origin}/auth/facebook/callback`
          }
        });

        if (functionError) {
          console.error('Edge function error:', functionError);
          setStatus('error');
          setMessage('Failed to process Facebook authorization. Please try again.');
          
          // Notify parent window of error
          if (window.opener) {
            window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: 'Failed to process authorization' }, window.location.origin);
          }
          return;
        }

        if (data?.success) {
          setStatus('success');
          setMessage('Meta authorization complete! You can close this window.');
          
          // Notify parent window of success
          if (window.opener) {
            window.opener.postMessage({ type: 'FACEBOOK_AUTH_SUCCESS' }, window.location.origin);
            // Close the popup after a short delay
            setTimeout(() => {
              window.close();
            }, 2000);
          }
        } else {
          console.error('Facebook auth failed:', data?.error);
          setStatus('error');
          setMessage(data?.error || 'Failed to complete authorization. Please try again.');
          
          // Notify parent window of error
          if (window.opener) {
            window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: data?.error }, window.location.origin);
          }
        }
      } catch (error) {
        console.error('Error during Facebook authentication:', error);
        setStatus('error');
        setMessage('Unexpected error during authorization. Please try again.');
        
        // Notify parent window of error
        if (window.opener) {
          window.opener.postMessage({ type: 'FACEBOOK_AUTH_ERROR', error: 'Unexpected error' }, window.location.origin);
        }
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
          <p className="text-gray-500 text-sm">This window will close automatically.</p>
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
