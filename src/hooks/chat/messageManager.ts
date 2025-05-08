import { Message } from "./types";
import { logMessage } from "./chatDbService";
import { isValidEmail, isValidWebsite, getMarketingInsights } from "./utils";

export class MessageManager {
  private messages: Message[] = [];
  private conversationId: string | null = null;
  private userHasResponded: boolean = false;
  private currentQuestion: string = "email";
  
  constructor(
    initialMessages: Message[] = [], 
    conversationId: string | null = null, 
    userHasResponded: boolean = false
  ) {
    this.messages = initialMessages;
    this.conversationId = conversationId;
    this.userHasResponded = userHasResponded;
  }
  
  getMessages(): Message[] {
    return this.messages;
  }
  
  setMessages(messages: Message[]): void {
    this.messages = messages;
  }
  
  addMessage(message: Message): void {
    this.messages = [...this.messages, message];
  }
  
  getCurrentQuestion(): string {
    return this.currentQuestion;
  }
  
  setCurrentQuestion(question: string): void {
    this.currentQuestion = question;
  }
  
  getUserHasResponded(): boolean {
    return this.userHasResponded;
  }
  
  setUserHasResponded(responded: boolean): void {
    this.userHasResponded = responded;
  }
  
  setConversationId(id: string | null): void {
    this.conversationId = id;
  }
  
  getConversationId(): string | null {
    return this.conversationId;
  }
  
  async initializeConversation(existingMessages: Message[] = []): Promise<void> {
    // If existing messages, use them (existing conversation)
    if (existingMessages.length > 0) {
      this.messages = existingMessages;
      return;
    }
    
    // For new conversations, we'll add the welcome messages with delay
    const initialMessages: Message[] = [
      {
        text: "Hey! I'm Jay, founder of Bamboo, the AI Ad Agency. Congrats! 🎉 You've unlocked one month FREE. 🤑",
        type: "assistant" as const,
        timestamp: new Date(),
        isLogged: this.userHasResponded
      }
    ];
    
    // Set first message immediately
    this.messages = initialMessages;
  }
  
  async addSecondMessage(): Promise<void> {
    const secondMessage = {
      text: "I just have a few quick questions to get started. If you'd rather chat live, you can book a quick meeting with me:",
      type: "assistant" as const,
      timestamp: new Date(),
      isLogged: this.userHasResponded
    };
    
    this.addMessage(secondMessage);
    
    // Log if user has responded
    if (this.userHasResponded && this.conversationId) {
      await logMessage(this.conversationId, secondMessage.text || "", "assistant");
    }
  }
  
  async addCalendlyMessage(): Promise<void> {
    const calendlyMessage = {
      text: "",
      type: "assistant" as const,
      showCalendly: true,
      timestamp: new Date(),
      isLogged: this.userHasResponded
    };
    
    this.addMessage(calendlyMessage);
  }
  
  async addEmailQuestion(): Promise<void> {
    const fourthMessage = {
      text: "First, what's the best email to contact you?",
      type: "assistant" as const,
      timestamp: new Date(),
      isLogged: this.userHasResponded
    };
    
    this.addMessage(fourthMessage);
    this.setCurrentQuestion("email");
    
    // Log if user has responded
    if (this.userHasResponded && this.conversationId) {
      await logMessage(this.conversationId, fourthMessage.text || "", "assistant");
    }
  }
  
  async handleEmailResponse(inputValue: string): Promise<void> {
    if (isValidEmail(inputValue)) {
      // Valid email, prepare for website question
      const nextMessage = {
        text: "Thanks. Next, what's your business's website?",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      this.addMessage(nextMessage);
      this.setCurrentQuestion("website");
      
      if (this.conversationId) {
        await logMessage(this.conversationId, nextMessage.text || "", "assistant");
      }
    } else {
      // Invalid email, ask for it again
      const errorMessage = {
        text: "Whoops, that doesn't look like a valid email address. Can you try again?",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      this.addMessage(errorMessage);
      // Keep currentQuestion as "email" since we still need a valid email
      
      if (this.conversationId) {
        await logMessage(this.conversationId, errorMessage.text || "", "assistant");
      }
    }
  }
  
  async handleWebsiteResponse(inputValue: string): Promise<void> {
    // Show loading state
    const loadingMessage = {
      text: "Checking your website...",
      type: "assistant" as const,
      timestamp: new Date()
    };
    
    this.addMessage(loadingMessage);
    if (this.conversationId) {
      await logMessage(this.conversationId, loadingMessage.text || "", "assistant");
    }
    
    // Format website URL if missing protocol
    let formattedWebsite = inputValue.trim();
    if (!formattedWebsite.startsWith('http://') && !formattedWebsite.startsWith('https://')) {
      formattedWebsite = `https://${formattedWebsite}`;
    }
    
    // Validate website
    const isValid = await isValidWebsite(formattedWebsite);
    
    if (isValid) {
      // Show thinking message
      const thinkingMessage = {
        text: "Perfect. Here are some basic thoughts I have about your first campaign. Let me analyze your website...",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      this.addMessage(thinkingMessage);
      if (this.conversationId) {
        await logMessage(this.conversationId, thinkingMessage.text || "", "assistant");
      }
      
      // Get marketing insights
      const insights = await getMarketingInsights(formattedWebsite);
      
      // Show insights
      const insightsMessage = {
        text: insights,
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      this.addMessage(insightsMessage);
      this.setCurrentQuestion("business");
      
      if (this.conversationId) {
        await logMessage(this.conversationId, insights, "assistant");
      }
      
      // Ask for business name
      setTimeout(() => {
        this.addBusinessNameQuestion();
      }, 100);
      
    } else {
      // Invalid website
      const errorMessage = {
        text: "That website doesn't quite look right. Can you try again? Make sure it's a valid website address (e.g., example.com).",
        type: "assistant" as const,
        timestamp: new Date()
      };
      
      this.addMessage(errorMessage);
      // Keep currentQuestion as "website" since we still need a valid website
      
      if (this.conversationId) {
        await logMessage(this.conversationId, errorMessage.text || "", "assistant");
      }
    }
  }
  
  async addBusinessNameQuestion(): Promise<void> {
    const nextQuestion = {
      text: "What's your business name?",
      type: "assistant" as const,
      timestamp: new Date()
    };
    
    this.addMessage(nextQuestion);
    this.setCurrentQuestion("complete");
    
    if (this.conversationId) {
      await logMessage(this.conversationId, nextQuestion.text || "", "assistant");
    }
  }
  
  async handleOtherResponse(): Promise<void> {
    const nextMessage = {
      text: "Thanks for sharing that information. Our team will be in touch with you shortly!",
      type: "assistant" as const,
      timestamp: new Date()
    };
    
    this.addMessage(nextMessage);
    this.setCurrentQuestion("complete");
    
    if (this.conversationId) {
      await logMessage(this.conversationId, nextMessage.text || "", "assistant");
    }
  }
}
