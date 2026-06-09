"use client";

import { useState } from "react";

const sectionHeading =
  "mt-4 mb-2 border-b border-black/80 pb-1 text-[14px] font-bold uppercase tracking-wide text-black";

const bullet = "before:mr-1.5 before:content-['•']";

export default function CvPage() {
  const [editing, setEditing] = useState(false);

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
            Blanca M Barrufet Garbayo
          </h1>
          <p className="mt-1 text-[17px] uppercase tracking-wide text-neutral-700">
            AI and Data Engineer
          </p>
          <p className="mt-2.5 text-[12.5px] text-neutral-800">
            Barcelona&nbsp;|&nbsp; blancamariabarrufet@gmail.com&nbsp;|&nbsp; www.blancabarrufet.me
          </p>
          <hr className="mt-2.5 border-t border-black/80" />
        </div>

        {/* Summary */}
        <p className="mt-3 text-justify text-[12.5px] leading-relaxed text-neutral-900">
          AI and Data Engineer with experience developing enterprise AI chatbots, RAG architectures,
          and semantic search using different technologies. Passionate about building scalable AI
          solutions, solving complex problems, and continuously learning in fast-paced and
          international environments.
        </p>

        {/* Technical Skills */}
        <h2 className={sectionHeading}>Technical Skills</h2>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-[12.5px] text-neutral-900 sm:grid-cols-5">
          {[
            "RAG",
            "GraphRAG",
            "LangChain",
            "LlamaIndex",
            "LLM Interaction",
            "ETL Pipelines",
            "Embeddings",
            "Vector Databases",
            "SQL",
            "Data Modeling",
          ].map((skill) => (
            <li key={skill} className={bullet}>
              {skill}
            </li>
          ))}
        </ul>

        {/* Programming & Tools */}
        <h2 className={sectionHeading}>Programming &amp; Tools</h2>
        <p className="text-[12.5px] text-neutral-900">
          Python / JAVA • C/C++ • REST APIs • API Development • Cloud AWS • Git • Docker
        </p>

        {/* Personal Skills */}
        <h2 className={`${sectionHeading} !mt-3`}>Personal Skills</h2>
        <p className="text-[12.5px] text-neutral-900">
          Problem-solving • Communication • Team-work • Scrum • Analytical thinking • Adaptability
        </p>

        {/* Extra-curricular */}
        <h2 className={sectionHeading}>Extra-curricular</h2>
        <ul className="text-[12.5px] leading-relaxed text-neutral-900">
          <li className={bullet}>
            <span className="font-bold">Barcelona Supercomputing Center -</span> Mad for
            supercomputing is a course for baccalaureate students interested in STEM, organized by
            the Barcelona Supercomputing Center and Fundació Catalunya La Pedrera.
          </li>
        </ul>

        {/* Professional Experience */}
        <h2 className={sectionHeading}>Professional Experience</h2>
        <div className="space-y-2">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[13.5px] font-bold text-black">Connecthink Innovation, S.L.</h3>
              <span className="whitespace-nowrap text-[12.5px] font-bold text-black">
                November 2025 - Present
              </span>
            </div>
            <ul className="mt-0.5 space-y-0.5 pl-4 text-[12.5px] leading-relaxed text-neutral-900">
              <li className={bullet}>
                Development of enterprise AI chatbots for querying and managing large-scale datasets.
              </li>
              <li className={bullet}>
                Implementation of RAG architectures using LlamaIndex, pgvector, LangGraph, and
                GraphRAG.
              </li>
              <li className={bullet}>
                Integration with internal systems and optimization of semantic search and response
                quality.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[13.5px] font-bold text-black">La Salle - URL</h3>
              <span className="whitespace-nowrap text-[12.5px] font-bold text-black">
                September 2024 - January 2026
              </span>
            </div>
            <p className="mt-0.5 pl-4 text-[12.5px] leading-relaxed text-neutral-900">
              University collaborator as a mathematics, algebra, calculus and Mathematical
              Fundamentals teacher assistant in the Artificial Intelligence degree
            </p>
          </div>
        </div>

        {/* Education */}
        <h2 className={sectionHeading}>Education</h2>
        <div className="space-y-2">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[13.5px] font-bold text-black">
                Computer Engineering and Business and Management student
              </h3>
              <span className="whitespace-nowrap text-[12.5px] font-bold text-black">
                September 2022 - Present
              </span>
            </div>
            <p className="text-[12.5px] text-neutral-900">University of La Salle - URL</p>
            <ul className="mt-0.5 space-y-0.5 pl-4 text-[12.5px] leading-relaxed text-neutral-900">
              <li className={bullet}>
                Strong academic focus combining software engineering, data, and business strategy.
              </li>
              <li className={bullet}>
                High workload and rigorous program requiring strong discipline, adaptability, and
                continuous learning.
              </li>
            </ul>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[13.5px] font-bold text-black">Data science Master&apos;s Degree</h3>
              <span className="whitespace-nowrap text-[12.5px] font-bold text-black">
                Start in Aug 2026
              </span>
            </div>
            <p className="text-[12.5px] text-neutral-900">Lewis University</p>
          </div>
        </div>

        {/* Additional Information */}
        <h2 className={sectionHeading}>Additional Information</h2>
        <ul className="space-y-0.5 text-[12.5px] leading-relaxed text-neutral-900">
          <li className={bullet}>
            <span className="font-bold">Languages:</span> Spanish-Catalan (native), English
            (proficiency), German (beginner)
          </li>
          <li className={bullet}>
            <span className="font-bold">Certifications:</span> CCNA, C2 Level English
          </li>
          <li className={bullet}>
            <span className="font-bold">Awards/Activities:</span> Scholarship for women in
            engineering, Winner of the First Lego League
          </li>
        </ul>
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
