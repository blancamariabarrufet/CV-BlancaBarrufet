"use client";

import { useState } from "react";
import cvData from "@/data/cv.json";

interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
}

interface ProjectItem {
  id: string;
  name: string;
  type: string;
  start: string;
  end: string;
  bullets: string[];
  tags: string[];
  url?: string;
}

const skillGroups = [
  { label: "Technical Skills", items: cvData.skills.technical ?? [] },
  { label: "Programming & Tools", items: cvData.skills.programmingTools ?? [] },
  { label: "Personal Skills", items: cvData.skills.personal ?? [] },
];

const InteractiveCv = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [expandedExperience, setExpandedExperience] = useState<string[]>([]);
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);

  const toggleExperience = (id: string) => {
    setExpandedExperience((prev) => (prev.includes(id) ? prev.filter((expId) => expId !== id) : [...prev, id]));
  };

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => (prev.includes(id) ? prev.filter((projId) => projId !== id) : [...prev, id]));
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkill(selectedSkill === skill ? null : skill);
  };

  const isExperienceHighlighted = (experience: ExperienceItem) => {
    if (!selectedSkill) return false;
    return experience.tags.some((tag) => tag.toLowerCase() === selectedSkill.toLowerCase());
  };

  const isProjectHighlighted = (project: ProjectItem) => {
    if (!selectedSkill) return false;
    return project.tags.some((tag) => tag.toLowerCase() === selectedSkill.toLowerCase());
  };

  return (
    <div className="space-y-7">
      <SectionFrame id="section-2" code="02.stack" title="Skills" meta="n = 3">
        <div className="space-y-4">
          {selectedSkill && (
            <div className="module-muted flex flex-wrap items-center justify-between gap-3 px-3 py-2 text-xs">
              <span>
                filtering by <span className="text-[var(--accent)]">{selectedSkill}</span>
              </span>
              <button type="button" onClick={() => setSelectedSkill(null)} className="btn-terminal h-7 min-h-7 px-2 py-0 text-[10px]">
                Reset
              </button>
            </div>
          )}

          {skillGroups.map((group) => (
            <div key={group.label} className="grid gap-3 border-b border-dashed pb-4 last:border-b-0 last:pb-0 md:grid-cols-[150px_1fr]">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.16em] text-[var(--ink-muted)]">{group.label}</h3>
                <p className="mt-1 text-[10px] text-[var(--ink-soft)]">n = {group.items.length}</p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li key={skill} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => handleSkillClick(skill)}
                      className={`tag ${selectedSkill === skill ? "tag-active" : "hover:border-[var(--accent)] hover:text-[var(--ink)]"}`}
                    >
                      {skill}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame code="03.exp" title="Experience" meta={`n = ${cvData.experience.length}`}>
        <div className="space-y-3">
          {cvData.experience.map((experience, index) => {
            const isExpanded = expandedExperience.includes(experience.id);
            const isHighlighted = isExperienceHighlighted(experience);

            return (
              <article
                key={experience.id}
                className={`module-muted print-friendly transition-colors ${isHighlighted ? "border-[var(--accent)] bg-[var(--accent-soft)]" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggleExperience(experience.id)}
                  className="grid w-full gap-4 p-4 text-left md:grid-cols-[96px_1fr_auto]"
                  aria-expanded={isExpanded}
                >
                  <div className="text-[10px] leading-relaxed text-[var(--ink-muted)]">
                    <p>{experience.start}</p>
                    <p>{experience.end}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold text-[var(--ink)]">{experience.title}</h3>
                      <span className="text-[10px] text-[var(--ink-soft)]">[{String(index + 1).padStart(2, "0")}.01]</span>
                    </div>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">{experience.company}</p>
                  </div>
                  <span className="self-start text-[10px] uppercase text-[var(--accent)]">{isExpanded ? "collapse" : "expand"}</span>
                </button>

                {isExpanded && (
                  <div className="animate-fade-in border-t border-dashed px-4 pb-4 pt-3 md:ml-28">
                    <ul className="space-y-2 text-xs leading-relaxed text-[var(--ink-muted)]">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="text-[var(--accent)]">&gt;</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {experience.tags.map((tag) => (
                        <span key={tag} className={`tag ${selectedSkill?.toLowerCase() === tag.toLowerCase() ? "tag-active" : ""}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </SectionFrame>

      {cvData.projects.length > 0 && (
        <SectionFrame code="04.work" title="Selected Work" meta={`n = ${cvData.projects.length}`}>
          <div className="grid gap-3 lg:grid-cols-2">
            {cvData.projects.map((project, index) => {
              const isExpanded = expandedProjects.includes(project.id);
              const isHighlighted = isProjectHighlighted(project);

              return (
                <article
                  key={project.id}
                  className={`module-muted flex flex-col transition-colors ${isHighlighted ? "border-[var(--accent)] bg-[var(--accent-soft)]" : ""}`}
                >
                  <button type="button" onClick={() => toggleProject(project.id)} className="flex flex-1 flex-col p-4 text-left" aria-expanded={isExpanded}>
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <span className="text-[10px] text-[var(--accent)]">P-{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] text-[var(--ink-muted)]">{project.type}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--ink)]">{project.name}</h3>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[var(--ink-soft)]">
                      {project.start} / {project.end}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)]">{project.bullets[0]}</p>
                    <span className="mt-4 text-[10px] uppercase text-[var(--accent)]">{isExpanded ? "collapse" : "details"}</span>
                  </button>

                  {isExpanded && (
                    <div className="animate-fade-in border-t border-dashed p-4">
                      <ul className="space-y-2 text-xs leading-relaxed text-[var(--ink-muted)]">
                        {project.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-2">
                            <span className="text-[var(--accent)]">&gt;</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className={`tag ${selectedSkill?.toLowerCase() === tag.toLowerCase() ? "tag-active" : ""}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex text-[10px] uppercase tracking-[0.12em] text-[var(--accent)] underline"
                        >
                          {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </SectionFrame>
      )}

      <div className="grid gap-7 lg:grid-cols-[1fr_0.78fr]">
        <SectionFrame code="05.edu" title="Education">
          <div className="space-y-3">
            {cvData.education.map((education) => (
              <article key={education.id} className="module-muted p-4 print-friendly">
                <div className="grid gap-3 md:grid-cols-[96px_1fr]">
                  <div className="text-[10px] leading-relaxed text-[var(--ink-muted)]">
                    <p>{education.start}</p>
                    <p>{education.end}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--ink)]">{education.program}</h3>
                    <p className="mt-1 text-xs text-[var(--ink-muted)]">{education.school}</p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)]">{education.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame code="06.certs" title="Certifications" meta={`n = ${cvData.certifications.length}`}>
          <div className="space-y-3">
            {cvData.certifications.map((certification) => (
              <article key={certification.id} className="module-muted p-4">
                <h3 className="text-sm font-semibold text-[var(--ink)]">{certification.name}</h3>
                {certification.issuer && <p className="mt-1 text-xs text-[var(--ink-muted)]">{certification.issuer}</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {certification.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionFrame>
      </div>

      <div className="grid gap-7 lg:grid-cols-[0.38fr_1.62fr]">
        <SectionFrame code="07.lang" title="Languages">
          <div className="space-y-2">
            {cvData.languages.map((language) => (
              <div key={language.language} className="flex items-center justify-between gap-4 border-b border-dashed py-2 text-xs last:border-b-0">
                <span className="text-[var(--ink)]">{language.language}</span>
                <span className="text-right text-[var(--ink-muted)]">{language.proficiency}</span>
              </div>
            ))}
          </div>
        </SectionFrame>

        <SectionFrame code="08.awards" title="Awards & Activities" meta={`n = ${cvData.awards.length + cvData.extracurricular.length}`}>
          <div className="space-y-3">
            {[
              ...cvData.awards.map((item) => ({ ...item, organization: "" })),
              ...cvData.extracurricular,
            ].map((item) => (
              <article key={item.id} className="text-xs leading-relaxed">
                <h3 className="text-sm font-semibold text-[var(--ink)]">{item.name}</h3>
                {item.organization && <p className="text-[10px] uppercase tracking-[0.08em] text-[var(--accent)]">{item.organization}</p>}
                <p className="mt-1 text-[var(--ink-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </SectionFrame>
      </div>
    </div>
  );
};

function SectionFrame({
  id,
  code,
  title,
  meta,
  children,
}: {
  id?: string;
  code: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="module scroll-mt-24">
      <div className="module-header">
        <div className="flex items-center gap-2">
          <span className="status-dot" aria-hidden />
          <span>{code}</span>
          <span className="hidden text-[var(--ink-soft)] sm:inline">|</span>
          <span className="hidden sm:inline">{title}</span>
        </div>
        {meta && <span>{meta}</span>}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export default InteractiveCv;
