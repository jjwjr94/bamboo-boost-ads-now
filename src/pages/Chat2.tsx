
import React, { useState, useRef, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Send, ArrowRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface Message {
  text?: string;
  type: "assistant" | "action" | "user";
  timestamp: Date;
  showCalendly?: boolean;
}

const Chat2 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Animate SVG Bamboo Growth",
      description: "The simplified SVG structure improves performance and reduces file size",
      date: "Mon",
      completed: false
    },
    {
      id: 2,
      title: "Animate SVG Bamboo Growth",
      description: "I've completed my analysis of your repository and identified the issue",
      date: "Mon",
      completed: false
    },
    {
      id: 3,
      title: "Update GitHub Repo with Logos and Favicon",
      description: "I'm still unable to access the repository at https://github...",
      date: "Sat",
      completed: false
    },
    {
      id: 4,
      title: "AI Agency Setup for Small Business Advertising",
      description: "Based on your preference for a name like 'Bamboo'...",
      date: "Sat",
      completed: false
    }
  ]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(1);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { 
      text: inputValue, 
      type: "user",
      timestamp: new Date()
    }]);
    
    // Clear input
    setInputValue("");
    
    // Simulate AI response after a delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "This solution addresses the specific animation issue while preserving all the benefits of the two-column layout approach we implemented earlier. The bamboo stalks should now slide up smoothly and sway gently, creating the dynamic visual effect you wanted without any visual artifacts or gaps.", 
        type: "assistant",
        timestamp: new Date()
      }]);
    }, 1000);
  };

  const selectTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    
    // Clear messages when switching tasks
    setMessages([
      { 
        text: "This solution addresses the specific animation issue while preserving all the benefits of the two-column layout approach we implemented earlier. The bamboo stalks should now slide up smoothly and sway gently, creating the dynamic visual effect you wanted without any visual artifacts or gaps.", 
        type: "assistant",
        timestamp: new Date()
      }
    ]);
  };

  useEffect(() => {
    // When messages change, scroll to bottom
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = mainContentRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Find the selected task
  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <div className="flex flex-grow pt-16 overflow-hidden">
        {/* Left Sidebar - Tasks List */}
        <div className="w-[320px] border-r bg-white flex flex-col">
          <div className="p-4 border-b">
            <Button variant="ghost" className="w-full justify-start text-left text-bamboo-navy">
              <span className="flex items-center">
                + New task
              </span>
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {tasks.map(task => (
              <div 
                key={task.id}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedTaskId === task.id ? 'bg-bamboo-primary/5 border-l-4 border-l-bamboo-primary' : ''}`}
                onClick={() => selectTask(task.id)}
              >
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8 border">
                    {task.id === 1 && (
                      <div className="bg-zinc-900 text-white w-full h-full flex items-center justify-center text-xs">M</div>
                    )}
                    {task.id !== 1 && (
                      <div className={`${task.id % 2 === 0 ? 'bg-gray-200' : 'bg-bamboo-primary text-white'} w-full h-full flex items-center justify-center text-xs`}>
                        {task.id % 2 === 0 ? '􀉖' : 'AI'}
                      </div>
                    )}
                  </Avatar>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium text-bamboo-navy">{task.title}</h3>
                    <p className="text-xs text-gray-500 truncate">{task.description}</p>
                  </div>
                  <div className="text-xs text-gray-400">{task.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Middle Content - Chat */}
        <div className="flex-grow flex flex-col h-full">
          {/* Header */}
          <div className="border-b bg-white p-4 flex items-center gap-2">
            <h2 className="text-lg font-medium text-bamboo-navy">Animate SVG Bamboo Growth</h2>
          </div>
          
          {/* Main content area - Adjust to accommodate fixed input box */}
          <div className="flex-grow p-4 overflow-y-auto pb-20" ref={mainContentRef}>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col gap-6">
                {/* Task description bullets */}
                <div className="bg-white rounded-lg p-5 shadow-sm">
                  <h3 className="font-medium text-lg mb-3 text-bamboo-navy">The simplified SVG structure:</h3>
                  <ul className="space-y-3 pl-5">
                    <li className="flex items-start">
                      <span className="text-bamboo-primary mr-2">•</span>
                      <span>The simplified SVG structure improves performance and reduces file size</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-bamboo-primary mr-2">•</span>
                      <span>The two-column layout with 70/30 split remains unchanged</span>
                    </li>
                  </ul>
                </div>
                
                {/* Chat messages */}
                {messages.map((message, index) => (
                  <div key={index} className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}>
                    {message.type === "assistant" ? (
                      <>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-10 w-10 border bg-zinc-900 text-white flex items-center justify-center">
                              <div className="text-sm">M</div>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{format(message.timestamp, "MMM d, h:mm a")}</p>
                          </TooltipContent>
                        </Tooltip>
                        <div className="bg-white p-4 rounded-lg rounded-tl-none max-w-[80%] shadow-sm border border-gray-100">
                          {message.text && <p className="text-bamboo-navy">{message.text}</p>}
                          {message.showCalendly && (
                            <Button 
                              className="mt-2 bg-bamboo-primary hover:bg-bamboo-secondary text-white"
                            >
                              Book a Meeting
                            </Button>
                          )}
                        </div>
                      </>
                    ) : message.type === "user" ? (
                      <>
                        <div className="bg-white p-4 rounded-lg rounded-tr-none max-w-[80%] shadow-sm border border-gray-100">
                          <p className="text-bamboo-navy">{message.text}</p>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-10 w-10 bg-bamboo-secondary text-white flex items-center justify-center">
                              <div className="text-lg font-medium">U</div>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{format(message.timestamp, "MMM d, h:mm a")}</p>
                          </TooltipContent>
                        </Tooltip>
                      </>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Message input area - Fixed to bottom */}
          <div className="border-t bg-white p-4 absolute bottom-0 left-[320px] right-[400px]">
            <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
              <Input 
                placeholder="Message Manus..." 
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
          </div>
        </div>
        
        {/* Right Sidebar - Code Preview */}
        <div className="w-[400px] border-l bg-white overflow-hidden flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <span className="text-sm">pasted_content.txt</span>
            </div>
          </div>
          <div className="p-4 overflow-y-auto flex-grow bg-gray-50">
            <pre className="text-xs text-gray-800 font-mono">
{`import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="backdrop-blur-sm w-full h-full">
        <img 
          src="/Hero banner 4.svg" 
          alt="Decorative bamboo background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      <div className="container mx-auto flex flex-col items-center text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-bamboo-navy mb-6">
          The <span className="bg-gradient-to-r from-[#00D1A1] to-[#5995ED] text-transparent bg-clip-text">AI Ad Agency</span> built for Small and Medium Size Business
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Launch ads and grow your business today. No technical marketing knowledge required. No waiting around for overpriced freelancer.
        </p>
        <div className="flex justify-center gap-4">
          <Button 
            className="bg-bamboo-primary hover:bg-bamboo-secondary text-white font-medium rounded-md text-lg px-8 py-6 shadow-sm flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat2;
