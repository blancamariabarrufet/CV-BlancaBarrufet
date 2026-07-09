"use client";

import { useEffect, useState } from "react";
import cvPrintData from "@/data/cv-print-2.json";

/**
 * The /cv2 page is a content-driven, one-page printable résumé that includes a
 * Projects section. It shares the exact layout/print logic of /cv but reads from
 * `data/cv-print-2.json` (Extra-curricular dropped, Additional Information summarized).
 *
 * IMPORTANT: To change the CV, edit `data/cv-print-2.json` (see `data/cv-print.schema.md`).
 * This file only owns layout, styling, and the A4 / PDF print logic — keep content out of it.
 */

// ---- Content model (mirrors data/cv-print-2.json) --------------------------

type BulletItem = { lead?: string; text: string };
type LabeledItem = { label: string; text: string };

type EntryItem = {
  title: string;
  period?: string;
  subtitle?: string;
  bullets?: string[];
  text?: string;
};

type Section =
  | { kind: "tag-grid"; heading: string; tightTop?: boolean; columns?: number; items: string[] }
  | { kind: "inline-list"; heading: string; tightTop?: boolean; items: string[] }
  | { kind: "bullets"; heading: string; tightTop?: boolean; items: BulletItem[] }
  | { kind: "labeled"; heading: string; tightTop?: boolean; items: LabeledItem[] }
  | {
      kind: "entries";
      heading: string;
      tightTop?: boolean;
      columns?: number;
      note?: string;
      entries: EntryItem[];
    }
  | { kind: "group"; tightTop?: boolean; columns?: number; sections: Section[] };

type CvPrint = {
  profile: { name: string; headline: string; contacts: string[] };
  summary?: string;
  sections: Section[];
};

const cv = cvPrintData as unknown as CvPrint;

// ---- Shared class strings (unchanged from the original layout) -------------

const sectionHeadingBase =
  "mb-2 border-b border-black/80 pb-1 text-[14px] font-bold uppercase tracking-wide text-black";

const bullet = "before:mr-1.5 before:content-['•']";

function headingClass(tightTop?: boolean) {
  return `${tightTop ? "!mt-3 " : "mt-4 "}${sectionHeadingBase}`;
}

// ---- Section renderers ------------------------------------------------------

function SectionHeading({ section }: { section: Exclude<Section, { kind: "group" }> }) {
  return <h2 className={headingClass(section.tightTop)}>{section.heading}</h2>;
}

function TagGridSection({ section }: { section: Extract<Section, { kind: "tag-grid" }> }) {
  const colsClass =
    section.columns === 1
      ? "grid-cols-1"
      : section.columns === 2
        ? "grid-cols-2"
        : section.columns === 3
          ? "grid-cols-3"
          : "grid-cols-2 sm:grid-cols-5";
  return (
    <>
      <SectionHeading section={section} />
      <ul className={`grid ${colsClass} gap-x-3 gap-y-1 text-[14px] text-neutral-900`}>
        {section.items.map((item) => (
          <li key={item} className={`${bullet} whitespace-nowrap`}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function InlineListSection({ section }: { section: Extract<Section, { kind: "inline-list" }> }) {
  return (
    <>
      <SectionHeading section={section} />
      <p
        className="text-[14px] text-neutral-900"
        style={{ textAlign: "justify", textAlignLast: "justify" }}
      >
        {section.items.join(" • ")}
      </p>
    </>
  );
}

function BulletsSection({ section }: { section: Extract<Section, { kind: "bullets" }> }) {
  return (
    <>
      <SectionHeading section={section} />
      <ul className="space-y-0.5 text-[14px] leading-relaxed text-neutral-900">
        {section.items.map((item, i) => (
          <li key={i} className={bullet}>
            {item.lead ? <span className="font-bold">{item.lead} </span> : null}
            {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}

function LabeledSection({ section }: { section: Extract<Section, { kind: "labeled" }> }) {
  return (
    <>
      <SectionHeading section={section} />
      <ul className="space-y-0.5 text-[14px] leading-relaxed text-neutral-900">
        {section.items.map((item, i) => (
          <li key={i} className={bullet}>
            <span className="font-bold">{item.label}</span> {item.text}
          </li>
        ))}
      </ul>
    </>
  );
}

function EntriesSection({ section }: { section: Extract<Section, { kind: "entries" }> }) {
  const layoutClass =
    section.columns === 2
      ? "grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2"
      : "space-y-2";
  return (
    <>
      <SectionHeading section={section} />
      <div className={layoutClass}>
        {section.entries.map((entry, i) => (
          <div key={i}>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[13.5px] font-bold text-black">{entry.title}</h3>
              {entry.period ? (
                <span className="whitespace-nowrap text-[12.5px] font-bold text-black">
                  {entry.period}
                </span>
              ) : null}
            </div>
            {entry.subtitle ? (
              <p className="text-[12.5px] text-neutral-900">{entry.subtitle}</p>
            ) : null}
            {entry.bullets && entry.bullets.length > 0 ? (
              <ul className="mt-0.5 space-y-0.5 pl-4 text-[12.5px] leading-relaxed text-neutral-900">
                {entry.bullets.map((b, j) => (
                  <li key={j} className={bullet}>
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
            {entry.text ? (
              <p className="mt-0.5 pl-4 text-[12.5px] leading-relaxed text-neutral-900">
                {entry.text}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      {section.note ? (
        <p className="mt-0.5 text-[12px] italic text-neutral-700">{section.note}</p>
      ) : null}
    </>
  );
}

function GroupSection({ section }: { section: Extract<Section, { kind: "group" }> }) {
  const colsClass =
    section.columns === 2
      ? "sm:grid-cols-2"
      : section.columns === 4
        ? "sm:grid-cols-4"
        : "sm:grid-cols-3";
  return (
    <div className={`mt-4 grid grid-cols-1 gap-x-6 gap-y-3 ${colsClass}`}>
      {section.sections.map((child, i) => (
        <div key={i} className="[&_h2]:!mt-0">
          {renderSection({ ...child, tightTop: true } as Section, i)}
        </div>
      ))}
    </div>
  );
}

function renderSection(section: Section, index: number) {
  switch (section.kind) {
    case "tag-grid":
      return <TagGridSection key={index} section={section} />;
    case "inline-list":
      return <InlineListSection key={index} section={section} />;
    case "bullets":
      return <BulletsSection key={index} section={section} />;
    case "labeled":
      return <LabeledSection key={index} section={section} />;
    case "entries":
      return <EntriesSection key={index} section={section} />;
    case "group":
      return <GroupSection key={index} section={section} />;
    default:
      return null;
  }
}

// ---- Page -------------------------------------------------------------------

export default function Cv2Page() {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") !== "1") return;

    window.history.replaceState(null, "", "/cv2");
    window.setTimeout(() => window.print(), 250);
  }, []);

  return (
    <div className="cv-root min-h-screen bg-neutral-200 py-8 print:min-h-0 print:bg-white print:py-0">
      {/* Action bar — hidden when printing */}
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-4">
        <a href="/" className="text-sm font-medium text-neutral-600 hover:text-black">
          ← Back
        </a>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditing((v) => !v)}
            className={`inline-flex items-center gap-2 rounded border px-4 py-2 text-sm font-semibold transition-colors ${
              editing
                ? "border-black bg-black text-white hover:bg-neutral-800"
                : "border-neutral-400 bg-white text-neutral-800 hover:border-black"
            }`}
          >
            {editing ? "Done editing" : "Edit"}
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded bg-black px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zM7 7V3h10v4"
              />
            </svg>
            Save as PDF
          </button>
        </div>
      </div>

      {editing && (
        <p className="no-print mx-auto mb-3 max-w-[820px] px-4 text-xs text-neutral-500">
          Editing on — click any text to change it. Changes are not saved and reset on reload.
        </p>
      )}

      {/* A4 sheet */}
      <article
        contentEditable={editing}
        suppressContentEditableWarning
        className={`cv-sheet mx-auto w-full max-w-[820px] bg-white px-12 py-10 text-black shadow-lg outline-none print:shadow-none ${
          editing ? "cv-editing" : ""
        }`}
      >
        {/* Header (div, not <header>, so it isn't hidden by the global print rule) */}
        <div className="text-center">
          <h1 className="text-[30px] font-bold uppercase leading-tight tracking-wide text-black">
            {cv.profile.name}
          </h1>
          <p className="mt-1 text-[17px] uppercase tracking-wide text-neutral-700">
            {cv.profile.headline}
          </p>
          <p className="mt-2.5 text-[12.5px] text-neutral-800">
            {cv.profile.contacts.join(" |  ")}
          </p>
          <hr className="mt-2.5 border-t border-black/80" />
        </div>

        {/* Summary */}
        {cv.summary ? (
          <p className="mt-3 text-justify text-[12.5px] leading-relaxed text-neutral-900">
            {cv.summary}
          </p>
        ) : null}

        {/* Sections — rendered in data order */}
        {cv.sections.map((section, index) => renderSection(section, index))}
      </article>

      {/* Page-scoped styles: clean sans-serif, edit affordance, and headerless A4 print */}
      <style jsx global>{`
        .cv-root,
        .cv-root h1,
        .cv-root h2,
        .cv-root h3 {
          font-family: "Helvetica Neue", Arial, "Segoe UI", system-ui, sans-serif;
        }
        /* Visual cue for editable fields */
        .cv-editing [contenteditable] {
          cursor: text;
        }
        .cv-editing:focus-within :focus {
          outline: 1px dashed rgba(0, 0, 0, 0.35);
          outline-offset: 2px;
          border-radius: 2px;
        }
        @media print {
          /* Remove the browser's page header/footer (title + URL) */
          @page {
            margin: 0;
            size: A4;
          }
          html,
          body {
            background: #fff !important;
          }
          /* Kill full-viewport min-heights that would otherwise spill an empty 2nd page */
          body,
          main,
          .cv-root {
            min-height: 0 !important;
            height: auto !important;
          }
          /* Sheet flows to its natural height (no forced 297mm) so it stays on one page */
          .cv-sheet {
            width: 210mm;
            max-width: none;
            margin: 0;
            padding: 12mm 16mm !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
