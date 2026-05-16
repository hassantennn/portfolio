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

export function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-50 border-b border-blue-500/20 bg-slate-950/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-300">
          <span className="font-medium tracking-wide text-slate-100">Hassan Tariq Shafi</span>
          <div className="flex gap-5">
            {['work', 'research', 'evidence', 'contact'].map((section) => (
              <a key={section} href={`#${section}`} className="transition hover:text-electric">
                {section[0].toUpperCase() + section.slice(1)}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12 md:py-20">
        <section id="hero" className="space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-electric">Technical Portfolio</p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Converging Machine Learning and Quantum Computing through a Mathematics and Computer Science foundation.
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-slate-300">
            Hassan Tariq Shafi is a Mathematics and Computer Science student building focused technical projects across mobile systems, laboratory software, digital collections automation, archival integrity, and research-driven software.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="rounded-md border border-electric bg-electric px-4 py-2 font-medium text-slate-950 transition hover:bg-blue-400">View Selected Work</a>
            <a href="https://uk.linkedin.com/in/hassan-tariq-shafi" className="rounded-md border border-blue-500/40 px-4 py-2 font-medium text-slate-100 transition hover:border-electric hover:text-electric">LinkedIn</a>
          </div>
        </section>

        <section id="work" className="space-y-6">
          <h2 className="text-2xl font-semibold md:text-3xl">Selected Work</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.name} className="rounded-xl border border-blue-500/25 bg-slate-900/70 p-5 transition hover:border-electric/60 hover:shadow-[0_0_0_1px_rgba(59,130,246,0.4)]">
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="mt-2 text-sm text-slate-300">{project.oneLine}</p>
                <p className="mt-3 text-sm"><span className="font-medium text-slate-100">Purpose:</span> <span className="text-slate-300">{project.purpose}</span></p>
                <div className="mt-3 text-sm">
                  <p className="font-medium text-slate-100">Key features:</p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-slate-300">
                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </div>
                <p className="mt-3 text-sm"><span className="font-medium text-slate-100">Demonstrates:</span> <span className="text-slate-300">{project.demonstrates}</span></p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => <span key={tag} className="rounded border border-blue-500/35 px-2 py-1 text-xs text-blue-200">{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="space-y-3">
          <h2 className="text-2xl font-semibold md:text-3xl">Research Direction</h2>
          <p className="max-w-4xl text-slate-300">
            Built on a Mathematics and Computer Science foundation, Hassan is developing deeper focus in Machine Learning and Quantum Computing while continuing to build software for technical, research, and data-heavy workflows.
          </p>
        </section>

        <section id="evidence" className="space-y-6">
          <h2 className="text-2xl font-semibold md:text-3xl">Project Evidence</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {evidencePoints.map((point) => (
              <div key={point} className="rounded-lg border border-blue-500/25 bg-slate-900/60 p-4 text-sm text-slate-200">
                {point}
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="space-y-3 border-t border-blue-500/20 pt-8">
          <h2 className="text-2xl font-semibold md:text-3xl">Contact</h2>
          <a href="https://uk.linkedin.com/in/hassan-tariq-shafi" className="inline-flex rounded-md border border-blue-500/40 px-4 py-2 font-medium text-slate-100 transition hover:border-electric hover:text-electric">
            LinkedIn
          </a>
        </section>
      </main>
    </div>
  );
}
