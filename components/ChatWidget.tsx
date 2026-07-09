"use client";

import { useEffect, useRef, useState } from "react";
import { Message, useTerminalMode } from "@/components/TerminalModeProvider";

const quickActions = [
  "What does Blanca build at Connecthink?",
  "Summarize her RAG experience.",
  "Is she available for a Data Science internship?",
];

const ChatWidget = () => {
  const { terminalMode, toggleTerminalMode, messages, setMessages, isLoading, setIsLoading } = useTerminalMode();
  const [input, setInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    const messageToSend = textToSend.trim();
    const shouldToggle = !terminalMode && messageText === undefined;

    const userMessage: Message = { role: "user", content: messageToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

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
        content: data.reply || "I could not process that request.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "The chat service did not respond. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  if (terminalMode) {
    return (
      <div className="module-dark flex h-full w-full flex-col overflow-hidden">
        <div className="flex items-center border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden>
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 text-center text-xs font-medium text-[var(--term-fg-muted)]">
            blanca@cv - bash - 80x24
          </div>
          <div className="w-[52px]" />
        </div>

        <div ref={messagesContainerRef} className="flex-1 space-y-2 overflow-y-auto bg-[var(--term-bg)] p-5 text-sm leading-relaxed">
          <p className="text-[var(--term-fg-dim)]">Last login: interactive_cv on ttys000</p>
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`}>
              {message.role === "user" ? (
                <p className="font-semibold text-[var(--term-fg)]">
                  <span className="text-[var(--accent)]">blanca@cv</span>:<span className="text-[#f4a7bd]">~</span>$ {message.content}
                </p>
              ) : (
                <p className="whitespace-pre-wrap text-[var(--term-fg-muted)]">{message.content}</p>
              )}
            </div>
          ))}
          {isLoading && (
            <p className="font-semibold text-[var(--term-fg)]">
              <span className="text-[var(--accent)]">blanca@cv</span>:<span className="text-[#f4a7bd]">~</span>$ <span className="terminal-cursor">_</span>
            </p>
          )}
        </div>

        <div className="border-t border-white/10 bg-[var(--term-bg)] p-4">
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-sm font-semibold text-[var(--term-fg)]">
              <span className="text-[var(--accent)]">blanca@cv</span>:<span className="text-[#f4a7bd]">~</span>$
            </span>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 border-0 bg-transparent text-sm text-[var(--term-fg)] outline-none placeholder:text-[var(--term-fg-dim)]"
              aria-label="Chat input"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="border border-white/15 px-4 py-2 text-xs font-semibold uppercase text-[var(--accent)] transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Run
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module flex h-[360px] min-h-0 flex-col overflow-hidden">
      <div className="module-header">
        <span className="module-code">ask the cv</span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[0.54fr_1fr]">
        <div className="border-b p-4 md:border-b-0 md:border-r">
          <h3 className="mb-2 text-base font-semibold text-[var(--ink)]">Interview the page.</h3>
          <p className="max-w-[36ch] text-xs leading-relaxed text-[var(--ink-muted)]">
            A small assistant grounded in this CV. Useful for recruiters skimming on a deadline.
          </p>
          <ul className="mt-5 space-y-1.5 text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
            <li>- grounded on experience</li>
            <li>- stack education languages</li>
            <li>- awards and projects</li>
          </ul>
        </div>

        <div className="flex min-h-0 flex-col">
          <div className="border-b bg-[var(--surface-low)] p-3">
            <p className="mb-2 text-[10px] text-[var(--accent)]">&gt; Ask anything about Blanca's experience, stack or availability.</p>
            <div className="flex flex-col gap-1.5">
              {quickActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleSendMessage(action)}
                  disabled={isLoading}
                  className="border border-dashed bg-[var(--surface-lowest)] px-2 py-1.5 text-left text-[10px] text-[var(--ink-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          <div ref={messagesContainerRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3 text-xs leading-relaxed">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "text-[var(--ink)]" : "text-[var(--ink-muted)]"}>
                <span className="text-[var(--accent)]">{message.role === "user" ? "user" : "cv"}</span>
                <span className="text-[var(--ink-soft)]"> $ </span>
                <span className="whitespace-pre-wrap">{message.content}</span>
              </div>
            ))}
            {isLoading && (
              <p className="text-[var(--ink)]">
                <span className="text-[var(--accent)]">cv</span>
                <span className="text-[var(--ink-soft)]"> $ </span>
                <span className="terminal-cursor">_</span>
              </p>
            )}
          </div>

          <div className="border-t p-2">
            <div className="flex items-center gap-2">
              <span className="shrink-0 text-[10px] text-[var(--accent)]">&gt;</span>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="ask..."
                disabled={isLoading}
                className="min-w-0 flex-1 bg-transparent px-1 py-1 text-xs outline-none placeholder:text-[var(--ink-soft)]"
                aria-label="Chat input"
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="btn-terminal h-7 min-h-7 px-3 py-0 text-[10px] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
