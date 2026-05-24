import ChatWidget from "@/components/ChatWidget";
import ContactForm from "@/components/ContactForm";
import CvActionButtons from "@/components/CvActionButtons";
import InteractiveCv from "@/components/InteractiveCv";
import cvData from "@/data/cv.json";

export default function Home() {
  const skillCount =
    cvData.skills.languages.length + cvData.skills.frameworks.length + cvData.skills.tools.length + cvData.skills.methods.length;

  return (
    <div className="dossier-shell">
      <div className="dossier-page space-y-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">
          <div className="flex flex-wrap items-center gap-3">
            <span className="status-dot status-dot-ok rounded-full" aria-hidden />
            <span>system_online</span>
            <span className="hidden h-4 w-px bg-[var(--outline-variant)] sm:inline-block" aria-hidden />
            <span>blanca.barrufet</span>
            <span>2026.05</span>
            <span>build 04.cv</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--accent)]">
            <span className="status-dot rounded-full" aria-hidden />
            <span>recording</span>
          </div>
        </div>

        <section className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.31fr)]">
          <div className="module">
            <div className="module-header">
              <div className="flex items-center gap-2">
                <span className="status-dot" aria-hidden />
                <span>00.id</span>
                <span>|</span>
                <span>Identity</span>
              </div>
              <span>primary</span>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-[1fr_154px]">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">$ whoami</p>
                <h1 className="text-[clamp(2.4rem,7vw,5.4rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-[var(--ink)]">
                  Blanca M Barrufet
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.1em]">
                  <span className="tag-active border px-2 py-1">AI and Data Engineer</span>
                  <span className="text-[var(--ink-muted)]">/ Barcelona</span>
                </div>
                <p className="mt-5 max-w-[66ch] text-sm leading-relaxed text-[var(--ink-muted)]">
                  {cvData.summary[1]} {cvData.summary[2]}
                </p>
                <div className="mt-5">
                  <CvActionButtons email={cvData.profile.email} />
                </div>
              </div>

              <div className="module-muted flex min-h-[210px] flex-col items-center justify-between p-4">
                <span className="self-start text-[10px] text-[var(--ink-muted)]">portrait.svg</span>
                <div className="relative h-28 w-28">
                  <div className="absolute left-1/2 top-3 h-14 w-14 -translate-x-1/2 rounded-full border border-dashed border-[var(--outline-strong)]" />
                  <div className="absolute left-1/2 top-9 h-2 w-2 -translate-x-1/2 rounded-full bg-[var(--accent)]" />
                  <div className="absolute bottom-2 left-1/2 h-14 w-24 -translate-x-1/2 rounded-t-full border border-dashed border-[var(--outline-strong)] border-b-0" />
                </div>
                <span className="self-end text-[10px] text-[var(--ink-muted)]">180*220</span>
              </div>
            </div>
          </div>

          <div className="module">
            <div className="module-header">
              <div className="flex items-center gap-2">
                <span className="status-dot" aria-hidden />
                <span>00.meta</span>
                <span>|</span>
                <span>Meta</span>
              </div>
            </div>
            <div className="space-y-3 p-5 text-xs">
              <MetaRow label="name" value={cvData.profile.name} />
              <MetaRow label="location" value={cvData.profile.location} />
              <MetaRow label="email" value={cvData.profile.email} href={`mailto:${cvData.profile.email}`} />
              <MetaRow label="web" value="blancabarrufet.me" />
              <MetaRow label="status" value="open - advisory - roles" />
              <MetaRow label="ts" value="2026-05-23T14:00:00Z" />
              <div className="module-muted mt-4 p-3 text-[11px] leading-relaxed">
                <p>
                  <span className="text-[var(--accent)]">~/blanca</span> $ cat about.md
                </p>
                <p># builds retrieval systems</p>
                <p># currently @ connecthink</p>
                <p>
                  <span className="text-[var(--accent)]">~/blanca</span> $
                </p>
              </div>
            </div>
          </div>
        </section>

        <ChatWidget />

        <div className="grid gap-7 lg:grid-cols-4">
          <StatBlock code="exp" value={cvData.experience.length} label="roles" />
          <StatBlock code="work" value={cvData.projects.length} label="projects" />
          <StatBlock code="stack" value={skillCount} label="signals" />
          <StatBlock code="lang" value={cvData.languages.length} label="languages" />
        </div>

        <InteractiveCv />

        <section id="contact" className="module scroll-mt-24">
          <div className="module-header">
            <div className="flex items-center gap-2">
              <span className="status-dot" aria-hidden />
              <span>09.mail</span>
              <span>|</span>
              <span>Contact</span>
            </div>
          </div>
          <div className="grid gap-6 p-5 lg:grid-cols-[0.45fr_1fr]">
            <div>
              <h2 className="text-xl font-semibold text-[var(--ink)]">Send a signal.</h2>
              <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--ink-muted)]">
                Use the form for roles, internships, collaborations, and AI retrieval projects.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </div>
  );
}

function MetaRow({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = href ? (
    <a href={href} className="break-all text-[var(--ink)] underline hover:text-[var(--accent)]">
      {value}
    </a>
  ) : (
    <span className="break-words text-[var(--ink)]">{value}</span>
  );

  return (
    <div className="grid grid-cols-[92px_1fr] gap-3">
      <span className="text-[var(--ink-muted)]">{label}</span>
      {content}
    </div>
  );
}

function StatBlock({ code, value, label }: { code: string; value: number; label: string }) {
  return (
    <div className="module p-4">
      <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">{code}</p>
      <p className="mt-3 text-3xl font-semibold leading-none text-[var(--ink)]">{value}</p>
      <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[var(--ink-muted)]">{label}</p>
    </div>
  );
}
