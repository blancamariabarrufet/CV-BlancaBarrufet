import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blanca M Barrufet Garbayo — AI Chatbots / Software Engineering",
  description: "Computer Engineering and Business student specializing in AI chatbots, RAG architectures, and software development. Experience with LangGraph, LlamaIndex, and enterprise AI solutions.",
  openGraph: {
    title: "Blanca M Barrufet Garbayo — AI Chatbots / Software Engineering",
    description: "Computer Engineering and Business student specializing in AI chatbots, RAG architectures, and software development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
