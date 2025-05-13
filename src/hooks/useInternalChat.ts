
import { useState, useEffect } from "react";
import type { Message } from "./chat/types";
import { getDeviceId, getConversationId } from "./chat/utils";
import { 
  findOrCreateConversation, 
  loadMessagesForConversation, 
  logMessage,
  deleteConversationMessages 
} from "./chat/chatDbService";
import { MessageManager } from "./chat/messageManager";

// Fix the re-export by using 'export type'
export type { Message } from "./chat/types";

export const useInternalChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userHasResponded, setUserHasResponded] = useState(false);
  const [messageManager, setMessageManager] = useState<MessageManager | null>(null);
  
  // Initialization
  useEffect(() => {
    const initChat = async () => {
      try {
        console.log("Initializing chat...");
        setIsLoading(true);
        const deviceId = getDeviceId();
        // Get consistent conversation ID
        const conversationIdToUse = getConversationId();
        
        // Find or create the conversation in the database
        const convId = await findOrCreateConversation(deviceId, conversationIdToUse);
        setConversationId(convId);
        
        if (convId) {
          console.log("Loading messages for conversation:", convId);
          // Load existing messages
          const data = await loadMessagesForConversation(convId);
          
          if (data && data.length > 0) {
            console.log("Found messages:", data.length);
            // User has previously responded if there's at least one user message
            const hasUserMessage = data.some(msg => msg.sender === 'user');
            setUserHasResponded(hasUserMessage);
            
            // Convert database messages to UI messages and ensure they're sorted by timestamp
            const loadedMessages: Message[] = data
              .map(msg => ({
                text: msg.message,
                type: msg.sender as "assistant" | "user",
                timestamp: new Date(msg.timestamp || new Date()),
                showCalendly: msg.message.includes('book a quick live meeting with me'),
                id: msg.id,
                isLogged: true // Mark as already logged in database
              }))
              .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()); // Ensure chronological order
            
            // Log the messages we're displaying to help debug ordering issues
            console.log("Messages after sorting:", 
              loadedMessages.map(m => ({
                text: m.text?.substring(0, 20) + "...",
                type: m.type,
                time: m.timestamp.toISOString()
              }))
            );
            
            // Initialize message manager with existing messages
            const manager = new MessageManager(loadedMessages, convId, hasUserMessage);
            setMessageManager(manager);
            
            // Display the loaded messages
            setMessages(loadedMessages);
          } else {
            console.log("No existing messages found, starting new conversation");
            // If no messages, start with initial welcome messages
            const manager = new MessageManager([], convId, false);
            setMessageManager(manager);
            await startNewConversation(manager);
          }
        } else {
          // Failed to create conversation
          console.error("Failed to create conversation");
          const manager = new MessageManager([], null, false);
          setMessageManager(manager);
          await startNewConversation(manager);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        const manager = new MessageManager([], null, false);
        setMessageManager(manager);
        await startNewConversation(manager);
      } finally {
        setIsLoading(false);
      }
    };
    
    initChat();
    
    // Add visibility change listener to refresh messages when tab becomes visible
    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && conversationId) {
        console.log("Tab became visible, refreshing messages");
        // Refresh messages from the database to ensure we have the latest state
        const data = await loadMessagesForConversation(conversationId);
        if (data && data.length > 0) {
          const refreshedMessages: Message[] = data
            .map(msg => ({
              text: msg.message,
              type: msg.sender as "assistant" | "user",
              timestamp: new Date(msg.timestamp || new Date()),
              showCalendly: msg.message.includes('book a quick live meeting with me'),
              id: msg.id,
              isLogged: true
            }))
            .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
          
          console.log("Refreshed messages:", refreshedMessages.length);
          
          // Update the message manager and state with refreshed messages
          if (messageManager) {
            messageManager.setMessages(refreshedMessages);
          }
          setMessages(refreshedMessages);
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // Start a new conversation with welcome messages
  const startNewConversation = async (manager: MessageManager) => {
    await manager.initializeConversation();
    setMessages(manager.getMessages());
    
    // Add second message after delay
    setTimeout(async () => {
      await manager.addSecondMessage();
      setMessages([...manager.getMessages()]);
      
      // Add calendly widget after another delay
      setTimeout(async () => {
        await manager.addCalendlyMessage();
        setMessages([...manager.getMessages()]);
        
        // Add email question after another delay
        setTimeout(async () => {
          await manager.addEmailQuestion();
          setMessages([...manager.getMessages()]);
        }, 1500);
      }, 1500);
    }, 1500);
  };
  
  // Handle sending messages
  const handleSendMessage = async (inputValue: string) => {
    if (!messageManager) return;
    
    // Add user message
    const userMessage = {
      text: inputValue,
      type: "user" as const,
      timestamp: new Date()
    };
    
    messageManager.addMessage(userMessage);
    setMessages([...messageManager.getMessages()]);
    
    // Set user has responded flag
    setUserHasResponded(true);
    messageManager.setUserHasResponded(true);
    
    // Log user message to database
    const convId = messageManager.getConversationId();
    if (convId) {
      await logMessage(convId, inputValue, "user");
      
      // Log any unlogged assistant messages
      const unloggedMessages = messageManager.getMessages().filter(m => 
        !m.isLogged && m.type === "assistant" && m.text
      );
      
      for (const msg of unloggedMessages) {
        if (msg.text) {
          await logMessage(convId, msg.text, "assistant");
        }
      }
    }
    
    // Process the response based on the current question
    const currentQuestion = messageManager.getCurrentQuestion();
    
    if (currentQuestion === "email") {
      setTimeout(async () => {
        await messageManager.handleEmailResponse(inputValue);
        setMessages([...messageManager.getMessages()]);
      }, 1500);
    } else if (currentQuestion === "website") {
      setTimeout(async () => {
        await messageManager.handleWebsiteResponse(inputValue);
        setMessages([...messageManager.getMessages()]);
      }, 1000);
    } else {
      // Handle other questions
      setTimeout(async () => {
        await messageManager.handleOtherResponse();
        setMessages([...messageManager.getMessages()]);
      }, 1500);
    }
  };
  
  // Clear conversation
  const clearConversation = async () => {
    try {
      if (conversationId) {
        // Delete all messages for this conversation
        const success = await deleteConversationMessages(conversationId);
        
        if (!success) {
          return false;
        }
        
        // Reset the conversation state
        setMessages([]);
        setUserHasResponded(false);
        
        if (messageManager) {
          messageManager.setMessages([]);
          messageManager.setUserHasResponded(false);
          // Reinitialize conversation with welcome messages
          await startNewConversation(messageManager);
        }
        
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error clearing conversation:", error);
      return false;
    }
  };
  
  return {
    messages,
    isLoading,
    handleSendMessage,
    clearConversation
  };
};
