import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  text?: string;
  type: "assistant" | "action" | "user";
  timestamp: Date;
  showCalendly?: boolean;
  id?: string;
  isLogged?: boolean;
}

export const useInternalChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasResponded, setUserHasResponded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>("email");
  
  // Generate or retrieve device ID
  const getDeviceId = () => {
    const storedId = localStorage.getItem('bamboo_device_id');
    if (storedId) {
      return storedId;
    } else {
      const newId = uuidv4();
      localStorage.setItem('bamboo_device_id', newId);
      return newId;
    }
  };
  
  // Generate or retrieve consistent conversation ID
  const getConversationId = () => {
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
  
  const findOrCreateConversation = async () => {
    try {
      setIsLoading(true);
      const deviceId = getDeviceId();
      // Get consistent conversation ID
      const conversationIdToUse = getConversationId();
      
      // Try to find existing conversation for this device + conversation ID
      const { data: existingConversations, error: fetchError } = await supabase
        .from('chat_conversations')
        .select('id, last_message_at')
        .eq('user_agent', deviceId)
        .eq('conversation_id', conversationIdToUse)
        .order('last_message_at', { ascending: false })
        .limit(1);
      
      if (fetchError) {
        console.error("Error fetching conversations:", fetchError);
      }
      
      // If conversation exists, use it
      if (existingConversations && existingConversations.length > 0) {
        const existingId = existingConversations[0].id;
        setConversationId(existingId);
        await loadMessagesForConversation(existingId);
        return existingId;
      }
      
      // Otherwise create a new conversation
      const userAgent = deviceId;
      
      const { data, error } = await supabase
        .from('chat_conversations')
        .insert([{ user_agent: userAgent, conversation_id: conversationIdToUse }])
        .select();
      
      if (error) {
        console.error("Error creating conversation:", error);
        return null;
      }
      
      if (data && data.length > 0) {
        setConversationId(data[0].id);
        return data[0].id;
      }
    } catch (error) {
      console.error("Error finding/creating conversation:", error);
    } finally {
      setIsLoading(false);
    }
    return null;
  };
  
  const loadMessagesForConversation = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('conversation_id', convId)
        .order('timestamp', { ascending: true });
      
      if (error) {
        console.error("Error loading messages:", error);
        initializeConversation();
        return;
      }
      
      if (data && data.length > 0) {
        // User has previously responded if there's at least one user message
        const hasUserMessage = data.some(msg => msg.sender === 'user');
        setUserHasResponded(hasUserMessage);
        
        // Convert database messages to UI messages
        const loadedMessages: Message[] = data.map(msg => ({
          text: msg.message,
          type: msg.sender as "assistant" | "user",
          timestamp: new Date(msg.timestamp || new Date()),
          showCalendly: msg.message.includes('book a quick live meeting with me'),
          id: msg.id,
          isLogged: true // Mark as already logged in database
        }));
        
        // Display the loaded messages
        setMessages(loadedMessages);
      } else {
        // If no messages, start with initial welcome messages
        initializeConversation();
      }
    } catch (error) {
      console.error("Error loading messages:", error);
      // Fall back to initial conversation
      initializeConversation();
    }
  };
  
  const logMessage = async (message: string, sender: string) => {
    try {
      // Ensure we have a conversation ID
      let convId = conversationId;
      if (!convId) {
        convId = await findOrCreateConversation();
        setConversationId(convId);
      }
      
      if (!convId) {
        console.error("Failed to create conversation");
        return;
      }
      
      // Update last_message_at in conversation
      await supabase
        .from('chat_conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', convId);
      
      // Insert message
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([{
          conversation_id: convId,
          message: message,
          sender: sender
        }])
        .select();
      
      if (error) {
        console.error("Error logging message:", error);
        return null;
      }
      
      return data && data.length > 0 ? data[0].id : null;
    } catch (error) {
      console.error("Error logging message:", error);
      return null;
    }
  };
  
  const initializeConversation = (existingMessages: Message[] = []) => {
    // If existing messages, use them (existing conversation)
    if (existingMessages.length > 0) {
      setMessages(existingMessages);
      return;
    }
    
    // For new conversations, we'll add the welcome messages with delay
    const initialMessages: Message[] = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded
      }
    ];
    
    // Set first message immediately
    setMessages(initialMessages);
    
    // Add second message after delay
    setTimeout(() => {
      const secondMessage = {
        text: "I just have a few quick questions to get started. If you'd rather chat live, you can book a quick meeting with me:",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded
      };
      
      setMessages(prev => [...prev, secondMessage]);
      
      // Add calendly widget after another delay
      setTimeout(() => {
        const calendlyMessage = {
          text: "",
          type: "assistant" as const,
          showCalendly: true,
          timestamp: new Date(),
          isLogged: userHasResponded
        };
        
        setMessages(prev => [...prev, calendlyMessage]);
        
        // Add fourth message after another delay
        setTimeout(() => {
          const fourthMessage = {
            text: "First, what's the best email to contact you?",
            type: "assistant" as const,
            timestamp: new Date(),
            isLogged: userHasResponded
          };
          
          setMessages(prev => [...prev, fourthMessage]);
          setCurrentQuestion("email");
          
          // Log initial messages to database if the user has already responded in a previous session
          if (userHasResponded && conversationId) {
            // Log the first four messages
            if (initialMessages[0].text) {
              logMessage(initialMessages[0].text, "assistant");
            }
            logMessage(secondMessage.text || "", "assistant");
            logMessage(fourthMessage.text || "", "assistant");
          }
        }, 1500);
      }, 1500);
    }, 1500);
  };
  
  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Website validation function
  const isValidWebsite = async (website: string): Promise<boolean> => {
    try {
      // Try to call our edge function to analyze the website
      const response = await fetch(`https://ncuidluikeknatuqiazj.supabase.co/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website })
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
  const getMarketingInsights = async (website: string): Promise<string> => {
    try {
      // Make request to our edge function
      const response = await fetch(`https://ncuidluikeknatuqiazj.supabase.co/functions/v1/analyze-website`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ website })
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
  
  const handleSendMessage = async (inputValue: string) => {
    // Add user message
    const userMessage = {
      text: inputValue,
      type: "user" as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Set user has responded flag
    setUserHasResponded(true);
    
    // Now log messages to database since user has responded
    // First log the user message
    const userMessageId = await logMessage(inputValue, "user");
    
    // Then log any assistant messages that haven't been logged yet
    const unloggedMessages = messages.filter(m => !m.isLogged && m.type === "assistant" && m.text);
    for (const msg of unloggedMessages) {
      if (msg.text) {
        await logMessage(msg.text, "assistant");
      }
    }

    // Check if we need to validate an email
    if (currentQuestion === "email") {
      if (isValidEmail(inputValue)) {
        // Valid email, proceed to next question
        setTimeout(async () => {
          const nextMessage = {
            text: "Thanks. Next, what's your business's website?",
            type: "assistant" as const,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, nextMessage]);
          setCurrentQuestion("website");
          
          // Log next message to Supabase
          await logMessage(nextMessage.text || "", "assistant");
        }, 1500);
      } else {
        // Invalid email, ask for it again
        setTimeout(async () => {
          const errorMessage = {
            text: "Whoops, that doesn't look like a valid email address. Can you try again?",
            type: "assistant" as const,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, errorMessage]);
          // Keep currentQuestion as "email" since we still need a valid email
          
          // Log error message to Supabase
          await logMessage(errorMessage.text || "", "assistant");
        }, 1500);
      }
    } else if (currentQuestion === "website") {
      // Show loading state
      setTimeout(async () => {
        const loadingMessage = {
          text: "Checking your website...",
          type: "assistant" as const,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, loadingMessage]);
        await logMessage(loadingMessage.text || "", "assistant");
        
        // Validate website
        const isValid = await isValidWebsite(inputValue);
        
        if (isValid) {
          // Show thinking message
          const thinkingMessage = {
            text: "Perfect. Here are some basic thoughts I have about your first campaign. Let me analyze your website...",
            type: "assistant" as const,
            timestamp: new Date()
          };
          
          setMessages(prev => [...prev, thinkingMessage]);
          await logMessage(thinkingMessage.text || "", "assistant");
          
          // Get marketing insights
          const insights = await getMarketingInsights(inputValue);
          
          // Show insights
          setTimeout(async () => {
            const insightsMessage = {
              text: insights,
              type: "assistant" as const,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, insightsMessage]);
            setCurrentQuestion("business");
            
            // Log insights to Supabase
            await logMessage(insights, "assistant");
            
            // Ask for business name after showing insights
            setTimeout(async () => {
              const nextQuestion = {
                text: "What's your business name?",
                type: "assistant" as const,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, nextQuestion]);
              setCurrentQuestion("complete");
              
              // Log next question to Supabase
              await logMessage(nextQuestion.text || "", "assistant");
            }, 2000);
          }, 2000);
        } else {
          // Invalid website
          setTimeout(async () => {
            const errorMessage = {
              text: "That website doesn't quite look right. Can you try again?",
              type: "assistant" as const,
              timestamp: new Date()
            };
            
            setMessages(prev => [...prev, errorMessage]);
            // Keep currentQuestion as "website" since we still need a valid website
            
            // Log error message to Supabase
            await logMessage(errorMessage.text || "", "assistant");
          }, 1500);
        }
      }, 1000);
    } else {
      // Handle other questions (keep existing functionality for future questions)
      setTimeout(async () => {
        const nextMessage = {
          text: "Thanks for sharing that information. Our team will be in touch with you shortly!",
          type: "assistant" as const,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, nextMessage]);
        setCurrentQuestion("complete");
        
        // Log next message to Supabase
        await logMessage(nextMessage.text || "", "assistant");
      }, 1500);
    }
  };
  
  const clearConversation = async () => {
    try {
      if (conversationId) {
        // Delete all messages for this conversation
        const { error: deleteError } = await supabase
          .from('chat_messages')
          .delete()
          .eq('conversation_id', conversationId);
        
        if (deleteError) {
          console.error("Error deleting messages:", deleteError);
          return false;
        }
        
        // Reset the conversation state
        setMessages([]);
        setUserHasResponded(false);
        
        // Reinitialize conversation with welcome messages
        initializeConversation();
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error clearing conversation:", error);
      return false;
    }
  };
  
  useEffect(() => {
    // Set up the initial conversation when component mounts
    findOrCreateConversation();
  }, []);
  
  return {
    messages,
    isLoading,
    handleSendMessage,
    clearConversation
  };
};
