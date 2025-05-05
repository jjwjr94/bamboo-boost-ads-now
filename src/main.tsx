
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'

// PostHog configuration
const posthogApiKey = 'phc_UEtvH2EB8m6N2yKsry2nlbMA1pQQYNnF0JPfYXO6lLU'
const posthogHost = 'https://us.i.posthog.com'

const options = {
  api_host: posthogHost,
}

createRoot(document.getElementById("root")!).render(
  <PostHogProvider 
    apiKey={posthogApiKey}
    options={options}
  >
    <App />
  </PostHogProvider>
);
