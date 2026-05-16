import type { ReactNode } from 'react';

const projects = [
  {
    name: 'GatorPark',
    oneLine: 'Real-time iOS parking availability app with anonymous check-ins and live occupancy.',
    purpose: 'Make parking availability easier to check through live occupancy updates.',
    features: [
      'Anonymous check-in/check-out flow',
      'Live garage availability status',
      'Firebase/Firestore-backed updates',
      'iOS-first interface'
    ],
    demonstrates: 'Mobile engineering, real-time data, Firebase architecture, and product thinking.',
    tags: ['iOS', 'Swift', 'Firebase', 'Firestore', 'Realtime']
  },
  {
    name: 'LabSafe',
    oneLine: '“Stop chasing information, use it.” Laboratory information management system for animal science workflows.',
    purpose: 'Reduce fragmented lab information workflows by centralising research animal records and operational requests.',
    features: [
      'Animal record management',
      'Structured request workflows',
      'Role-aware access',
      'Import/deployment support',
      'Research lab data organisation'
    ],
    demonstrates: 'Django/backend systems, database-backed software, lab workflows, access control, and research software.',
    tags: ['Django', 'Backend', 'Database', 'LIMS']
  },
  {
    name: 'MetaShift',
    oneLine: 'Desktop software for matching catalogue metadata to image files and exporting organised batches.',
    purpose: 'Help digital collections teams process large image collections by matching catalogue records to image files and exporting organised batches.',
    features: [
      'Scans selected image folders',
      'Reads catalogue metadata files',
      'Normalises catalogue identifiers and image filenames',
      'Matches records to image files',
      'Detects and resolves duplicate mappings',
      'Exports organised batch folders',
      'Creates diagnostic reports for missing catalogue records and unmatched images'
    ],
    demonstrates: 'Metadata automation, archive workflows, desktop software, data cleaning, and reporting pipelines.',
    tags: ['Desktop', 'Metadata', 'Data Cleaning', 'Reporting']
  },
  {
    name: 'Archivault',
    oneLine: 'Desktop archival integrity tool for checksum manifest generation and verification.',
    purpose: 'Protect archival and storage workflows by generating checksum manifests and verifying folders later for missing, changed, or corrupted files.',
    features: [
      'Generate checksum manifests',
      'Verify stored folders against saved checksums',
      'Detect OK, missing, and mismatched files',
      'Support SHA-1 and MD5',
      'Support Archivault JSON manifests and common checksum files',
      'Produce logs and verification summaries'
    ],
    demonstrates: 'File integrity, checksum verification, archival systems, storage reliability, and data preservation.',
    tags: ['Checksums', 'SHA-1', 'MD5', 'Archival', 'Reliability']
  }
];

const evidencePoints = [
  'Built real-time mobile software',
  'Built laboratory information software',
  'Built digital collections automation tools',
  'Built archival integrity tooling',
  'Worked across frontend, backend, desktop, data, and infrastructure-style problems'
];

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative space-y-6 scroll-mt-24">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{title}</h2>
        {subtitle ? <p className="max-w-3xl text-slate-300">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Badge({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-100">{children}</span>;
}

function ActionLink({ href, children, primary = false }: { href: string; children: ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      className={[
        'inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
        primary
          ? 'border border-blue-300/70 bg-electric text-slate-950 hover:bg-blue-300'
          : 'border border-blue-400/35 bg-slate-900/70 text-slate-100 hover:border-electric hover:text-electric'
      ].join(' ')}
    >
      {children}
    </a>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-blue-500/20 bg-slate-900/60 p-6 shadow-[0_16px_60px_-32px_rgba(37,99,235,0.6)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-electric/70 hover:shadow-[0_20px_80px_-28px_rgba(59,130,246,0.55)] motion-reduce:transform-none">
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-electric/10 blur-3xl" />
      <div className="relative">
        <h3 className="text-xl font-semibold text-white">{project.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.oneLine}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-300"><span className="font-medium text-slate-100">Purpose:</span> {project.purpose}</p>
        <div className="mt-4 text-sm">
          <p className="font-medium text-slate-100">Key features</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-300">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300"><span className="font-medium text-slate-100">What this proves:</span> {project.demonstrates}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </div>
    </article>
  );
}

export function App() {
  return (
    <div className="site-bg relative min-h-screen overflow-x-clip bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_82%_4%,rgba(14,116,144,0.16),transparent_36%),radial-gradient(circle_at_72%_76%,rgba(37,99,235,0.16),transparent_30%)]" />
        <div className="grid-overlay absolute inset-0" />
        <div className="orbit-layer absolute inset-0" />
      </div>

      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-950/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-300">
          <a href="#hero" className="font-semibold tracking-[0.08em] text-slate-100">HASSAN TARIQ SHAFI</a>
          <div className="flex gap-5">
            {['work', 'research', 'evidence', 'contact'].map((section) => (
              <a key={section} href={`#${section}`} className="transition hover:text-electric focus-visible:outline-none focus-visible:text-electric">
                {section[0].toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="relative mx-auto max-w-6xl space-y-20 px-6 pb-20 pt-14 md:space-y-24 md:pt-24">
        <section id="hero" className="relative scroll-mt-24 overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-900/45 px-6 py-12 shadow-[inset_0_1px_0_rgba(148,163,184,0.12),0_20px_80px_-48px_rgba(59,130,246,0.5)] backdrop-blur-sm md:px-10 md:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-electric/20 blur-3xl" />
          <div className="pointer-events-none absolute bottom-4 right-8 hidden h-24 w-24 rounded-full border border-blue-400/35 md:block" />
          <p className="text-xs uppercase tracking-[0.24em] text-electric">Technical Portfolio</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
            Converging Machine Learning and Quantum Computing through a Mathematics and Computer Science foundation.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">
            Hassan Tariq Shafi is a Mathematics and Computer Science student building focused technical projects across mobile systems, laboratory software, digital collections automation, archival integrity, and research-driven software.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ActionLink href="#work" primary>View Selected Work</ActionLink>
            <ActionLink href="https://uk.linkedin.com/in/hassan-tariq-shafi">LinkedIn</ActionLink>
          </div>
        </section>

        <Section id="work" title="Selected Work" subtitle="Four production-minded projects that demonstrate software craftsmanship across mobile, backend, data automation, and archival reliability.">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </Section>

        <Section
          id="research"
          title="Research Direction"
          subtitle="Built on a Mathematics and Computer Science foundation, Hassan is developing deeper focus in Machine Learning and Quantum Computing while continuing to build software for technical, research, and data-heavy workflows."
        >
          <div className="rounded-2xl border border-blue-500/20 bg-slate-900/50 p-6 text-slate-200 shadow-[0_16px_50px_-36px_rgba(37,99,235,0.8)] backdrop-blur-sm">
            <p className="leading-relaxed">
              Current direction is to combine rigorous mathematics and systems-focused software engineering with practical machine learning experimentation and quantum-aware computational thinking.
            </p>
          </div>
        </Section>

        <Section id="evidence" title="Project Evidence" subtitle="A quick scan of concrete delivery themes proven through completed work.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {evidencePoints.map((point, index) => (
              <article key={point} className="relative rounded-xl border border-blue-500/20 bg-slate-900/55 p-4 text-sm text-slate-200 shadow-[0_14px_40px_-35px_rgba(59,130,246,0.9)]">
                <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/50 text-xs font-semibold text-electric">{index + 1}</span>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="rounded-2xl border border-blue-500/20 bg-slate-900/55 p-6 shadow-[0_16px_50px_-35px_rgba(59,130,246,0.8)] backdrop-blur-sm">
            <p className="max-w-2xl text-slate-300">
              For technical discussion, project collaboration, or research-aligned opportunities, connect via LinkedIn.
            </p>
            <div className="mt-4">
              <ActionLink href="https://uk.linkedin.com/in/hassan-tariq-shafi">Connect on LinkedIn</ActionLink>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
