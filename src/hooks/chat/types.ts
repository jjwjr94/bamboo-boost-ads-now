
export interface Message {
  text?: string;
  type: "assistant" | "action" | "user";
  timestamp: Date;
  showCalendly?: boolean;
  id?: string;
  isLogged?: boolean;
}
