import type { ReactNode } from 'react';

const work = [
  {
    name: 'GatorPark',
    type: 'Realtime mobile product',
    year: 'iOS / Firebase',
    summary: 'Anonymous check-ins, live garage occupancy, and an iOS-first interface for parking availability.',
    impact: 'Turns uncertain campus parking into a live availability signal.',
    stack: ['Swift', 'Firebase', 'Firestore', 'App Store', 'Realtime'],
    proof: ['Anonymous auth flow', 'Live occupancy state', 'Privacy-minimal design'],
    gradient: 'from-blue-500/30 via-cyan-400/10 to-transparent'
  },
  {
    name: 'LabSafe',
    type: 'Research software system',
    year: 'Django / LIMS',
    summary: 'Laboratory information management system for animal science workflows, records, and structured requests.',
    impact: 'Replaces fragmented spreadsheets, paper trails, and email chains with a traceable central system.',
    stack: ['Django', 'Database', 'RBAC', 'Data Import', 'Research Ops'],
    proof: ['Role-aware access', 'Lineage visualisation', 'Operational request flows'],
    gradient: 'from-emerald-400/25 via-blue-500/10 to-transparent'
  },
  {
    name: 'MetaShift',
    type: 'Digital collections automation',
    year: 'Desktop / Metadata',
    summary: 'Matches catalogue metadata to image files and exports organised, diagnostics-backed batch folders.',
    impact: 'Makes messy archival image collections usable, auditable, and ready for delivery.',
    stack: ['Desktop', 'Metadata', 'Data Cleaning', 'Batch Export', 'Reports'],
    proof: ['Identifier normalisation', 'Duplicate detection', 'Missing record reports'],
    gradient: 'from-violet-500/25 via-blue-500/10 to-transparent'
  },
  {
    name: 'Archivault',
    type: 'Archival integrity tool',
    year: 'Checksums / Verification',
    summary: 'Generates checksum manifests and verifies stored folders for missing, changed, or corrupted files.',
    impact: 'Gives archival workflows confidence that stored files remain intact over time.',
    stack: ['SHA-1', 'MD5', 'JSON Manifests', 'Verification', 'Reliability'],
    proof: ['Manifest generation', 'Folder verification', 'Mismatch summaries'],
    gradient: 'from-amber-400/20 via-sky-500/10 to-transparent'
  }
];

const labs = [
  'Machine Learning systems',
  'Distributed quantum algorithms',
  'Data-heavy research software',
  'Realtime mobile infrastructure',
  'Archival and laboratory workflows',
  'Human-centred technical products'
];

const metrics = [
  ['05+', 'technical domains'],
  ['04', 'selected builds'],
  ['360°', 'product → engineering'],
  ['2026', 'Toronto research']
];

const timeline = [
  {
    label: 'Foundation',
    title: 'Mathematics + Computer Science',
    text: 'A rigorous base for algorithms, systems, modelling, and technical problem solving.'
  },
  {
    label: 'Build',
    title: 'Production-minded software',
    text: 'Mobile apps, backend systems, desktop tools, data pipelines, and research-facing software.'
  },
  {
    label: 'Research',
    title: 'ML × Quantum direction',
    text: 'Focusing on the overlap between machine learning, computational systems, and quantum computing research.'
  }
];

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02040d] text-slate-100 selection:bg-cyan-300 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(59,130,246,0.28),transparent_34%),radial-gradient(circle_at_78%_5%,rgba(45,212,191,0.16),transparent_28%),radial-gradient(circle_at_82%_82%,rgba(168,85,247,0.16),transparent_32%),linear-gradient(180deg,#02040d_0%,#07111f_48%,#02040d_100%)]" />
        <div className="grid-fade absolute inset-0 opacity-50" />
        <div className="noise absolute inset-0 opacity-[0.08]" />
        <div className="orbital-ring absolute right-[-14rem] top-[-16rem] h-[44rem] w-[44rem] rounded-full border border-cyan-300/15" />
        <div className="orbital-ring slow absolute bottom-[-20rem] left-[-18rem] h-[38rem] w-[38rem] rounded-full border border-blue-300/10" />
      </div>
      {children}
    </div>
  );
}

function GlowCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_-52px_rgba(56,189,248,0.75)] backdrop-blur-xl ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      {children}
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100">{children}</span>;
}

function Section({ id, kicker, title, subtitle, children }: { id: string; kicker: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 py-14 md:py-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">{kicker}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
        {subtitle ? <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Nav() {
  const links = ['work', 'research', 'stack', 'contact'];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#02040d]/72 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.16)]">HT</span>
          <span className="hidden text-xs font-bold uppercase tracking-[0.22em] text-slate-200 sm:block">Hassan Tariq Shafi</span>
        </a>
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link}`} className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-300 transition hover:bg-white/10 hover:text-white">
              {link}
            </a>
          ))}
        </div>
        <a href="mailto:hassantariq233@gmail.com" className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-200 hover:text-slate-950">
          Contact
        </a>
      </nav>
    </header>
  );
}

function NeuralPreview() {
  const nodes = [
    ['12%', '20%'], ['20%', '58%'], ['34%', '36%'], ['46%', '70%'], ['58%', '24%'], ['70%', '55%'], ['84%', '34%']
  ];
  const paths = [
    [0, 2], [1, 2], [2, 4], [2, 3], [3, 5], [4, 5], [5, 6], [1, 3], [0, 4]
  ];

  return (
    <GlowCard className="min-h-[420px] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200">live focus map</p>
          <h3 className="mt-2 text-xl font-semibold text-white">ML × Quantum × Systems</h3>
        </div>
        <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">available</span>
      </div>
      <div className="relative mt-8 h-72 rounded-3xl border border-white/10 bg-slate-950/60">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {paths.map(([a, b]) => (
            <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(103,232,249,.28)" strokeWidth="0.35" />
          ))}
        </svg>
        {nodes.map(([left, top], index) => (
          <span key={`${left}-${top}`} className="node-pulse absolute h-4 w-4 rounded-full border border-cyan-200/70 bg-cyan-300/30 shadow-[0_0_34px_rgba(34,211,238,0.65)]" style={{ left, top, animationDelay: `${index * 180}ms` }} />
        ))}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs text-cyan-100 shadow-2xl backdrop-blur">
          <p><span className="text-emerald-300">hassan@portfolio</span>:~$ build --research-grade</p>
          <p className="mt-2 text-slate-300">optimising: systems, ML, quantum benchmarks, product detail...</p>
        </div>
      </div>
    </GlowCard>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-16 md:grid-cols-[1.1fr_.9fr] md:px-8 md:pb-24 md:pt-24">
      <div>
        <div className="flex flex-wrap gap-2">
          <Pill>Mathematics + Computer Science</Pill>
          <Pill>AI / ML</Pill>
          <Pill>Quantum research direction</Pill>
        </div>
        <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.08em] text-white md:text-7xl lg:text-8xl">
          Building software at the edge of research, data, and product.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
          I turn ambiguous technical problems into real systems: realtime mobile apps, laboratory software, archival automation, data tooling, and research-facing engineering for the machine learning and quantum computing frontier.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#work" className="rounded-full bg-cyan-200 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate-950 shadow-[0_0_44px_rgba(34,211,238,0.35)] transition hover:-translate-y-0.5 hover:bg-white motion-reduce:transform-none">
            Explore work
          </a>
          <a href="https://uk.linkedin.com/in/hassan-tariq-shafi" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:border-cyan-200/70 hover:text-cyan-100 motion-reduce:transform-none">
            LinkedIn
          </a>
        </div>
        <div className="mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {metrics.map(([value, label]) => (
            <GlowCard key={label} className="p-4">
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
            </GlowCard>
          ))}
        </div>
      </div>
      <NeuralPreview />
    </section>
  );
}

function ProjectCard({ project, index }: { project: (typeof work)[number]; index: number }) {
  return (
    <GlowCard className="group min-h-full p-0 transition duration-500 hover:-translate-y-2 hover:border-cyan-200/30 motion-reduce:transform-none">
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-70 transition group-hover:opacity-100`} />
      <div className="relative p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">0{index + 1} / {project.type}</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">{project.name}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">{project.year}</span>
        </div>
        <p className="mt-5 text-base leading-7 text-slate-200">{project.summary}</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Impact</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{project.impact}</p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Proof</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {project.proof.map((item) => (
                <li key={item} className="flex gap-2"><span className="text-cyan-200">✦</span>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">Stack</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-slate-200">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </GlowCard>
  );
}

function Research() {
  return (
    <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
      <GlowCard className="p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">current vector</p>
        <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">From strong fundamentals to research-grade systems.</h3>
        <p className="mt-5 leading-8 text-slate-300">
          The direction is clear: combine mathematical maturity, software engineering discipline, and practical experimentation to contribute to machine learning and quantum computing research environments.
        </p>
      </GlowCard>
      <div className="grid gap-5 sm:grid-cols-2">
        {labs.map((item) => (
          <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition hover:border-cyan-200/30 hover:bg-white/[0.07]">
            <span className="mb-5 block h-1 w-12 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(34,211,238,.55)]" />
            <p className="font-semibold text-white">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stack() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {timeline.map((item, index) => (
        <GlowCard key={item.title} className="p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">{item.label}</p>
          <h3 className="mt-4 text-2xl font-bold text-white">{item.title}</h3>
          <p className="mt-4 leading-7 text-slate-300">{item.text}</p>
          <div className="mt-7 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-lg font-black text-cyan-100">{index + 1}</div>
        </GlowCard>
      ))}
    </div>
  );
}

export function App() {
  return (
    <Shell>
      <Nav />
      <main>
        <Hero />
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Section
            id="work"
            kicker="selected systems"
            title="Not just projects — proof of range."
            subtitle="A curated set of builds showing the ability to move between product, data, research operations, mobile infrastructure, and reliability tooling."
          >
            <div className="grid gap-5 lg:grid-cols-2">
              {work.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}
            </div>
          </Section>

          <Section
            id="research"
            kicker="research direction"
            title="Machine learning depth with quantum ambition."
            subtitle="The site now frames you as someone with practical delivery ability and a serious research trajectory — not a generic student portfolio."
          >
            <Research />
          </Section>

          <Section
            id="stack"
            kicker="positioning"
            title="The story recruiters should remember."
            subtitle="A simple narrative: strong fundamentals, shipping ability, and a future-facing technical direction."
          >
            <Stack />
          </Section>

          <Section id="contact" kicker="next move" title="Let’s build what sits between research and real-world use.">
            <GlowCard className="p-7 md:p-10">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <p className="max-w-2xl text-lg leading-8 text-slate-300">
                    Open to research-aligned software engineering, AI/ML opportunities, quantum computing projects, and technical collaborations where detail matters.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="mailto:hassantariq233@gmail.com" className="rounded-full bg-cyan-200 px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-slate-950 transition hover:bg-white">Email</a>
                  <a href="https://uk.linkedin.com/in/hassan-tariq-shafi" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-cyan-200/70 hover:text-cyan-100">LinkedIn</a>
                </div>
              </div>
            </GlowCard>
          </Section>
        </div>
      </main>
    </Shell>
  );
}
