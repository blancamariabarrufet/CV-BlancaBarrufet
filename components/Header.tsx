"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  theme: "paper" | "midnight";
  onToggleTheme: () => void;
}

const Header = ({ theme, onToggleTheme }: HeaderProps) => {
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
      document.getElementById("section-2")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    router.push("/#section-2");
    setTimeout(() => {
      document.getElementById("section-2")?.scrollIntoView({ behavior: "smooth" });
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
              <a href="/#section-2" onClick={handleCvClick} className="btn-terminal">
                CV
              </a>
            </li>
            <li>
              <a href="/#contact" onClick={handleContactClick} className="btn-terminal">
                Contact
              </a>
            </li>
            <li>
              <button
                onClick={onToggleTheme}
                className="btn-terminal"
                type="button"
                aria-pressed={theme === "midnight"}
                aria-label={theme === "midnight" ? "Switch to light theme" : "Switch to dark theme"}
                title={theme === "midnight" ? "Light theme" : "Dark theme"}
              >
                {theme === "midnight" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
