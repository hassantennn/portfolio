import { useEffect, useMemo, useState, type CSSProperties, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import labSafeLogo from './assets/labsafe-logo-clean.png';
import metaShiftLogo from './assets/metashift-logo-clean.png';
import archivaultLogo from './assets/archivault-logo-clean.png';
import gatorParkLogo from './assets/gatorpark-logo-clean.png';

type Accent = 'emerald' | 'violet' | 'amber' | 'cyan';
type Popup = { type: 'project'; project: Project } | { type: 'focus'; focus: Focus } | null;

type Project = {
  name: string;
  label: string;
  year: string;
  accent: Accent;
  logo: string;
  summary: string;
  impact: string;
  sceneLabel: string;
  proof: string[];
  stack: string[];
  metrics: [string, string][];
  story: string[];
};

type Focus = {
  title: string;
  tag: string;
  accent: Accent;
  description: string;
  nodes: string[];
};

const projects: Project[] = [
  {
    name: 'LabSafe',
    label: 'Research software system',
    year: 'Django / LIMS',
    accent: 'emerald',
    logo: labSafeLogo,
    summary: 'A laboratory information management system for animal science workflows, structured records, and traceable operational requests.',
    impact: 'Moves research operations away from fragmented spreadsheets, paper trails, and email chains into a controlled central system.',
    sceneLabel: 'Research ops matrix',
    proof: ['Role-aware access', 'Lineage visualisation', 'Structured request flows'],
    stack: ['Django', 'Database', 'RBAC', 'Data Import', 'Research Ops'],
    metrics: [['03', 'role layers'], ['100%', 'traceable'], ['02', 'workflow lanes']],
    story: ['Designed around research-lab accountability.', 'Gives teams clearer operational visibility.', 'Turns messy records into structured software flows.']
  },
  {
    name: 'MetaShift',
    label: 'Digital collections automation',
    year: 'Desktop / Metadata',
    accent: 'violet',
    logo: metaShiftLogo,
    summary: 'Desktop software that matches catalogue metadata to image files and exports organised, diagnostics-backed batch folders.',
    impact: 'Makes messy archival image collections usable, auditable, and ready for delivery without manual matching chaos.',
    sceneLabel: 'Metadata alignment field',
    proof: ['Identifier normalisation', 'Duplicate detection', 'Missing record reports'],
    stack: ['Desktop', 'Metadata', 'Data Cleaning', 'Batch Export', 'Reports'],
    metrics: [['04', 'pipeline stages'], ['99%', 'cleaner'], ['∞', 'batch scale']],
    story: ['Built for archives and digital collections.', 'Highlights missing and unmatched records.', 'Transforms raw folders into delivery-ready batches.']
  },
  {
    name: 'Archivault',
    label: 'Archival integrity tool',
    year: 'Checksums / Verification',
    accent: 'amber',
    logo: archivaultLogo,
    summary: 'A checksum manifest generator and verifier for detecting missing, changed, or corrupted files in storage workflows.',
    impact: 'Gives archival workflows confidence that stored material remains intact over time.',
    sceneLabel: 'Integrity verification grid',
    proof: ['Manifest generation', 'Folder verification', 'Mismatch summaries'],
    stack: ['SHA-1', 'MD5', 'JSON Manifests', 'Verification', 'Reliability'],
    metrics: [['02', 'hash modes'], ['01', 'manifest core'], ['0', 'silent drift']],
    story: ['Turns invisible storage risk into clear signals.', 'Supports repeatable long-term checks.', 'Designed around trust, preservation, and auditability.']
  },
  {
    name: 'GatorPark',
    label: 'Realtime mobile product',
    year: 'iOS / Firebase',
    accent: 'cyan',
    logo: gatorParkLogo,
    summary: 'An iOS-first parking availability product with anonymous check-ins and live garage occupancy state.',
    impact: 'Turns uncertain campus parking into a live availability signal that users can understand quickly.',
    sceneLabel: 'Live occupancy plane',
    proof: ['Anonymous auth flow', 'Live occupancy state', 'Privacy-minimal design'],
    stack: ['Swift', 'Firebase', 'Firestore', 'App Store', 'Realtime'],
    metrics: [['19ms', 'signal feel'], ['24/7', 'availability'], ['01', 'mobile app']],
    story: ['Prioritises simple user behaviour over heavy accounts.', 'Uses live state to make availability feel current.', 'Keeps the product privacy-minimal and practical.']
  }
];

const focusAreas: Focus[] = [
  {
    title: 'AI / ML systems',
    tag: 'Learning systems',
    accent: 'violet',
    description: 'Practical ML thinking connected to data pipelines, evaluation, and deployable software.',
    nodes: ['Data cleaning', 'Experiments', 'Evaluation', 'Interfaces']
  },
  {
    title: 'Quantum computing research',
    tag: 'Research vector',
    accent: 'emerald',
    description: 'A future-facing direction combining systems thinking with distributed quantum algorithm benchmarking.',
    nodes: ['Benchmarks', 'Distributed constraints', 'Research notes', 'Performance']
  },
  {
    title: 'Product engineering',
    tag: 'Shipping ability',
    accent: 'cyan',
    description: 'Turning ambiguous ideas into interfaces, architecture, and usable product experiences.',
    nodes: ['Architecture', 'UI polish', 'Real users', 'Deployment']
  }
];

const metrics = [
  ['04', 'selected products'],
  ['05+', 'technical domains'],
  ['360°', 'research → product'],
  ['2026', 'Toronto research']
];

const stackGroups = [
  ['Software', 'React', 'TypeScript', 'Swift', 'Django', 'Python'],
  ['Data / ML', 'PyTorch', 'TensorFlow', 'Pandas', 'Scikit-learn', 'SQL'],
  ['Systems', 'Firebase', 'Firestore', 'REST APIs', 'GitHub', 'Cloud'],
  ['Research', 'Quantum computing', 'Algorithms', 'Benchmarking', 'Reports', 'Visualisation']
];

function tone(accent: Accent) {
  return {
    emerald: {
      soft: 'from-emerald-300/22 via-teal-300/8 to-transparent',
      text: 'text-emerald-100',
      border: 'border-emerald-300/24',
      bg: 'bg-emerald-300/[0.12]',
      ring: 'shadow-[0_0_55px_rgba(52,211,153,0.18)]'
    },
    violet: {
      soft: 'from-violet-300/24 via-fuchsia-300/8 to-transparent',
      text: 'text-violet-100',
      border: 'border-violet-300/24',
      bg: 'bg-violet-300/[0.13]',
      ring: 'shadow-[0_0_55px_rgba(192,132,252,0.18)]'
    },
    amber: {
      soft: 'from-amber-300/20 via-orange-300/8 to-transparent',
      text: 'text-amber-100',
      border: 'border-amber-300/24',
      bg: 'bg-amber-300/[0.12]',
      ring: 'shadow-[0_0_55px_rgba(251,191,36,0.16)]'
    },
    cyan: {
      soft: 'from-cyan-300/24 via-blue-300/8 to-transparent',
      text: 'text-cyan-100',
      border: 'border-cyan-300/24',
      bg: 'bg-cyan-300/[0.13]',
      ring: 'shadow-[0_0_55px_rgba(34,211,238,0.18)]'
    }
  }[accent];
}

function useTilt(intensity = 10) {
  const [style, setStyle] = useState<CSSProperties>({});

  function onPointerMove(event: ReactPointerEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setStyle({
      transform: `rotateX(${(0.5 - y) * intensity}deg) rotateY(${(x - 0.5) * intensity}deg)`,
      ['--mx' as string]: `${x * 100}%`,
      ['--my' as string]: `${y * 100}%`
    });
  }

  function onPointerLeave() {
    setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  }

  return { style, onPointerMove, onPointerLeave };
}

function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`surface relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-[0_24px_90px_-54px_rgba(56,189,248,0.74)] backdrop-blur-2xl ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.09),transparent_28%)]" />
      {children}
    </div>
  );
}

function LogoPlate({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' | 'lg' }) {
  const t = tone(project.accent);
  const sizeClass = size === 'sm' ? 'h-11 w-11 rounded-[1rem]' : size === 'lg' ? 'h-20 w-20 rounded-[1.6rem]' : 'h-16 w-16 rounded-[1.3rem]';
  return (
    <span className={`logo-plate ${sizeClass} ${t.bg} ${t.border} ${t.ring} relative grid shrink-0 place-items-center border p-2.5`}>
      <span className={`absolute inset-0 rounded-[inherit] bg-gradient-to-br ${t.soft}`} />
      <img src={project.logo} alt={`${project.name} logo`} className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_14px_rgba(255,255,255,.14)]" />
    </span>
  );
}

function Nav() {
  const links = ['work', 'research', 'stack', 'contact'];
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#02040d]/72 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-[96rem] items-center justify-between px-5 py-4 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-300/25 bg-cyan-300/[0.11] text-sm font-black text-cyan-100 shadow-[0_0_35px_rgba(34,211,238,.16)]">HT</span>
          <span className="hidden text-xs font-bold uppercase tracking-[0.24em] text-slate-200 sm:block">Hassan Tariq Shafi</span>
        </a>
        <div className="hidden rounded-full border border-white/10 bg-white/[0.035] p-1 md:flex">
          {links.map((link) => <a key={link} href={`#${link}`} className="rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 transition hover:bg-white/10 hover:text-white">{link}</a>)}
        </div>
        <a href="mailto:hassantariq233@gmail.com" className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.11] px-4 py-2 text-sm font-bold text-cyan-100 transition hover:bg-cyan-200 hover:text-slate-950">Contact</a>
      </nav>
    </header>
  );
}

function HeroCommandDeck({ open }: { open: (popup: Popup) => void }) {
  const { style, onPointerMove, onPointerLeave } = useTilt(9);
  return (
    <div className="perspective-stage">
      <Surface className="min-h-[620px] p-6 md:p-8" >
        <div className="relative z-10 flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">operating field</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">AI × Quantum × Systems</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">A premium command surface for the technical direction: systems that connect research, data, and real software.</p>
          </div>
          <span className="rounded-full border border-emerald-300/20 bg-emerald-300/[0.12] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-100">available</span>
        </div>

        <button type="button" onClick={() => open({ type: 'focus', focus: focusAreas[0] })} className="hero-deck group relative z-10 mt-8 block min-h-[430px] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/65 text-left transition hover:border-cyan-200/35" style={style} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,.04),transparent)]" />
          <div className="deck-grid absolute inset-[8%] rounded-[1.7rem]" />
          <div className="deck-orbit deck-orbit-a" />
          <div className="deck-orbit deck-orbit-b" />
          <div className="absolute left-[8%] top-[15%] rounded-[1.4rem] border border-white/10 bg-black/[0.35] px-5 py-4 shadow-2xl backdrop-blur" style={{ transform: 'translateZ(112px)' }}>
            <p className="text-xs uppercase tracking-[.22em] text-slate-400">Research signal</p>
            <p className="mt-2 text-2xl font-black text-white">2026 / Toronto</p>
          </div>
          <div className="absolute right-[8%] top-[18%] rounded-[1.4rem] border border-white/10 bg-black/[0.32] px-5 py-4 shadow-2xl backdrop-blur" style={{ transform: 'translateZ(86px)' }}>
            <p className="text-xs uppercase tracking-[.22em] text-slate-400">Mode</p>
            <p className="mt-2 text-xl font-bold text-cyan-100">Research-grade build</p>
          </div>
          <div className="absolute bottom-[16%] left-[12%] right-[12%] grid gap-3 md:grid-cols-3" style={{ transform: 'translateZ(130px)' }}>
            {focusAreas.map((focus) => {
              const t = tone(focus.accent);
              return (
                <div key={focus.title} className={`rounded-[1.35rem] border ${t.border} bg-black/[0.38] p-4 shadow-2xl backdrop-blur transition group-hover:-translate-y-1`}>
                  <p className={`text-xs font-bold uppercase tracking-[.2em] ${t.text}`}>{focus.tag}</p>
                  <p className="mt-2 text-lg font-black text-white">{focus.title}</p>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-5 right-5 rounded-full border border-cyan-200/25 bg-cyan-300/[0.12] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">open deep view</div>
        </button>
      </Surface>
    </div>
  );
}

function Hero({ open }: { open: (popup: Popup) => void }) {
  return (
    <section id="top" className="mx-auto grid max-w-[96rem] items-center gap-12 px-5 pb-16 pt-16 md:grid-cols-[0.9fr_1.1fr] md:px-8 md:pb-24 md:pt-24">
      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/[0.1] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-100">Mathematics + Computer Science</span>
          <span className="rounded-full border border-violet-300/25 bg-violet-300/[0.1] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-100">AI / ML</span>
          <span className="rounded-full border border-emerald-300/25 bg-emerald-300/[0.1] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-100">Quantum direction</span>
        </div>
        <h1 className="mt-7 max-w-5xl text-balance text-[clamp(3.5rem,8vw,7.8rem)] font-black leading-[0.88] tracking-[-0.075em] text-white">Engineering research ideas into real software.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">I build practical systems across AI, research software, mobile products, archival tooling, and quantum computing environments — with an eye for detail, usability, and technical depth.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#work" className="rounded-full bg-cyan-200 px-6 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-slate-950 shadow-[0_0_44px_rgba(34,211,238,.35)] transition hover:-translate-y-0.5 hover:bg-white">View work</a>
          <a href="https://uk.linkedin.com/in/hassan-tariq-shafi" className="rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:border-cyan-200/60 hover:text-cyan-100">LinkedIn</a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map(([value, label]) => <Surface key={label} className="p-4"><p className="text-2xl font-black text-white">{value}</p><p className="mt-1 text-xs uppercase tracking-[.18em] text-slate-400">{label}</p></Surface>)}
        </div>
      </div>
      <HeroCommandDeck open={open} />
    </section>
  );
}

function LivePreview({ project }: { project: Project }) {
  const bars = {
    emerald: ['42%', '54%', '70%', '64%', '82%', '60%'],
    violet: ['34%', '58%', '76%', '52%', '69%', '88%'],
    amber: ['28%', '46%', '61%', '57%', '71%', '80%'],
    cyan: ['36%', '62%', '48%', '78%', '58%', '86%']
  }[project.accent];
  const t = tone(project.accent);

  return (
    <div className="system-preview-stage">
      <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-90`} />
      <div className="system-preview-grid" />
      <div className="system-preview-label">Live system preview</div>
      <div className="system-preview-action">Press to inspect</div>

      <div className="system-preview-content">
        <div className="system-preview-dashboard">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="text-2xl font-black tracking-tight text-white">{project.sceneLabel}</h4>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-400">System surface</p>
            </div>
            <span className={`${t.bg} ${t.border} ${t.text} rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em]`}>active</span>
          </div>

          <div className="system-preview-stats">
            {project.metrics.map(([value, label]) => (
              <div key={label} className="system-preview-stat">
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="system-preview-chart">
            {bars.map((height, index) => (
              <span key={index} className="system-preview-bar" style={{ height }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index, open }: { project: Project; index: number; open: (popup: Popup) => void }) {
  const t = tone(project.accent);
  const { style, onPointerMove, onPointerLeave } = useTilt(7);
  return (
    <Surface className="p-0">
      <div className={`absolute inset-0 bg-gradient-to-br ${t.soft}`} />
      <div className="relative grid gap-8 p-6 md:p-8 xl:grid-cols-[1.05fr_.95fr] xl:items-center">
        <div>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-cyan-200">0{index + 1} / {project.label}</p>
              <div className="mt-4 flex items-center gap-4">
                <LogoPlate project={project} />
                <h3 className="text-3xl font-black tracking-tight text-white md:text-5xl">{project.name}</h3>
              </div>
            </div>
            <span className="w-fit rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-slate-200">{project.year}</span>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{project.summary}</p>
          <div className="mt-6 rounded-[1.7rem] border border-white/10 bg-black/[0.22] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Impact</p>
            <p className="mt-2 text-base leading-7 text-slate-200">{project.impact}</p>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Proof</p>
              <ul className="mt-3 space-y-3 text-sm text-slate-300">
                {project.proof.map((item) => <li key={item} className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] px-4 py-3"><span className={t.text}>✦</span><span>{item}</span></li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2.5">{project.stack.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.08em] text-slate-200">{item}</span>)}</div>
            </div>
          </div>
        </div>
        <button type="button" onClick={() => open({ type: 'project', project })} className="project-preview-button text-left" style={style} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <LivePreview project={project} />
        </button>
      </div>
    </Surface>
  );
}

function FocusPanel({ focus, open }: { focus: Focus; open: (popup: Popup) => void }) {
  const t = tone(focus.accent);
  return (
    <button type="button" onClick={() => open({ type: 'focus', focus })} className="group text-left">
      <Surface className="h-full p-6 transition duration-300 group-hover:-translate-y-1">
        <div className={`absolute inset-0 bg-gradient-to-br ${t.soft}`} />
        <div className="relative">
          <p className={`text-xs font-black uppercase tracking-[0.22em] ${t.text}`}>{focus.tag}</p>
          <h3 className="mt-4 text-2xl font-black text-white">{focus.title}</h3>
          <p className="mt-4 leading-7 text-slate-300">{focus.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">{focus.nodes.map((node) => <span key={node} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-200">{node}</span>)}</div>
        </div>
      </Surface>
    </button>
  );
}

function Section({ id, kicker, title, subtitle, children }: { id: string; kicker: string; title: string; subtitle?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 py-16 md:py-24">
      <div className="mb-10 max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">{kicker}</p>
        <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">{title}</h2>
        {subtitle ? <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function StackGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stackGroups.map(([title, ...items]) => <Surface key={title} className="p-6"><p className="text-xs font-black uppercase tracking-[.22em] text-cyan-200">{title}</p><div className="mt-5 flex flex-wrap gap-2">{items.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-xs font-semibold text-slate-200">{item}</span>)}</div></Surface>)}
    </div>
  );
}

function PopupLayer({ popup, close }: { popup: Popup; close: () => void }) {
  const { style, onPointerMove, onPointerLeave } = useTilt(8);
  useEffect(() => {
    if (!popup) return;
    const listener = (event: KeyboardEvent) => event.key === 'Escape' && close();
    window.addEventListener('keydown', listener);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', listener); document.body.style.overflow = ''; };
  }, [popup, close]);

  if (!popup) return null;
  const accent = popup.type === 'project' ? popup.project.accent : popup.focus.accent;
  const t = tone(accent);
  return (
    <div className="popup-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8" onClick={close}>
      <div className="popup-perspective w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
        <div className={`popup-card ${t.ring} relative max-h-[92vh] overflow-hidden rounded-[2rem] border border-white/15 bg-[#050915]/92 backdrop-blur-2xl`} style={style} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <button type="button" onClick={close} className="absolute right-5 top-5 z-20 rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-200 hover:bg-white/[0.14]">close</button>
          <div className={`absolute inset-0 bg-gradient-to-br ${t.soft}`} />
          <div className="popup-grid absolute inset-0 opacity-60" />
          <div className="relative z-10 max-h-[92vh] overflow-y-auto p-6 md:p-10">
            {popup.type === 'project' ? <ProjectPopup project={popup.project} /> : <FocusPopup focus={popup.focus} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectPopup({ project }: { project: Project }) {
  const t = tone(project.accent);
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-5 pr-16">
        <LogoPlate project={project} size="lg" />
        <div>
          <p className={`text-xs font-black uppercase tracking-[0.28em] ${t.text}`}>project deep view</p>
          <h3 className="mt-3 text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">{project.name}</h3>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">{project.summary}</p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
        <LivePreview project={project} />
        <div className="space-y-5">
          <Surface className="p-6"><p className="text-xs font-black uppercase tracking-[.22em] text-cyan-200">Impact</p><p className="mt-4 text-base leading-8 text-slate-300">{project.impact}</p></Surface>
          <div className="grid gap-5 md:grid-cols-2">{project.story.map((item, index) => <Surface key={item} className="p-5"><p className={`text-sm font-black ${t.text}`}>0{index + 1}</p><p className="mt-3 leading-7 text-slate-300">{item}</p></Surface>)}</div>
        </div>
      </div>
    </div>
  );
}

function FocusPopup({ focus }: { focus: Focus }) {
  const t = tone(focus.accent);
  return (
    <div className="space-y-8 pr-12">
      <p className={`text-xs font-black uppercase tracking-[0.28em] ${t.text}`}>focus deep view</p>
      <h3 className="text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">{focus.title}</h3>
      <p className="max-w-3xl text-lg leading-8 text-slate-300">{focus.description}</p>
      <div className="grid gap-5 md:grid-cols-4">{focus.nodes.map((node, index) => <Surface key={node} className="p-5"><p className={`text-sm font-black ${t.text}`}>0{index + 1}</p><p className="mt-3 text-lg font-bold text-white">{node}</p></Surface>)}</div>
    </div>
  );
}

export function App() {
  const [popup, setPopup] = useState<Popup>(null);
  return (
    <div className="site-shell relative min-h-screen overflow-hidden bg-[#02040d] text-slate-100 selection:bg-cyan-200 selection:text-slate-950">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(34,211,238,.18),transparent_28%),radial-gradient(circle_at_75%_12%,rgba(168,85,247,.14),transparent_26%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,.14),transparent_28%),linear-gradient(180deg,#02040d_0%,#07111f_48%,#02040d_100%)]" />
        <div className="grid-fade absolute inset-0 opacity-50" />
        <div className="noise absolute inset-0 opacity-[0.08]" />
      </div>
      <Nav />
      <main>
        <Hero open={setPopup} />
        <div className="mx-auto max-w-[96rem] px-5 md:px-8">
          <Section id="work" kicker="selected systems" title="Four builds, one technical signature." subtitle="A more premium portfolio section: visible brand marks, cleaner live previews, stronger spacing, and interactive deep views when clicked.">
            <div className="grid gap-8 xl:gap-10">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} open={setPopup} />)}</div>
          </Section>
          <Section id="research" kicker="research direction" title="A profile built around depth, not noise." subtitle="The story is now clearer: mathematics, software engineering, AI/ML direction, quantum research, and products that actually ship.">
            <div className="grid gap-5 lg:grid-cols-3">{focusAreas.map((focus) => <FocusPanel key={focus.title} focus={focus} open={setPopup} />)}</div>
          </Section>
          <Section id="stack" kicker="technical stack" title="A compact operating map." subtitle="The stack is grouped like a professional capability map instead of a random skills list.">
            <StackGrid />
          </Section>
          <Section id="contact" kicker="next move" title="Build the thing between research and real-world use.">
            <Surface className="p-8 md:p-10"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-center"><p className="max-w-3xl text-lg leading-8 text-slate-300">Open to research-aligned software engineering, AI/ML opportunities, quantum computing projects, and technical collaborations where detail matters.</p><div className="flex flex-col gap-3 sm:flex-row"><a href="mailto:hassantariq233@gmail.com" className="rounded-full bg-cyan-200 px-6 py-3 text-center text-sm font-black uppercase tracking-[.14em] text-slate-950 hover:bg-white">Email</a><a href="https://uk.linkedin.com/in/hassan-tariq-shafi" className="rounded-full border border-white/15 bg-white/[.04] px-6 py-3 text-center text-sm font-black uppercase tracking-[.14em] text-white hover:border-cyan-200/60 hover:text-cyan-100">LinkedIn</a></div></div></Surface>
          </Section>
        </div>
      </main>
      <PopupLayer popup={popup} close={() => setPopup(null)} />
    </div>
  );
}
