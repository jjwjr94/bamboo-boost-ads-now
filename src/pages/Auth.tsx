
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { CheckCircle, ExternalLink } from "lucide-react";

const Auth = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a random state parameter for OAuth security
  const generateState = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // Check if user is already connected (you can expand this logic)
  useEffect(() => {
    // Check localStorage or make an API call to verify connection status
    const connectedStatus = localStorage.getItem('facebook_connected');
    if (connectedStatus === 'true') {
      setIsConnected(true);
    }
  }, []);

  const handleFacebookLogin = () => {
    setIsLoading(true);
    
    const state = generateState();
    localStorage.setItem('facebook_oauth_state', state);
    
    const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=190101134180454&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/facebook/callback')}&state=${state}&scope=ads_management%2Cads_read%2Cemail%2Cpublic_profile`;
    
    // Open Facebook OAuth in a popup window
    const popup = window.open(
      facebookAuthUrl,
      'facebook-auth',
      'width=600,height=600,scrollbars=yes,resizable=yes'
    );

    // Listen for popup closure or success message
    const checkClosed = setInterval(() => {
      if (popup?.closed) {
        clearInterval(checkClosed);
        setIsLoading(false);
        
        // Check if authentication was successful
        const connectedStatus = localStorage.getItem('facebook_connected');
        if (connectedStatus === 'true') {
          setIsConnected(true);
        }
      }
    }, 1000);

    // Listen for messages from popup
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'FACEBOOK_AUTH_SUCCESS') {
        setIsConnected(true);
        localStorage.setItem('facebook_connected', 'true');
        popup?.close();
        setIsLoading(false);
      } else if (event.data.type === 'FACEBOOK_AUTH_ERROR') {
        setIsLoading(false);
        popup?.close();
      }
    };

    window.addEventListener('message', handleMessage);
    
    // Cleanup
    setTimeout(() => {
      window.removeEventListener('message', handleMessage);
    }, 300000); // 5 minutes timeout
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    localStorage.removeItem('facebook_connected');
    localStorage.removeItem('facebook_oauth_state');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Container>
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Meta/Facebook Integration
              </CardTitle>
              <CardDescription className="text-center">
                Connect your Meta/Facebook account to manage your ads
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isConnected ? (
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <p>By connecting your Meta account, you'll be able to:</p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Manage your ads</li>
                      <li>Read ads data</li>
                      <li>Access your profile information</li>
                    </ul>
                  </div>
                  
                  <Button
                    onClick={handleFacebookLogin}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Connecting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Connect with Meta
                      </div>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-6 w-6" />
                    <span className="font-semibold">Connected to Meta</span>
                  </div>
                  
                  <div className="text-sm text-gray-600 text-center">
                    Your Meta/Facebook account is successfully connected. You can now manage your ads and access your data.
                  </div>
                  
                  <Button
                    onClick={handleDisconnect}
                    variant="outline"
                    className="w-full"
                  >
                    Disconnect
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Auth;
