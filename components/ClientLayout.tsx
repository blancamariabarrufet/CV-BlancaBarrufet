"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { TerminalModeProvider, useTerminalMode } from "@/components/TerminalModeProvider";

interface ClientLayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: ClientLayoutProps) {
  const { terminalMode, toggleTerminalMode } = useTerminalMode();
  const [theme, setTheme] = useState<"paper" | "midnight">("paper");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("cv-theme");
    if (savedTheme === "midnight") {
      setTheme("midnight");
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme === "midnight" ? "midnight" : "paper";
    window.localStorage.setItem("cv-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "midnight" ? "paper" : "midnight"));
  };

  if (terminalMode) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--surface)] p-4 sm:p-8">
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTerminalMode}
            className="border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-colors hover:bg-[var(--accent-soft)] hover:border-[var(--accent)]"
            title="Exit Terminal Mode"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Exit
            </span>
          </button>
        </div>
        <div className="h-[85vh] w-full max-w-4xl">
          <ChatWidget />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header terminalMode={terminalMode} onToggleTerminal={toggleTerminalMode} theme={theme} onToggleTheme={toggleTheme} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <TerminalModeProvider>
      <LayoutContent>{children}</LayoutContent>
    </TerminalModeProvider>
  );
}
