import React, { useState, useRef, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Send, Link, ChevronLeft, ChevronRight, BarChart2, Code, Github, BrainCircuit, Menu } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

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
      title: "Let's Get Started",
      description: "Welcome to Bamboo! To get started please send your website URL.",
      date: "Wed",
      completed: false
    },
  ]);
  
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(1);
  const [rightPanelContent, setRightPanelContent] = useState<"chart" | null>("chart"); 
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
  const [leftSidebarVisible, setLeftSidebarVisible] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
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
    
    setMessages(prev => [...prev, { 
      text: inputValue, 
      type: "user",
      timestamp: new Date()
    }]);
    setInputValue("");
    
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
    
    if (isMobile) {
      setLeftSidebarVisible(false);
    }
  };
  
  const showReportInRightPanel = () => {
    setRightPanelContent("chart");
    setRightPanelCollapsed(false);
  };

  const selectTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setRightPanelCollapsed(true); 
    
    if (taskId === 1) {
      setMessages([
        { 
          text: "🎉 Congrats! Your TikTok campaign is live! 🚀\nYou're now reaching thousands of potential customers across TikTok, Meta, and Google.", 
          type: "assistant",
          timestamp: new Date()
        },
        { 
          text: "Woohoo!! 🎉", 
          type: "user",
          timestamp: new Date()
        },
        { 
          text: "Here's your weekly performance [report] 📊\n\n📈 Overall Campaign Performance\n(based on last 7 days)", 
          type: "assistant",
          timestamp: new Date(),
          showChart: false,
          chartType: "performance",
          hasReportLink: true
        },
        { 
          text: "To improve efficiency, I've shifted $200 from Meta to TikTok, where your CPA is 24% lower and conversions are higher. This will help maximize ROAS.", 
          type: "assistant",
          timestamp: new Date()
        },
        { 
          text: "Would you like to do a performance deep dive?\n\n🔍 Audience\n\n🌍 Geography\n\n🎨 Creative", 
          type: "assistant",
          timestamp: new Date()
        },
        { 
          text: "🎨 Creative", 
          type: "user",
          timestamp: new Date()
        }
      ]);
    } else {
      setMessages([
        { 
          text: "ERROR", 
          type: "assistant",
          timestamp: new Date()
        }
      ]);
    }
    
    if (isMobile) {
      setLeftSidebarVisible(false);
    }
  };

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = mainContentRef.current.scrollHeight;
    }
  }, [messages]);
  
  const selectedTask = tasks.find(task => task.id === selectedTaskId);

  const renderMessageText = (message: Message) => {
    if (!message.text) return null;
    
    if (message.hasReportLink) {
      return (
        <p className="text-bamboo-navy whitespace-pre-line">
          {message.text.split('[report]').map((part, index, array) => {
            if (index === array.length - 1 || index > 0) {
              return <React.Fragment key={index}>{part}</React.Fragment>
            }
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
        
        <div className="flex flex-grow pt-16 overflow-hidden min-h-0">
          
          {/* Left Sidebar - Tasks List (Responsive) */}
          <div 
            className={`${
              isMobile 
                ? `fixed inset-0 z-40 ${leftSidebarVisible ? 'translate-x-0' : '-translate-x-full'}`
                : 'w-96 flex-shrink-0'
            } bg-gray-50 flex flex-col overflow-hidden border-r min-h-0 transition-transform duration-300`}
            style={isMobile ? { width: '85%', maxWidth: '320px' } : undefined}
          >
            <div className="h-16 px-4 border-b bg-white flex items-center">
              <Button
                variant="ghost"
                className="w-full h-10 py-0 flex items-center justify-start text-left text-bamboo-navy leading-none"
              >
                + New task
              </Button>
            </div>
            
            <ScrollArea className="flex-grow overflow-y-auto pb-24">
              {tasks.map(task => (
                <div 
                  key={task.id}
                  className={`p-4 cursor-pointer hover:bg-gray-100 ${selectedTaskId === task.id ? 'bg-bamboo-primary/5 border-l-4 border-l-bamboo-primary' : 'border-b border-gray-100'}`}
                  onClick={() => selectTask(task.id)}
                >
                  <div className="flex gap-3 items-center min-w-0">
                    <Avatar className="h-8 w-8 border flex-shrink-0 bg-gray-200 flex items-center justify-center">
                      {task.id === 1 && <BarChart2 className="h-4 w-4 text-gray-600" />}
                      {task.id === 2 && <Code className="h-4 w-4 text-gray-600" />}
                      {task.id === 3 && <Github className="h-4 w-4 text-gray-600" />}
                      {task.id === 4 && <BrainCircuit className="h-4 w-4 text-gray-600" />}
                      {task.id > 4 && <BrainCircuit className="h-4 w-4 text-gray-600" />}
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm font-medium text-bamboo-navy truncate">{task.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{task.description}</p>
                    </div>
                    <div className="text-xs text-gray-500 flex-shrink-0">{task.date}</div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          
          {/* Overlay for mobile when sidebar is open */}
          {isMobile && leftSidebarVisible && (
            <div 
              className="fixed inset-0 bg-black/30 z-30"
              onClick={() => setLeftSidebarVisible(false)}
            />
          )}
          
          {/* Middle Content - Chat (Flexible Width) */}
          <div className="flex-grow flex flex-col relative overflow-hidden min-h-0">
            {/* Header - Now with menu button on mobile */}
            <div className="border-b bg-white p-4 flex items-center gap-2 h-16">
              {isMobile && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="mr-2"
                  onClick={() => setLeftSidebarVisible(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h2 className="text-lg font-medium text-bamboo-navy flex items-center">{selectedTask?.title || "Task"}</h2>
            </div>
            
            {/* Messages container */}
            <div className="flex-grow flex flex-col overflow-hidden min-h-0">
              <ScrollArea className="flex-grow" viewportRef={mainContentRef}>
                <div className="p-2 md:p-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex flex-col gap-4 md:gap-6">
                      {/* Chat messages with responsive sizing */}
                      {messages.map((message, index) => (
                        <div key={index} className={`flex items-start gap-2 md:gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500 ${
                          message.type === "user" ? "justify-end" : "justify-start"
                        }`}>
                          {message.type === "assistant" ? (
                            <>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-8 w-8 md:h-10 md:w-10 border flex items-center justify-center">
                                    <img src="/lovable-uploads/ee7f1b89-e60e-4121-8fb6-dba324f20c21.png" alt="Bamboo" className="w-full h-full object-cover" />
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{format(message.timestamp, "MMM d, h:mm a")}</p>
                                </TooltipContent>
                              </Tooltip>
                              <div className="bg-white p-3 md:p-4 rounded-lg rounded-tl-none max-w-[85%] md:max-w-[80%] shadow-sm border border-gray-100">
                                {renderMessageText(message)}
                                
                                {message.showChart && message.chartType === "performance" && (
                                  <Card className="mt-4">
                                    <CardHeader className="pb-2">
                                      <CardTitle className="text-xs md:text-sm font-medium flex items-center">Platform Conversions</CardTitle>
                                      <CardDescription className="text-xs">TikTok is outperforming other platforms by 35% in CPA</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                      <ChartContainer config={{}}>
                                        <div className="h-60 w-full">
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
                                        </div>
                                      </ChartContainer>
                                    </CardContent>
                                  </Card>
                                )}
                                
                                {message.showChart && message.chartType === "table" && (
                                  <>
                                    {message.text?.includes("Platform") ? (
                                      <div className="mt-4 overflow-x-auto">
                                        <table className="w-full border-collapse text-xs md:text-sm">
                                          <thead>
                                            <tr className="bg-gray-50">
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Platform</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Spend</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">CPA</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Conv.</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">CPM</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {tableData.map((row, i) => (
                                              <tr key={i} className={row.platform === 'Total' ? 'font-medium bg-gray-50' : ''}>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{row.platform}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">${row.spend}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">${row.cpa.toFixed(2)}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{row.conversions}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{typeof row.cpm === 'number' ? `$${row.cpm.toFixed(2)}` : row.cpm}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    ) : (
                                      <div className="mt-4 overflow-x-auto">
                                        <table className="w-full border-collapse text-xs md:text-sm">
                                          <thead>
                                            <tr className="bg-gray-50">
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Type</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Asset</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Spend</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">CPA</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">Conv.</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">CPM</th>
                                              <th className="border px-2 py-1 md:px-4 md:py-2 text-left">CTR</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {creativeData.map((row, i) => (
                                              <tr key={i}>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{row.type}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{row.asset}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">${row.spend}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">${row.cpa.toFixed(2)}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{row.conversions}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">${row.cpm.toFixed(2)}</td>
                                                <td className="border px-2 py-1 md:px-4 md:py-2">{row.ctr}%</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                  </>
                                )}
                                
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
                              <div className="bg-white p-3 md:p-4 rounded-lg rounded-tr-none max-w-[85%] md:max-w-[80%] shadow-sm border border-gray-100">
                                <p className="text-bamboo-navy text-sm md:text-base">{message.text}</p>
                              </div>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="h-8 w-8 md:h-10 md:w-10 bg-bamboo-secondary text-white flex items-center justify-center">
                                    <div className="text-base md:text-lg font-medium">U</div>
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
              </ScrollArea>
              
              {/* Message input area - Now mobile friendly */}
              <div className="border-t bg-white p-2 md:p-4 z-10 shadow-md flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
                  <Input 
                    placeholder="Message Bamboo..." 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow text-sm md:text-base"
                  />
                  <Button 
                    type="submit" 
                    className="bg-bamboo-primary hover:bg-bamboo-secondary text-white"
                    size={isMobile ? "default" : "icon"}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Report Panel */}
          {!rightPanelCollapsed && !isMobile && (
            <div className="w-144 flex-shrink-0 bg-white overflow-hidden flex flex-col border-l min-h-0">
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
              <ScrollArea className="flex-grow overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">Platform Conversions</CardTitle>
                      <CardDescription className="text-xs">Overall performance across platforms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-56">
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
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">Platform Performance Summary</CardTitle>
                      <CardDescription className="text-xs">Detailed metrics by platform</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border px-2 py-1 text-left">Platform</th>
                              <th className="border px-2 py-1 text-left">Spend</th>
                              <th className="border px-2 py-1 text-left">CPA</th>
                              <th className="border px-2 py-1 text-left">Conv.</th>
                              <th className="border px-2 py-1 text-left">CPM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, i) => (
                              <tr key={i} className={row.platform === 'Total' ? 'font-medium bg-gray-50' : ''}>
                                <td className="border px-2 py-1">{row.platform}</td>
                                <td className="border px-2 py-1">${row.spend}</td>
                                <td className="border px-2 py-1">${row.cpa.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.conversions}</td>
                                <td className="border px-2 py-1">{typeof row.cpm === 'number' ? `$${row.cpm.toFixed(2)}` : row.cpm}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-gray-700">
                    <p className="font-medium mb-2">Key Insights:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>TikTok is outperforming Meta by 24% in CPA efficiency</li>
                      <li>Google has the highest CPA at $10.00</li>
                      <li>Overall campaign ROAS is positive at 2.4x</li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
          
          {/* Fullscreen Mobile Report Panel */}
          {!rightPanelCollapsed && isMobile && (
            <div className="fixed inset-0 z-50 bg-white flex flex-col">
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
              <ScrollArea className="flex-grow overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">Platform Conversions</CardTitle>
                      <CardDescription className="text-xs">Overall performance across platforms</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-56">
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
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center">Platform Performance Summary</CardTitle>
                      <CardDescription className="text-xs">Detailed metrics by platform</CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border px-2 py-1 text-left">Platform</th>
                              <th className="border px-2 py-1 text-left">Spend</th>
                              <th className="border px-2 py-1 text-left">CPA</th>
                              <th className="border px-2 py-1 text-left">Conv.</th>
                              <th className="border px-2 py-1 text-left">CPM</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((row, i) => (
                              <tr key={i} className={row.platform === 'Total' ? 'font-medium bg-gray-50' : ''}>
                                <td className="border px-2 py-1">{row.platform}</td>
                                <td className="border px-2 py-1">${row.spend}</td>
                                <td className="border px-2 py-1">${row.cpa.toFixed(2)}</td>
                                <td className="border px-2 py-1">{row.conversions}</td>
                                <td className="border px-2 py-1">{typeof row.cpm === 'number' ? `$${row.cpm.toFixed(2)}` : row.cpm}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="text-gray-700">
                    <p className="font-medium mb-2">Key Insights:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>TikTok is outperforming Meta by 24% in CPA efficiency</li>
                      <li>Google has the highest CPA at $10.00</li>
                      <li>Overall campaign ROAS is positive at 2.4x</li>
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Chat2;
