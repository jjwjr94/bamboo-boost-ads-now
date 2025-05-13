
export interface Message {
  text?: string;
  type: "assistant" | "action" | "user" | "onboardingForm";
  timestamp: Date;
  showCalendly?: boolean;
  id?: string;
  isLogged?: boolean;
}
