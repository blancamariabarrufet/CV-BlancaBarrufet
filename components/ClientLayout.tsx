"use client";

import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import { TerminalModeProvider, useTerminalMode } from "@/components/TerminalModeProvider";

interface ClientLayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: ClientLayoutProps) {
  const { terminalMode, toggleTerminalMode } = useTerminalMode();

  if (terminalMode) {
    return (
      <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center p-8 z-50">
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTerminalMode}
            className="px-4 py-2 text-sm font-medium rounded-md bg-[#2A2A2A] text-gray-300 hover:bg-[#3A3A3A] border border-[#444] transition-all"
            title="Exit Terminal Mode"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Exit Terminal
            </span>
          </button>
        </div>
        <div className="w-full max-w-4xl h-[85vh]">
          <ChatWidget />
        </div>
      </div>
    );
  }

  return (
    <>
      <Header terminalMode={terminalMode} onToggleTerminal={toggleTerminalMode} />
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
