
export interface Message {
  text?: string;
  type: "assistant" | "action" | "user" | "onboarding-form";
  timestamp: Date;
  showCalendly?: boolean;
  id?: string;
  isLogged?: boolean;
}
