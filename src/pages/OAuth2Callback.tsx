
import { useEffect, useState } from "react";

const OAuth2Callback = () => {
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    // Extract the authorization code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    setAuthCode(code);
    console.log('Authorization code:', code);
    // Send this code back to your system
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Authorization Successful!</h1>
        <p className="text-gray-600 mb-4">Authorization code:</p>
        <div className="bg-gray-100 p-4 rounded border font-mono text-sm break-all mb-4">
          {authCode || 'No code found'}
        </div>
        <p className="text-gray-600">Send this code to complete the setup.</p>
      </div>
    </div>
  );
};

export default OAuth2Callback;
