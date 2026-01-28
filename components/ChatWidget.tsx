"use client";

import { useState, useRef, useEffect } from "react";
import { useTerminalMode, Message } from "@/components/TerminalModeProvider";

const quickActions = [
  "Summarize my profile",
  "Show skills",
  "Highlight AI chatbot experience",
  "Download CV",
];

const ChatWidget = () => {
  const { terminalMode, toggleTerminalMode, messages, setMessages, isLoading, setIsLoading } = useTerminalMode();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated before scrolling
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    // Capture values before any state changes
    const messageToSend = textToSend.trim();
    const shouldToggle = !terminalMode;

    // Update UI state first
    const userMessage: Message = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Toggle terminal mode AFTER capturing message and updating state
    if (shouldToggle) {
      toggleTerminalMode();
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageToSend,
          conversationId: "session-" + Date.now(),
        }),
      });

      const data = await response.json();
      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || "I'm sorry, I couldn't process that request.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Terminal mode styles - Apple Terminal aesthetic (both modes now use terminal style)
  const terminalStyles = {
    container: terminalMode
      ? "rounded-xl shadow-2xl overflow-hidden flex flex-col h-full w-full font-mono"
      : "rounded-xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-w-2xl w-full font-mono",
    header: "bg-gradient-to-b from-[#E8E6E8] to-[#D4D2D4] px-4 py-2 border-b border-[#B8B6B8]",
    headerText: "text-gray-500",
    messages: terminalMode
      ? "flex-1 overflow-y-auto p-6 space-y-2 scroll-smooth bg-[#1E1E1E]"
      : "flex-1 overflow-y-auto p-4 space-y-1 scroll-smooth bg-[#1E1E1E]",
    userMessage: "bg-transparent text-white",
    assistantMessage: "bg-transparent text-white",
    loadingDot: "bg-[#28F528]",
    quickActions: terminalMode
      ? "px-6 py-3 bg-[#1E1E1E] border-t border-[#333]"
      : "px-4 py-2 bg-[#1E1E1E] border-t border-[#333]",
    quickActionBtn: terminalMode
      ? "text-sm px-4 py-2 bg-[#2A2A2A] border border-[#444] rounded hover:bg-[#3A3A3A] hover:border-[#555] transition-all text-[#28F528]"
      : "text-xs px-3 py-1.5 bg-[#2A2A2A] border border-[#444] rounded hover:bg-[#3A3A3A] hover:border-[#555] transition-all text-[#28F528]",
    inputContainer: terminalMode
      ? "px-6 py-4 bg-[#1E1E1E]"
      : "px-4 py-3 bg-[#1E1E1E]",
    input: terminalMode
      ? "flex-1 px-3 py-2 border-none bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed font-mono text-base"
      : "flex-1 px-2 py-1 border-none bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed font-mono text-sm",
    sendBtn: terminalMode
      ? "px-5 py-2 bg-[#3A3A3A] text-[#28F528] font-medium hover:bg-[#4A4A4A] disabled:bg-[#2A2A2A] disabled:text-gray-600 disabled:cursor-not-allowed transition-colors rounded text-base"
      : "px-4 py-1.5 bg-[#3A3A3A] text-[#28F528] font-medium hover:bg-[#4A4A4A] disabled:bg-[#2A2A2A] disabled:text-gray-600 disabled:cursor-not-allowed transition-colors rounded text-sm",
    fontSize: terminalMode ? "text-base" : "text-sm",
  };

  return (
    <div className={terminalStyles.container}>
      {/* Header - macOS style for both modes */}
      <div className={terminalStyles.header}>
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]"></div>
          </div>
          <div className="flex-1 text-center">
            <span className={`${terminalMode ? 'text-sm' : 'text-xs'} text-gray-700 font-medium`}>
              blanca@cv — bash — {terminalMode ? '80x24' : '60x20'}
            </span>
          </div>
          <div className="w-[52px]"></div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesContainerRef} className={terminalStyles.messages}>
        <div className={`text-gray-400 ${terminalStyles.fontSize} mb-2`}>
          Last login: {new Date().toLocaleString()} on ttys000
        </div>
        {messages.map((message, index) => (
          <div key={index} className={`${terminalStyles.fontSize} leading-relaxed`}>
            {message.role === "user" ? (
              <div className="text-white font-bold">
                <span className="text-[#28F528]">blanca@cv</span>
                <span className="text-white">:</span>
                <span className="text-[#5C9DFF]">~</span>
                <span className="text-white">$ {message.content}</span>
              </div>
            ) : (
              <div className="text-white whitespace-pre-wrap pl-0 py-1">{message.content}</div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className={terminalStyles.fontSize}>
            <span className="text-[#28F528]">blanca@cv</span>
            <span className="text-white">:</span>
            <span className="text-[#5C9DFF]">~</span>
            <span className="text-white">$ </span>
            <span className="text-[#28F528] animate-pulse">_</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className={terminalStyles.quickActions}>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => handleQuickAction(action)}
              className={terminalStyles.quickActionBtn}
              disabled={isLoading}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className={terminalStyles.inputContainer}>
        <div className="flex gap-2 items-center">
          <div className={`flex items-center ${terminalStyles.fontSize}`}>
            <span className="text-[#28F528]">blanca@cv</span>
            <span className="text-white">:</span>
            <span className="text-[#5C9DFF]">~</span>
            <span className="text-white">$</span>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder=""
            disabled={isLoading}
            className={terminalStyles.input}
            aria-label="Chat input"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className={terminalStyles.sendBtn}
            aria-label="Send message"
          >
            Run
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
