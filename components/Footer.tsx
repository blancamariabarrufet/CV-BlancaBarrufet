"use client";

import cvData from "@/data/cv.json";

const Footer = () => {
  const { profile } = cvData;

  return (
    <footer className="no-print border-t bg-[var(--surface-low)] px-4 py-5">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
        <span>EOF - cv.barrufet - {new Date().getFullYear()}</span>
        <div className="flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="hover:text-[var(--accent)]">
            {profile.email}
          </a>
          {profile.website && (
            <a href={`https://${profile.website.replace(/^https?:\/\//, "")}`} className="hover:text-[var(--accent)]" target="_blank" rel="noopener noreferrer">
              {profile.website}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
