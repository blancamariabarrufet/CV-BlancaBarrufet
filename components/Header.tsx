"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  terminalMode: boolean;
  onToggleTerminal: () => void;
  theme: "paper" | "midnight";
  onToggleTheme: () => void;
}

const Header = ({ terminalMode, onToggleTerminal, theme, onToggleTheme }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleContactClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pathname === "/") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push("/#contact");
    setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCvClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pathname === "/") {
      document.getElementById("section-4")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push("/#section-4");
    setTimeout(() => {
      document.getElementById("section-4")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="system-bar no-print">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="status-dot status-dot-ok rounded-full" aria-hidden />
          <span className="hidden text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] sm:inline">
            system_online
          </span>
          <span className="h-4 w-px bg-[var(--outline-variant)]" aria-hidden />
          <span className="truncate text-[11px] uppercase tracking-[0.16em] text-[var(--ink)]">
            blanca.barrufet
          </span>
        </Link>

        <nav aria-label="Primary navigation">
          <ul className="flex flex-wrap items-center justify-end gap-1.5">
            <li>
              <Link
                href="/"
                className={`btn-terminal ${pathname === "/" ? "border-[var(--accent)] bg-[var(--accent-soft)]" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <a href="/#section-4" onClick={handleCvClick} className="btn-terminal">
                CV
              </a>
            </li>
            <li>
              <a href="/#contact" onClick={handleContactClick} className="btn-terminal">
                Contact
              </a>
            </li>
            <li>
              <button onClick={onToggleTheme} className="btn-terminal" type="button" aria-pressed={theme === "midnight"}>
                {theme === "midnight" ? "Paper" : "Midnight"}
              </button>
            </li>
            <li>
              <button onClick={onToggleTerminal} className="btn-terminal-primary" type="button">
                {terminalMode ? "Exit" : "Terminal"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
