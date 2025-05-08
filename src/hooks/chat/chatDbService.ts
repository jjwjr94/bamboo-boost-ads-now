
import { supabase } from "@/integrations/supabase/client";

export const findOrCreateConversation = async (deviceId: string, conversationId: string) => {
  try {
    // Try to find existing conversation for this device + conversation ID
    const { data: existingConversations, error: fetchError } = await supabase
      .from('chat_conversations')
      .select('id, last_message_at')
      .eq('user_agent', deviceId)
      .eq('conversation_id', conversationId)
      .order('last_message_at', { ascending: false })
      .limit(1);
    
    if (fetchError) {
      console.error("Error fetching conversations:", fetchError);
    }
    
    // If conversation exists, use it
    if (existingConversations && existingConversations.length > 0) {
      return existingConversations[0].id;
    }
    
    // Otherwise create a new conversation
    const { data, error } = await supabase
      .from('chat_conversations')
      .insert([{ user_agent: deviceId, conversation_id: conversationId }])
      .select();
    
    if (error) {
      console.error("Error creating conversation:", error);
      return null;
    }
    
    if (data && data.length > 0) {
      return data[0].id;
    }
  } catch (error) {
    console.error("Error finding/creating conversation:", error);
  }
  return null;
};

export const loadMessagesForConversation = async (conversationId: string) => {
  try {
    // Explicitly specify order by timestamp ascending to ensure chronological order
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });
    
    if (error) {
      console.error("Error loading messages:", error);
      return null;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error loading messages:", error);
    return null;
  }
};

export const logMessage = async (conversationId: string, message: string, sender: string) => {
  try {
    if (!conversationId) {
      console.error("No conversation ID provided");
      return null;
    }
    
    // Update last_message_at in conversation
    await supabase
      .from('chat_conversations')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', conversationId);
    
    // Insert message
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        conversation_id: conversationId,
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

export const deleteConversationMessages = async (conversationId: string) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('conversation_id', conversationId);
    
    if (error) {
      console.error("Error deleting messages:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error clearing conversation:", error);
    return false;
  }
};
