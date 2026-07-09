"use client";

import { ReactNode, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
