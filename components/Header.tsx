"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  terminalMode: boolean;
  onToggleTerminal: () => void;
}

const Header = ({ terminalMode, onToggleTerminal }: HeaderProps) => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "CV", href: "/cv" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            Blanca M Barrufet
          </Link>

          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-gray-900 ${
                    pathname === item.href
                      ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                      : "text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={onToggleTerminal}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  terminalMode
                    ? "bg-pink-400 text-black hover:bg-pink-300"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
                title={terminalMode ? "Exit Terminal Mode" : "Enter Terminal Mode"}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {terminalMode ? "Exit" : "Terminal"}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
