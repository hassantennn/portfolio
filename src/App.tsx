import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react';
import { motion } from 'framer-motion';
import { Brain, Atom, Code2, Calculator, Sun, Moon } from 'lucide-react';
import labSafeLogo from './assets/labsafe-logo-clean.png';
import metaShiftLogo from './assets/metashift-logo-clean.png';
import archivaultLogo from './assets/archivault-logo-clean.png';
import gatorParkLogo from './assets/gatorpark-logo-clean.png';
import { ElegantShape } from './components/ui/shape-landing-hero';
import AnoAI from './components/ui/animated-shader-background';
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline';
import { NeonButton } from './components/ui/neon-button';
import { PortfolioFooter } from './components/ui/footer-section';
import { InteractiveMenu } from './components/ui/modern-mobile-menu';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Accent = 'emerald' | 'violet' | 'amber' | 'cyan';
type Popup = { project: Project } | null;

type Project = {
  name: string; label: string; year: string; accent: Accent; logo: string;
  summary: string; impact: string; sceneLabel: string;
  proof: string[]; stack: string[]; metrics: [string, string][]; story: string[];
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const projects: Project[] = [
  {
    name: 'LabSafe', label: 'Research software system', year: 'Django / LIMS', accent: 'emerald', logo: labSafeLogo,
    summary: 'A laboratory information management system for animal science workflows, structured records, and traceable operational requests.',
    impact: 'Moves research operations away from fragmented spreadsheets, paper trails, and email chains into a controlled central system.',
    sceneLabel: 'Research ops matrix',
    proof: ['Role-aware access', 'Lineage visualisation', 'Structured request flows'],
    stack: ['Django', 'Database', 'RBAC', 'Data Import', 'Research Ops'],
    metrics: [['03', 'role layers'], ['100%', 'traceable'], ['02', 'workflow lanes']],
    story: ['Designed around research-lab accountability.', 'Gives teams clearer operational visibility.', 'Turns messy records into structured software flows.']
  },
  {
    name: 'MetaShift', label: 'Digital collections automation', year: 'Desktop / Metadata', accent: 'violet', logo: metaShiftLogo,
    summary: 'Desktop software that matches catalogue metadata to image files and exports organised, diagnostics-backed batch folders.',
    impact: 'Makes messy archival image collections usable, auditable, and ready for delivery without manual matching chaos.',
    sceneLabel: 'Metadata alignment field',
    proof: ['Identifier normalisation', 'Duplicate detection', 'Missing record reports'],
    stack: ['Desktop', 'Metadata', 'Data Cleaning', 'Batch Export', 'Reports'],
    metrics: [['04', 'pipeline stages'], ['99%', 'cleaner'], ['∞', 'batch scale']],
    story: ['Built for archives and digital collections.', 'Highlights missing and unmatched records.', 'Transforms raw folders into delivery-ready batches.']
  },
  {
    name: 'Archivault', label: 'Archival integrity tool', year: 'Checksums / Verification', accent: 'amber', logo: archivaultLogo,
    summary: 'A checksum manifest generator and verifier for detecting missing, changed, or corrupted files in storage workflows.',
    impact: 'Gives archival workflows confidence that stored material remains intact over time.',
    sceneLabel: 'Integrity verification grid',
    proof: ['Manifest generation', 'Folder verification', 'Mismatch summaries'],
    stack: ['SHA-1', 'MD5', 'JSON Manifests', 'Verification', 'Reliability'],
    metrics: [['02', 'hash modes'], ['01', 'manifest core'], ['0', 'silent drift']],
    story: ['Turns invisible storage risk into clear signals.', 'Supports repeatable long-term checks.', 'Designed around trust, preservation, and auditability.']
  },
  {
    name: 'GatorPark', label: 'Realtime mobile product', year: 'iOS / Firebase', accent: 'cyan', logo: gatorParkLogo,
    summary: 'An iOS-first parking availability product with anonymous check-ins and live garage occupancy state.',
    impact: 'Turns uncertain campus parking into a live availability signal that users can understand quickly.',
    sceneLabel: 'Live occupancy plane',
    proof: ['Anonymous auth flow', 'Live occupancy state', 'Privacy-minimal design'],
    stack: ['Swift', 'Firebase', 'Firestore', 'App Store', 'Realtime'],
    metrics: [['19ms', 'signal feel'], ['24/7', 'availability'], ['01', 'mobile app']],
    story: ['Prioritises simple user behaviour over heavy accounts.', 'Uses live state to make availability feel current.', 'Keeps the product privacy-minimal and practical.']
  }
];

const heroMetrics: [string, string][] = [
  ['04', 'projects'], ['05+', 'domains'], ['UF + UoA', 'research roles'], ['Aberdeen', 'Scotland']
];

const researchOrbitData = [
  { id: 1, title: 'AI / ML', date: 'UF Research Asst.', content: 'Active research at the University of Florida using autoencoders and GANs to analyse equine motion and posture. Built a PyQt GUI for veterinary scientists — bridging deep learning with real lab workflows.', category: 'AI', icon: Brain, relatedIds: [2, 3, 4], status: 'in-progress' as const, energy: 88 },
  { id: 2, title: 'Quantum', date: 'Research direction', content: 'Future-facing study into distributed quantum algorithm benchmarking and performance analysis — built on the mathematical foundations developed at Aberdeen and pointing toward post-classical computing.', category: 'Research', icon: Atom, relatedIds: [1, 4], status: 'in-progress' as const, energy: 75 },
  { id: 3, title: 'Products', date: '4 shipped', content: 'Four production builds — LabSafe (research LIMS), MetaShift (archival metadata automation), Archivault (checksum integrity tooling), and GatorPark (iOS live-parking app). Real users, real constraints.', category: 'Engineering', icon: Code2, relatedIds: [1, 4], status: 'completed' as const, energy: 90 },
  { id: 4, title: 'Maths + CS', date: 'UoA Undergraduate', content: 'BSc (Hons) Mathematics and Computing Science at the University of Aberdeen. Discrete math, linear algebra, and probability as the underpinning of ML models, quantum circuits, and reliable software systems.', category: 'Core', icon: Calculator, relatedIds: [1, 2, 3], status: 'in-progress' as const, energy: 95 },
];

/* ─── Utilities ──────────────────────────────────────────────────────────── */
function tone(accent: Accent) {
  return {
    emerald: { soft: 'from-emerald-300/[0.16] via-teal-300/[0.05] to-transparent', text: 'text-emerald-300', border: 'border-emerald-300/20', bg: 'bg-emerald-300/[0.09]', ring: 'shadow-[0_0_50px_rgba(52,211,153,0.15)]', hex: '#34d399' },
    violet:  { soft: 'from-violet-300/[0.18] via-fuchsia-300/[0.05] to-transparent', text: 'text-violet-300',  border: 'border-violet-300/20',  bg: 'bg-violet-300/[0.09]',  ring: 'shadow-[0_0_50px_rgba(192,132,252,0.15)]', hex: '#c084fc' },
    amber:   { soft: 'from-amber-300/[0.14] via-orange-300/[0.05] to-transparent',  text: 'text-amber-300',   border: 'border-amber-300/20',   bg: 'bg-amber-300/[0.09]',   ring: 'shadow-[0_0_50px_rgba(251,191,36,0.13)]',  hex: '#fbbf24' },
    cyan:    { soft: 'from-cyan-300/[0.18] via-blue-300/[0.05] to-transparent',     text: 'text-cyan-300',    border: 'border-cyan-300/20',    bg: 'bg-cyan-300/[0.09]',    ring: 'shadow-[0_0_50px_rgba(34,211,238,0.15)]',  hex: '#22d3ee' }
  }[accent];
}

function useTilt(intensity = 10) {
  const [style, setStyle] = useState<CSSProperties>({});
  function onPointerMove(e: ReactPointerEvent<HTMLElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setStyle({ transform: `rotateX(${(0.5 - y) * intensity}deg) rotateY(${(x - 0.5) * intensity}deg)`, ['--mx' as string]: `${x * 100}%`, ['--my' as string]: `${y * 100}%` });
  }
  function onPointerLeave() { setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' }); }
  return { style, onPointerMove, onPointerLeave };
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function useTheme() {
  const [isDark, setIsDark] = useState(() =>
    typeof window === 'undefined' ? true : localStorage.getItem('theme') !== 'light'
  );
  useEffect(() => {
    document.documentElement.classList.toggle('light', !isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  return { isDark, toggle: () => setIsDark(d => !d) };
}

/* ─── Surface ────────────────────────────────────────────────────────────── */
function Surface({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`surface relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] shadow-[0_20px_72px_-44px_rgba(56,189,248,0.4)] backdrop-blur-xl ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
      {children}
    </div>
  );
}

function LogoPlate({ project, size = 'md' }: { project: Project; size?: 'sm' | 'md' | 'lg' }) {
  const t = tone(project.accent);
  const sz = { sm: 'h-10 w-10 rounded-2xl p-2', md: 'h-14 w-14 rounded-[1.25rem] p-2.5', lg: 'h-20 w-20 rounded-[1.6rem] p-3' }[size];
  return (
    <span className={`logo-plate ${sz} ${t.bg} ${t.border} ${t.ring} relative grid shrink-0 place-items-center border`}>
      <span className={`absolute inset-0 rounded-[inherit] bg-gradient-to-br ${t.soft}`} />
      <img src={project.logo} alt={project.name} className="relative z-10 h-full w-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,.10)]" />
    </span>
  );
}

/* ─── Nav ────────────────────────────────────────────────────────────────── */
function Nav({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? `border-b backdrop-blur-2xl ${isDark ? 'border-white/[0.06] bg-[#020817]/85' : 'border-black/[0.06] bg-[#f1f5f9]/88'}` : ''}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="group flex items-center gap-3">
          <span className={`grid h-9 w-9 place-items-center rounded-xl border text-[10px] font-black tracking-tight transition-all duration-200 ${isDark ? 'border-cyan-300/[0.18] bg-cyan-300/[0.07] text-cyan-200 group-hover:border-cyan-300/[0.35] group-hover:bg-cyan-300/[0.12]' : 'border-cyan-500/[0.3] bg-cyan-500/[0.08] text-cyan-600 group-hover:border-cyan-500/[0.5] group-hover:bg-cyan-500/[0.15]'}`}>HT</span>
          <span className={`hidden text-[10px] font-bold uppercase tracking-[0.2em] sm:block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Hassan Tariq Shafi</span>
        </a>
        <div className={`hidden gap-0.5 rounded-full border p-1 md:flex ${isDark ? 'border-white/[0.07] bg-white/[0.02]' : 'border-black/[0.07] bg-black/[0.02]'}`}>
          {['research', 'work', 'contact'].map(l => (
            <a key={l} href={`#${l}`} className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 transition-all duration-150 ${isDark ? 'hover:bg-white/[0.07] hover:text-white' : 'hover:bg-black/[0.05] hover:text-slate-900'}`}>{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`rounded-full border p-2.5 transition-all duration-200 ${isDark ? 'border-white/[0.1] bg-white/[0.05] text-slate-400 hover:border-cyan-300/30 hover:text-cyan-300' : 'border-black/[0.1] bg-black/[0.04] text-slate-500 hover:border-cyan-500/40 hover:text-cyan-600'}`}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <NeonButton asLink href="mailto:hassantariq233@gmail.com" variant="default" size="sm">Contact</NeonButton>
        </div>
      </nav>
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: 0.4 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }
  }),
};

function Hero({ isDark }: { isDark: boolean }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${isDark ? 'from-[#020817]/70' : 'from-[#f1f5f9]/70'} to-transparent`} />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t ${isDark ? 'from-[#020817]/60' : 'from-[#f1f5f9]/60'} to-transparent`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-cyan-500/[0.04]" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={560} height={130} rotate={12}  gradient="from-cyan-500/[0.12]"    className="left-[-8%] top-[18%]" />
        <ElegantShape delay={0.5} width={440} height={110} rotate={-15} gradient="from-violet-500/[0.12]"  className="right-[-4%] top-[65%]" />
        <ElegantShape delay={0.4} width={280} height={70}  rotate={-8}  gradient="from-emerald-500/[0.10]" className="left-[8%] bottom-[8%]" />
        <ElegantShape delay={0.6} width={180} height={55}  rotate={22}  gradient="from-amber-500/[0.10]"   className="right-[20%] top-[10%]" />
        <ElegantShape delay={0.7} width={130} height={38}  rotate={-28} gradient="from-rose-500/[0.08]"    className="left-[26%] top-[6%]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center md:px-8">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-7 flex flex-wrap justify-center gap-2">
          <span className="chip-badge border-cyan-300/[0.2] bg-cyan-300/[0.06] text-cyan-300">Mathematics + Computing Science</span>
          <span className="chip-badge border-violet-300/[0.2] bg-violet-300/[0.06] text-violet-300">AI Researcher @ UF</span>
          <span className="chip-badge border-emerald-300/[0.2] bg-emerald-300/[0.06] text-emerald-300">Quantum direction</span>
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" className="hero-heading max-w-4xl">
          <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-b from-white to-white/80' : 'bg-gradient-to-b from-slate-900 to-slate-700'}`}>Engineering</span>
          <br />
          <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-r from-cyan-300 via-white/90 to-violet-300' : 'bg-gradient-to-r from-cyan-500 via-slate-800 to-violet-600'}`}>research ideas</span>
          <br />
          <span className={`bg-clip-text text-transparent ${isDark ? 'bg-gradient-to-b from-white/90 to-white/70' : 'bg-gradient-to-b from-slate-800 to-slate-600'}`}>into real software.</span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className={`mt-7 max-w-xl text-base leading-8 md:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Maths + CS undergraduate at the University of Aberdeen and AI Research Assistant at the University of Florida — building production-grade software from deep learning systems to archival tools and mobile products.
        </motion.p>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-col gap-3 sm:flex-row">
          <NeonButton asLink href="#work" variant="primary" size="default">View work</NeonButton>
          <NeonButton asLink href="https://uk.linkedin.com/in/hassan-tariq-shafi" target="_blank" rel="noopener noreferrer" variant="ghost" size="default">LinkedIn</NeonButton>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-14 grid w-fit grid-cols-2 gap-x-12 gap-y-5 sm:grid-cols-4">
          {heroMetrics.map(([v, l]) => (
            <div key={l} className="text-center">
              <p className={`text-2xl font-black tracking-tight md:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{v}</p>
              <p className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

/* ─── LivePreview ────────────────────────────────────────────────────────── */
function LivePreview({ project }: { project: Project }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % 100), 1800);
    return () => clearInterval(id);
  }, []);

  const t = tone(project.accent);
  const baseBars = {
    emerald: [42, 54, 70, 64, 82, 60],
    violet:  [34, 58, 76, 52, 69, 88],
    amber:   [28, 46, 61, 57, 71, 80],
    cyan:    [36, 62, 48, 78, 58, 86],
  }[project.accent];

  const liveBars = baseBars.map((base, i) =>
    Math.max(10, Math.min(92, base + Math.round(Math.sin((tick * 1.1 + i * 0.9)) * 11)))
  );

  return (
    <div className="flex flex-col gap-4 p-6" style={{ height: '100%', minHeight: '420px' }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-80 pointer-events-none`} />
      <div className="deck-grid absolute inset-0 opacity-25 pointer-events-none" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">Live system preview</p>
        <span className={`${t.bg} ${t.border} ${t.text} flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.16em]`}>active</span>
      </div>

      <div className="relative">
        <h4 className="text-xl font-black leading-tight tracking-tight text-white">{project.sceneLabel}</h4>
      </div>

      <div className="relative grid grid-cols-3 gap-2">
        {project.metrics.map(([value, label]) => (
          <div key={label} className="rounded-xl border border-white/[0.08] bg-black/[0.22] px-3 py-2.5 backdrop-blur-sm">
            <p className="text-lg font-black leading-none text-white">{value}</p>
            <p className="mt-1 text-[8px] uppercase leading-none tracking-[0.12em] text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="relative flex flex-1 items-end gap-1.5 rounded-xl border border-white/[0.07] bg-black/[0.15] p-3" style={{ minHeight: '120px' }}>
        {liveBars.map((h, i) => (
          <motion.div
            key={i}
            className="min-w-0 flex-1 rounded-full"
            style={{
              background: `linear-gradient(to top, ${t.hex}55, ${t.hex}ee)`,
              boxShadow: `0 0 12px ${t.hex}40`,
            }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.55, ease: 'easeInOut', delay: i * 0.04 }}
          />
        ))}
      </div>

      <p className={`relative text-center text-[9px] font-black uppercase tracking-[0.2em] ${t.text} opacity-60`}>
        Press to inspect →
      </p>
    </div>
  );
}

/* ─── ProjectCard ────────────────────────────────────────────────────────── */
function ProjectCard({ project, index, open }: { project: Project; index: number; open: (p: Popup) => void }) {
  const t = tone(project.accent);
  const { style, onPointerMove, onPointerLeave } = useTilt(6);
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? 'revealed' : ''}`} style={{ transitionDelay: `${index * 60}ms` }}>
      <Surface className="overflow-hidden p-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-60`} />
        <div className="relative flex flex-col xl:flex-row">
          <div className="flex-1 p-7 md:p-10">
            <div className="mb-7 flex items-center justify-between gap-4">
              <span className={`text-[10px] font-black uppercase tracking-[0.28em] ${t.text}`}>0{index + 1} / {project.label}</span>
              <span className="rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">{project.year}</span>
            </div>
            <div className="mb-6 flex items-center gap-5">
              <LogoPlate project={project} />
              <h3 className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">{project.name}</h3>
            </div>
            <p className="mb-5 max-w-lg text-base leading-7 text-slate-300">{project.summary}</p>
            <div className="mb-7 rounded-2xl border border-white/[0.06] bg-black/[0.18] p-4">
              <p className="mb-2 text-[9px] font-black uppercase tracking-[0.24em] text-slate-500">Impact</p>
              <p className="text-sm leading-6 text-slate-300">{project.impact}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className={`mb-3 text-[9px] font-black uppercase tracking-[0.24em] ${t.text}`}>Proof points</p>
                <ul className="space-y-2">
                  {project.proof.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.hex }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={`mb-3 text-[9px] font-black uppercase tracking-[0.24em] ${t.text}`}>Stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(item => (
                    <span key={item} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-slate-300">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="project-preview-button relative flex min-h-[460px] flex-col xl:w-[460px] xl:shrink-0 xl:border-l xl:border-white/[0.06]"
            style={style}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            onClick={() => open({ project })}
          >
            <LivePreview project={project} />
          </button>
        </div>
      </Surface>
    </div>
  );
}

/* ─── SectionHead ────────────────────────────────────────────────────────── */
function SectionHead({ id, kicker, title, subtitle }: { id: string; kicker: string; title: string; subtitle?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} id={id} className={`reveal ${visible ? 'revealed' : ''} scroll-mt-28 mb-12 max-w-3xl`}>
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">{kicker}</p>
      <h2 className="text-4xl font-black tracking-[-0.04em] text-white md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{subtitle}</p>}
    </div>
  );
}

/* ─── ResearchSection ────────────────────────────────────────────────────── */
function ResearchSection() {
  return (
    <section className="py-20 md:py-28">
      <SectionHead
        id="research"
        kicker="research direction"
        title="A profile built for depth."
        subtitle="Click any node to explore the areas driving the work — active UF research in equine motion AI, quantum computing, four shipped products, and the mathematical foundations at Aberdeen."
      />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.02]">
        <div className="deck-grid absolute inset-0 opacity-30 pointer-events-none" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-violet-500/[0.04]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />
        <div className="relative h-[580px] md:h-[660px]">
          <RadialOrbitalTimeline timelineData={researchOrbitData} />
        </div>
      </div>
    </section>
  );
}

/* ─── Popup ──────────────────────────────────────────────────────────────── */
function PopupLayer({ popup, close }: { popup: Popup; close: () => void }) {
  const { style, onPointerMove, onPointerLeave } = useTilt(7);
  useEffect(() => {
    if (!popup) return;
    const listener = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', listener);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', listener); document.body.style.overflow = ''; };
  }, [popup, close]);

  if (!popup) return null;
  const t = tone(popup.project.accent);
  return (
    <div className="popup-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8" onClick={close}>
      <div className="popup-perspective w-full max-w-6xl" onClick={e => e.stopPropagation()}>
        <div className={`popup-card popup-card-bg ${t.ring} relative max-h-[92vh] overflow-hidden rounded-[2rem] border border-white/[0.12] bg-[#030c1e]/94 backdrop-blur-2xl`} style={style} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
          <button type="button" onClick={close} className="absolute right-5 top-5 z-20 rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300 hover:bg-white/[0.12]">close</button>
          <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-40`} />
          <div className="popup-grid absolute inset-0 opacity-50" />
          <div className="relative z-10 max-h-[92vh] overflow-y-auto p-6 md:p-10">
            <ProjectPopup project={popup.project} />
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
          <p className={`mb-3 text-[10px] font-black uppercase tracking-[0.28em] ${t.text}`}>project deep view</p>
          <h3 className="text-4xl font-black tracking-[-0.05em] text-white md:text-6xl">{project.name}</h3>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">{project.summary}</p>
        </div>
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035]">
          <LivePreview project={project} />
        </div>
        <div className="space-y-4">
          <Surface className="p-6">
            <p className="mb-3 text-[9px] font-black uppercase tracking-[0.24em] text-cyan-300">Impact</p>
            <p className="text-sm leading-7 text-slate-300">{project.impact}</p>
          </Surface>
          <div className="grid gap-4 sm:grid-cols-3">
            {project.story.map((item, i) => (
              <Surface key={item} className="p-5">
                <p className={`mb-2 text-xs font-black ${t.text}`}>0{i + 1}</p>
                <p className="text-sm leading-6 text-slate-300">{item}</p>
              </Surface>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export function App() {
  const { isDark, toggle } = useTheme();
  const [popup, setPopup] = useState<Popup>(null);
  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 selection:bg-cyan-200 selection:text-slate-950 ${isDark ? 'bg-[#020817] text-slate-100' : 'bg-[#f1f5f9] text-slate-900'}`}>
      <div className="pointer-events-none fixed inset-0 -z-20">
        <AnoAI className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isDark ? 'opacity-[0.32]' : 'opacity-[0.10]'}`} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_8%,rgba(34,211,238,.06),transparent_32%),radial-gradient(ellipse_at_78%_12%,rgba(168,85,247,.05),transparent_30%),radial-gradient(ellipse_at_85%_80%,rgba(16,185,129,.05),transparent_30%)]" />
        <div className="dot-grid absolute inset-0 opacity-[0.22]" />
        <div className="noise absolute inset-0 opacity-[0.04]" />
      </div>

      <Nav isDark={isDark} toggleTheme={toggle} />
      <Hero isDark={isDark} />

      <main className="mx-auto max-w-7xl px-5 md:px-8">
        <ResearchSection />

        <section className="py-20 md:py-28">
          <SectionHead id="work" kicker="selected systems" title="Four builds, one technical signature." subtitle="A lab information system, a metadata automation tool, an archival integrity verifier, and a live iOS app — all built with the same standard of depth and precision." />
          <div className="space-y-6">
            {projects.map((p, i) => <ProjectCard key={p.name} project={p} index={i} open={setPopup} />)}
          </div>
        </section>

        <section className="py-20 md:py-28">
          <Surface className="p-8 md:p-14">
            <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
              <div>
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">next move</p>
                <h2 id="contact" className="scroll-mt-28 max-w-lg text-3xl font-black tracking-tight text-white md:text-5xl">Build the thing between research and real-world use.</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">Based in Aberdeen, Scotland. Open to research-aligned engineering roles, AI/ML internships, summer placements, and technical collaborations where depth and precision matter.</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <NeonButton asLink href="mailto:hassantariq233@gmail.com" variant="primary">Email</NeonButton>
                <NeonButton asLink href="https://uk.linkedin.com/in/hassan-tariq-shafi" target="_blank" rel="noopener noreferrer" variant="ghost">LinkedIn</NeonButton>
              </div>
            </div>
          </Surface>
        </section>
      </main>

      <PortfolioFooter />

      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
        <InteractiveMenu />
      </div>

      <PopupLayer popup={popup} close={() => setPopup(null)} />
    </div>
  );
}
