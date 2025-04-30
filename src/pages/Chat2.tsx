import React, { useState, useRef, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Send, Link, ChevronLeft, ChevronRight, BarChart2, Code, Github, BrainCircuit } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  showChart?: boolean;
  chartType?: "performance" | "table";
  hasReportLink?: boolean;
}

const Chat2 = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "TikTok Campaign Report",
      description: "Weekly performance report for your TikTok campaign",
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
  const [rightPanelContent, setRightPanelContent] = useState<"chart" | null>("chart");
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  const performanceData = [
    { platform: 'TikTok', conversions: 120, cpa: 7.08 },
    { platform: 'Meta', conversions: 80, cpa: 9.38 },
    { platform: 'Google', conversions: 55, cpa: 10.00 },
  ];
  
  const tableData = [
    { platform: 'TikTok', spend: 850, cpa: 7.08, conversions: 120, cpm: 4.25 },
    { platform: 'Meta', spend: 600, cpa: 9.38, conversions: 80, cpm: 6.90 },
    { platform: 'Google', spend: 550, cpa: 10.00, conversions: 55, cpm: 5.60 },
    { platform: 'Total', spend: 2000, cpa: 8.33, conversions: 255, cpm: '-' },
  ];
  
  const creativeData = [
    { type: 'Video (UGC)', asset: 'influencer-1.mp4', spend: 400, cpa: 6.25, conversions: 64, cpm: 3.80, ctr: 2.9 },
    { type: 'Video (Brand)', asset: 'glow-promo-hero.mp4', spend: 300, cpa: 7.50, conversions: 40, cpm: 4.90, ctr: 2.1 },
    { type: 'Static Image', asset: 'serum_flatlay.png', spend: 150, cpa: 9.00, conversions: 16, cpm: 6.00, ctr: 1.5 },
    { type: 'Carousel', asset: 'routine_steps_set', spend: 100, cpa: 10.00, conversions: 10, cpm: 5.00, ctr: 1.8 },
  ];
  
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
      if (inputValue.toLowerCase() === "creative") {
        setMessages(prev => [...prev, { 
          text: "Here's your creative performance breakdown 🎨\n\n🖼️ Performance by Creative", 
          type: "assistant",
          timestamp: new Date(),
          showChart: true,
          chartType: "table"
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            text: "Top performer: UGC video (influencer-1.mp4) with a CPA of $6.25 and 64 conversions.\nWant me to scale that asset across other channels or create a variant?", 
            type: "assistant",
            timestamp: new Date()
          }]);
        }, 1000);
      } else {
        setMessages(prev => [...prev, { 
          text: "I'll help you with that. Is there anything specific you'd like to know about the campaign?", 
          type: "assistant",
          timestamp: new Date()
        }]);
      }
    }, 1000);
  };
  
  const showReportInRightPanel = () => {
    setRightPanelContent("chart");
    setRightPanelCollapsed(false);
  };

  const selectTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setRightPanelCollapsed(true); // Always collapse right panel when changing tasks
    
    // Update messages when switching tasks
    if (taskId === 1) {
      setMessages([
        { 
          text: "Here's your weekly performance [report] 📊", 
          type: "assistant",
          timestamp: new Date(),
          showChart: true,
          chartType: "performance",
          hasReportLink: true
        }
      ]);
    } else {
      setMessages([
        { 
          text: "This solution addresses the specific animation issue while preserving all the benefits of the two-column layout approach we implemented earlier. The bamboo stalks should now slide up smoothly and sway gently, creating the dynamic visual effect you wanted without any visual artifacts or gaps.", 
          type: "assistant",
          timestamp: new Date()
        }
      ]);
    }
  };

  useEffect(() => {
    // When messages change, scroll to bottom
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = mainContentRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Find the selected task
  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  // Helper function to process message text and apply link formatting
  const renderMessageText = (message: Message) => {
    if (!message.text) return null;
    
    if (message.hasReportLink) {
      return (
        <p className="text-bamboo-navy whitespace-pre-line">
          {message.text.split('[report]').map((part, index, array) => {
            // If this is the last part or not the first part 
            if (index === array.length - 1 || index > 0) {
              return <React.Fragment key={index}>{part}</React.Fragment>
            }
            // This is the first part, so add the link after it
            return (
              <React.Fragment key={index}>
                {part}
                <span 
                  className="text-bamboo-primary underline cursor-pointer inline-flex items-center"
                  onClick={showReportInRightPanel}
                >
                  report
                  <Link className="h-3 w-3 inline-block ml-0.5" />
                </span>
              </React.Fragment>
            )
          })}
        </p>
      );
    }
    
    return <p className="text-bamboo-navy whitespace-pre-line">{message.text}</p>;
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        
        <ResizablePanelGroup 
          direction="horizontal" 
          className="flex flex-grow pt-16 overflow-hidden"
        >
          {/* Left Sidebar - Tasks List */}
          <ResizablePanel 
            defaultSize={20} 
            minSize={15}
            maxSize={30}
            className="bg-gray-50 flex flex-col border-r"
          >
            <div className="p-4 border-b bg-white flex items-center h-16">
              <Button variant="ghost" className="w-full justify-start text-left text-bamboo-navy flex items-center">
                + New task
              </Button>
            </div>
            
            <div className="flex-grow overflow-y-auto pb-24">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedTaskId === task.id ? 'bg-bamboo-primary/5 border-l-4 border-l-bamboo-primary' : 'border-b border-gray-100'}`}
                  onClick={() => selectTask(task.id)}
                >
                  <div className="flex gap-3 items-center">
                    <Avatar className="h-8 w-8 border flex-shrink-0 bg-gray-200 flex items-center justify-center">
                      {task.id === 1 && <BarChart2 className="h-4 w-4 text-gray-600" />}
                      {task.id === 2 && <Code className="h-4 w-4 text-gray-600" />}
                      {task.id === 3 && <Github className="h-4 w-4 text-gray-600" />}
                      {task.id === 4 && <BrainCircuit className="h-4 w-4 text-gray-600" />}
                      {/* Fallback for any other tasks */}
                      {task.id > 4 && <BrainCircuit className="h-4 w-4 text-gray-600" />}
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm font-medium text-bamboo-navy truncate overflow-hidden">{task.title}</h3>
                      <p className="text-xs text-gray-500 truncate overflow-hidden">{task.description}</p>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">{task.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Middle Content - Chat */}
          <ResizablePanel 
            defaultSize={rightPanelCollapsed ? 80 : 50}
            minSize={30}
            className="flex flex-col h-full relative overflow-hidden"
          >
            {/* Header */}
            <div className="border-b bg-white p-4 flex items-center gap-2 h-16">
              <h2 className="text-lg font-medium text-bamboo-navy flex items-center">{selectedTask?.title || "Task"}</h2>
            </div>
            
            {/* Messages container */}
            <div className="relative flex-grow overflow-hidden">
              <div className="overflow-y-auto h-full pb-24" ref={mainContentRef}>
                <div className="p-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col gap-6">
                      {/* Chat messages */}
                      {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}>
                          {message.type === "assistant" ? (
                            <>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-10 w-10 border flex items-center justify-center">
                                    <img src="/lovable-uploads/ee7f1b89-e60e-4121-8fb6-dba324f20c21.png" alt="Bamboo" className="w-full h-full object-cover" />
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{format(message.timestamp, "MMM d, h:mm a")}</p>
                                </TooltipContent>
                              </Tooltip>
                              <div className="bg-white p-4 rounded-lg rounded-tl-none max-w-[80%] shadow-sm border border-gray-100">
                                {renderMessageText(message)}
                                
                                {message.showChart && message.chartType === "performance" && (
                                  <Card className="mt-4">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-sm font-medium flex items-center">Platform Conversions</CardTitle>
                                      <CardDescription className="text-xs">TikTok is outperforming other platforms by 35% in CPA</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <ChartContainer config={{}}>
                                        <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                          <XAxis dataKey="platform" />
                                          <YAxis />
                                          <RechartsTooltip 
                                            content={({ active, payload }) => {
                                              if (active && payload && payload.length) {
                                                return (
                                                  <div className="bg-white p-2 border rounded shadow-sm">
                                                    <p className="text-sm font-medium">{`${payload[0].payload.platform}`}</p>
                                                    <p className="text-xs">{`Conversions: ${payload[0].value}`}</p>
                                                    <p className="text-xs">{`CPA: $${payload[0].payload.cpa.toFixed(2)}`}</p>
                                                  </div>
                                                );
                                              }
                                              return null;
                                            }}
                                          />
                                          <Bar dataKey="conversions" fill="#00D1A1" />
                                        </BarChart>
                                      </ChartContainer>
                                    </CardContent>
                                  </Card>
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
              </div>
              
              {/* Message input area - fixed at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 border-t bg-white p-4 z-10 shadow-md">
                <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
                  <Input 
                    placeholder="Message Bamboo..." 
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
          </ResizablePanel>
          
          {!rightPanelCollapsed && <ResizableHandle withHandle />}
          
          {/* Right Sidebar - Report Panel */}
          {!rightPanelCollapsed && (
            <ResizablePanel 
              defaultSize={30}
              minSize={20}
              maxSize={50}
              className="bg-white overflow-hidden flex flex-col border-l"
            >
              <div className="p-4 border-b flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <div className="text-bamboo-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="M18 17V9"></path>
                      <path d="M13 17V5"></path>
                      <path d="M8 17v-3"></path>
                    </svg>
                  </div>
                  <span className="text-sm">Performance Report</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setRightPanelCollapsed(true)}
                  className="h-8 w-8"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 overflow-y-auto flex-grow bg-gray-50">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">Platform Conversions</CardTitle>
                      <CardDescription className="text-xs">Overall performance across platforms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={{}}>
                        <BarChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="platform" />
                          <YAxis />
                          <RechartsTooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="bg-white p-2 border rounded shadow-sm">
                                    <p className="text-sm font-medium">{`${payload[0].payload.platform}`}</p>
                                    <p className="text-xs">{`Conversions: ${payload[0].value}`}</p>
                                    <p className="text-xs">{`CPA: $${payload[0].payload.cpa.toFixed(2)}`}</p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend />
                          <Bar dataKey="conversions" fill="#00D1A1" name="Conversions" />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">Platform Performance Summary</CardTitle>
                      <CardDescription className="text-xs">Detailed metrics by platform</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border px-4 py-2 text-left">Platform</th>
                              <th className="border px-4 py-2 text-left">Spend</th>
                              <th className="border px-4 py-2 text-left">CPA</th>
                              <th className="border px-4 py-2 text-left">Conversions</th>
                              <th className="border px-4 py-2 text-left">CPM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, i) => (
                              <tr key={i} className={row.platform === 'Total' ? 'font-medium bg-gray-50' : ''}>
                                <td className="border px-4 py-2">{row.platform}</td>
                                <td className="border px-4 py-2">${row.spend}</td>
                                <td className="border px-4 py-2">${row.cpa.toFixed(2)}</td>
                                <td className="border px-4 py-2">{row.conversions}</td>
                                <td className="border px-4 py-2">{typeof row.cpm === 'number' ? `$${row.cpm.toFixed(2)}` : row.cpm}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Key Insights:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>TikTok is outperforming Meta by 24% in CPA efficiency</li>
                      <li>Google has the highest CPA at $10.00</li>
                      <li>Overall campaign ROAS is positive at 2.4x</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </TooltipProvider>
  );
};

export default Chat2;
