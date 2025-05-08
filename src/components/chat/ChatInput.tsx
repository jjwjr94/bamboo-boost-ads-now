
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input 
        placeholder="Ask Bamboo..." 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-grow"
      />
      <Button 
        type="submit" 
        className="bg-bamboo-primary hover:bg-bamboo-secondary text-white"
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default ChatInput;
