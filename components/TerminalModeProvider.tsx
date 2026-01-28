"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

interface TerminalModeContextType {
  terminalMode: boolean;
  toggleTerminalMode: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TerminalModeContext = createContext<TerminalModeContextType | undefined>(undefined);

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hi! I'm here to help you learn about Blanca's experience and skills. What would you like to know?",
  },
];

export function TerminalModeProvider({ children }: { children: ReactNode }) {
  const [terminalMode, setTerminalMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const toggleTerminalMode = () => {
    setTerminalMode((prev) => !prev);
  };

  return (
    <TerminalModeContext.Provider value={{ terminalMode, toggleTerminalMode, messages, setMessages, isLoading, setIsLoading }}>
      {children}
    </TerminalModeContext.Provider>
  );
}

export function useTerminalMode() {
  const context = useContext(TerminalModeContext);
  if (context === undefined) {
    throw new Error("useTerminalMode must be used within a TerminalModeProvider");
  }
  return context;
}
