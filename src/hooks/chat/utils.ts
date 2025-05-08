import { supabase, SUPABASE_PUBLISHABLE_KEY } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

// Device ID management
export const getDeviceId = (): string => {
  const storedId = localStorage.getItem('bamboo_device_id');
  if (storedId) {
    return storedId;
  } else {
    const newId = uuidv4();
    localStorage.setItem('bamboo_device_id', newId);
    return newId;
  }
};

// Conversation ID management
export const getConversationId = (): string => {
  // First check URL parameter
  const urlParam = new URLSearchParams(window.location.search).get('id');
  
  if (urlParam) {
    // If URL has parameter, use that
    return urlParam;
  } else {
    // Otherwise check local storage for a default conversation ID
    const storedId = localStorage.getItem('bamboo_internal_conversation_id');
    if (storedId) {
      return storedId;
    } else {
      // Create new default conversation ID if none exists
      const newId = uuidv4();
      localStorage.setItem('bamboo_internal_conversation_id', newId);
      return newId;
    }
  }
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Website validation
export const isValidWebsite = async (website: string): Promise<boolean> => {
  try {
    // Format website URL if missing protocol
    let formattedWebsite = website.trim();
    if (!formattedWebsite.startsWith('http://') && !formattedWebsite.startsWith('https://')) {
      formattedWebsite = `https://${formattedWebsite}`;
    }
    
    // Try to call our edge function to analyze the website
    const response = await fetch(`https://ncuidluikeknatuqiazj.supabase.co/functions/v1/analyze-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ website: formattedWebsite })
    });
    
    const data = await response.json();
    
    // If we get a response with no error, website exists
    return response.ok && !data.error;
  } catch (error) {
    console.error("Error validating website:", error);
    return false;
  }
};

// Get marketing insights from website
export const getMarketingInsights = async (website: string): Promise<string> => {
  try {
    // Format website URL if missing protocol
    let formattedWebsite = website.trim();
    if (!formattedWebsite.startsWith('http://') && !formattedWebsite.startsWith('https://')) {
      formattedWebsite = `https://${formattedWebsite}`;
    }
    
    // Make request to our edge function
    const response = await fetch(`https://ncuidluikeknatuqiazj.supabase.co/functions/v1/analyze-website`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
      },
      body: JSON.stringify({ website: formattedWebsite })
    });
    
    const data = await response.json();
    
    if (response.ok && data.success && data.data) {
      try {
        // Try to parse the JSON response
        const jsonResponse = JSON.parse(data.data);
        
        // Format the data into readable text
        let insightsText = `Based on my analysis of your website, here's what I think would work for your first campaign:\n\n`;
        
        insightsText += `**Your Business**: ${jsonResponse.description}\n\n`;
        
        insightsText += `**Your Products/Services**:\n`;
        jsonResponse.products.forEach((product: string) => {
          insightsText += `• ${product}\n`;
        });
        insightsText += `\n`;
        
        insightsText += `**Campaign Objectives**: ${jsonResponse.objectives.join(', ')}\n\n`;
        
        insightsText += `**Target Audiences**:\n`;
        jsonResponse.audiences.forEach((audience: string, index: number) => {
          insightsText += `${index + 1}. ${audience}\n`;
        });
        insightsText += `\n`;
        
        insightsText += `**Recommended Channel Strategy** (in order of priority):\n`;
        jsonResponse.channel_priority.forEach((channel: string, index: number) => {
          insightsText += `${index + 1}. ${channel}\n`;
        });
        
        return insightsText;
      } catch (error) {
        // If can't parse JSON, return the raw text
        return data.data;
      }
    } else {
      return "I couldn't analyze your website properly. Let's continue anyway - can you tell me more about your business?";
    }
  } catch (error) {
    console.error("Error getting marketing insights:", error);
    return "I couldn't analyze your website properly. Let's continue anyway - can you tell me more about your business?";
  }
};
