import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Blanca M Barrufet Garbayo — AI and Data Engineering / Software Engineering",
  description: "Computer Engineering and Business student specializing in AI and data engineering, RAG architectures, and software development. Experience with LangGraph, LlamaIndex, and enterprise AI solutions.",
  openGraph: {
    title: "Blanca M Barrufet Garbayo — AI and Data Engineering / Software Engineering",
    description: "Computer Engineering and Business student specializing in AI and data engineering, RAG architectures, and software development.",
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
      <body className="antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
