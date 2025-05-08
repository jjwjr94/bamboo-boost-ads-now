
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

interface UseChatOptions {
  skipIntroCallMessage?: boolean;
}

export const useChat = (options: UseChatOptions = {}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasResponded, setUserHasResponded] = useState(false);
  
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
      const storedId = localStorage.getItem('bamboo_default_conversation_id');
      if (storedId) {
        return storedId;
      } else {
        // Create new default conversation ID if none exists
        const newId = uuidv4();
        localStorage.setItem('bamboo_default_conversation_id', newId);
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
          showCalendly: msg.message.includes('book a kickoff call'),
          id: msg.id,
          isLogged: true // Mark as already logged in database
        }));
        
        // Always show the initial conversation messages first
        initializeConversation(loadedMessages);
      } else {
        // If no messages, start with initial greeting
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
  
  // Helper function to add messages with a delay
  const addMessageWithDelay = (message: Message, delay: number) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        setMessages(prev => [...prev, message]);
        resolve();
      }, delay);
    });
  };
  
  const initializeConversation = async (existingMessages: Message[] = []) => {
    // Initial welcome messages
    const initialMessages: Message[] = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded
      }
    ];
    
    // Add follow-up messages based on chat type
    const followUpMessages: Message[] = [];
    
    // For internal chat, add follow-up message right after the first two
    if (options.skipIntroCallMessage) {
      followUpMessages.push({
        text: "Thanks for sharing! Is there anything else you'd like to tell me about your business?",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded
      },
      {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date(),
        isLogged: userHasResponded
      });
    }
    // Add the intro call message only if not skipped and not internal chat
    else if (!options.skipIntroCallMessage) {
      followUpMessages.push({
        text: "To redeem and get started, let's chat. Just 15-minutes to start on the right foot. It's really important to me to learn about your business so your first campaign is a success.",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: userHasResponded
      },
      {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date(),
        isLogged: userHasResponded
      });
    }
    
    // Always start with the initial welcome messages, then add existing messages if any
    if (existingMessages.length > 0) {
      // Filter out any welcome messages from the database to avoid duplicates
      const nonWelcomeMessages = existingMessages.filter(msg => {
        return !(
          msg.type === "assistant" && 
          (
            msg.text?.includes("Hey! I'm Jay") ||
            msg.text?.includes("Congrats! 🎉") ||
            msg.text?.includes("book a 15-minute intro call") ||
            msg.text?.includes("I just have a few quick questions to get started")
          )
        );
      });
      
      // Start with the initial messages
      setMessages(initialMessages);
      
      // If there are existing messages, sequence them with delays
      if (nonWelcomeMessages.length > 0) {
        // Add each non-welcome message with a delay
        for (let i = 0; i < nonWelcomeMessages.length; i++) {
          await addMessageWithDelay(nonWelcomeMessages[i], 1500);
        }
      } else {
        // If no existing messages, add follow-up messages with delays
        for (let i = 0; i < followUpMessages.length; i++) {
          await addMessageWithDelay(followUpMessages[i], 1500);
        }
      }
    } else {
      // If no existing messages, just use the initial ones
      setMessages(initialMessages);
      
      // Add follow-up messages with delays
      for (let i = 0; i < followUpMessages.length; i++) {
        await addMessageWithDelay(followUpMessages[i], 1500);
      }
      
      // Log initial messages to database if the user has already responded in a previous session
      if (userHasResponded && conversationId) {
        initialMessages.forEach(async (message) => {
          if (message.text) {
            await logMessage(message.text, "assistant");
          }
        });
        
        // Also log follow-up messages
        followUpMessages.forEach(async (message) => {
          if (message.text) {
            await logMessage(message.text, "assistant");
          }
        });
      }
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
    
    // Sequence assistant responses with delays
    const responseText = options.skipIntroCallMessage ? 
      "Thanks for sharing! Is there anything else you'd like to tell me about your business?" :
      "Thanks for your message! To get started, please book a kickoff call.";
    
    const assistantMessage = {
      text: responseText,
      type: "assistant" as const,
      timestamp: new Date()
    };
    
    // Add first response after delay
    await addMessageWithDelay(assistantMessage, 1500);
    
    // Log assistant message to Supabase since user has responded
    const assistantMessageId = await logMessage(assistantMessage.text || "", "assistant");
    
    // Add calendar booking option for regular chat or if user asks for more info in internal chat
    if (!options.skipIntroCallMessage) {
      // Add calendar button after another delay
      const buttonMessage = {
        text: "",
        type: "assistant" as const,
        showCalendly: true,
        timestamp: new Date()
      };
      
      await addMessageWithDelay(buttonMessage, 1500);
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
