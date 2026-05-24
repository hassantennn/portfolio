import { useEffect, useRef, useState, lazy, Suspense, type ReactNode, type FormEvent, type RefObject } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Home, Briefcase, Award, Workflow, Mail, Sun, Moon } from 'lucide-react';
import { AnimatedThemeToggler } from './components/ui/animated-theme-toggler';
import { Dock, DockIcon } from './components/ui/dock';
import { PixelCanvas } from './components/ui/pixel-canvas';
import logoImg from './assets/Logo.png';
import labSafeVideo from './assets/walkthrough_labsafe_web.mp4';
import metaShiftVideo from './assets/walkthrough_metashift_web.mp4';
import gatorParkVideo from './assets/walkthrough_gatorpark_web.mp4';
import posterLabSafe from './assets/poster_labsafe.jpg';
import posterMetaShift from './assets/poster_metashift.jpg';
import posterGatorPark from './assets/poster_gatorpark.jpg';
import labsafeLogo   from './assets/labsafe-logo.webp';
import metashiftLogo from './assets/metashift-logo.webp';
import gatorparkLogo from './assets/gatorpark-logo.webp';
import link1 from './assets/link1.webp';
import link2 from './assets/link2.webp';
import link3 from './assets/link3.webp';
import link4 from './assets/link4.webp';
import link5 from './assets/link5.webp';
import link6 from './assets/link6.webp';
import link7 from './assets/link7.webp';
import link8 from './assets/link8.webp';
import link9 from './assets/link9.webp';
import { NeonButton } from './components/ui/neon-button';
import { PortfolioFooter } from './components/ui/footer-section';
import { InteractiveMenu } from './components/ui/modern-mobile-menu';
import { ContainerScroll } from './components/ui/container-scroll-animation';

const DottedSurface = lazy(() => import('./components/ui/dotted-surface'));

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Accent = 'emerald' | 'violet' | 'amber' | 'cyan';


const linkedInCards = [
  { img: link1, title: 'Mitacs @ UofT',          caption: 'Research internship announcement' },
  { img: link2, title: 'GatorPark',               caption: 'App Store launch proof'           },
  { img: link3, title: 'MetaShift & Archivault',  caption: 'Internship project milestone'     },
  { img: link4, title: 'LabSafe',                 caption: 'Team project proof'               },
  { img: link5, title: 'LinkedIn Post 5',         caption: 'Published milestone'              },
  { img: link6, title: 'LinkedIn Post 6',         caption: 'Published milestone'              },
  { img: link7, title: 'LinkedIn Post 7',         caption: 'Published milestone'              },
  { img: link8, title: 'LinkedIn Post 8',         caption: 'Published milestone'              },
  { img: link9, title: 'LinkedIn Post 9',         caption: 'Published milestone'              },
];


/* ─── Utilities ──────────────────────────────────────────────────────────── */
function tone(accent: Accent) {
  return {
    emerald: { soft: 'from-slate-200/[0.10] via-slate-300/[0.03] to-transparent', text: 'text-slate-200', border: 'border-slate-200/[0.20]', bg: 'bg-slate-200/[0.06]', ring: 'shadow-[0_0_50px_rgba(226,232,240,0.10)]', hex: '#e2e8f0' },
    violet:  { soft: 'from-slate-400/[0.12] via-slate-500/[0.03] to-transparent', text: 'text-slate-400', border: 'border-slate-400/[0.22]', bg: 'bg-slate-400/[0.06]', ring: 'shadow-[0_0_50px_rgba(148,163,184,0.10)]', hex: '#94a3b8' },
    amber:   { soft: 'from-slate-300/[0.10] via-slate-200/[0.03] to-transparent', text: 'text-slate-300', border: 'border-slate-300/[0.20]', bg: 'bg-slate-300/[0.06]', ring: 'shadow-[0_0_50px_rgba(203,213,225,0.10)]', hex: '#cbd5e1' },
    cyan:    { soft: 'from-slate-300/[0.12] via-slate-400/[0.03] to-transparent', text: 'text-slate-300', border: 'border-slate-300/[0.20]', bg: 'bg-slate-300/[0.06]', ring: 'shadow-[0_0_50px_rgba(203,213,225,0.10)]', hex: '#cbd5e1' }
  }[accent];
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

function useVideoLazy(src: string) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) { video.src = src; video.load(); video.play().catch(() => {}); }
          obs.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [src]);
  return ref;
}

/* ─── MacbookMockup ──────────────────────────────────────────────────────── */
function MacbookMockup({ videoRef, hex, poster }: { videoRef: RefObject<HTMLVideoElement>; hex: string; poster?: string }) {
  return (
    <div className="relative w-full" style={{ perspective: '1400px' }}>
      {/* Diffuse glow behind device */}
      <div
        className="pointer-events-none absolute -inset-[12%] -z-10"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 60%, ${hex}2e, transparent 70%)`,
          filter: 'blur(28px)',
        }}
      />

      {/* 3D tilt — rotateX gives the "screen leaning back" depth illusion */}
      <div style={{ transform: 'rotateX(5deg)', transformStyle: 'preserve-3d' }}>

        {/* ── Lid ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '16/10',
            borderRadius: '14px 14px 3px 3px',
            background: 'linear-gradient(155deg, #30303a 0%, #1d1d24 45%, #111116 100%)',
            border: '2px solid rgba(255,255,255,0.15)',
            borderBottom: '1.5px solid rgba(255,255,255,0.05)',
            boxShadow: [
              '0 7px 0 rgba(0,0,0,0.8)',
              '0 48px 96px rgba(0,0,0,0.8)',
              '0 8px 24px rgba(0,0,0,0.55)',
              'inset 0 1px 0 rgba(255,255,255,0.11)',
              'inset 0 -2px 0 rgba(0,0,0,0.6)',
              `0 0 90px ${hex}1e`,
            ].join(', '),
          }}
        >
          {/* Camera */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10 rounded-full"
            style={{
              width: '8px', height: '8px',
              background: 'radial-gradient(circle at 35% 35%, #2a2a2a, #080808)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 0 0 2px rgba(0,0,0,0.4)',
            }}
          />

          {/* Screen — tight bezels so the video dominates */}
          <div
            className="absolute overflow-hidden bg-black"
            style={{
              inset: '5.5% 1.5% 4%',
              borderRadius: '3px',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9)',
            }}
          >
            <video
              ref={videoRef}
              autoPlay muted loop playsInline preload="none"
              poster={poster}
              className="absolute inset-0 h-full w-full object-contain"
              style={{ objectPosition: 'center top', background: '#000' }}
            />
            {/* Screen top-edge reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0"
              style={{ height: '25%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.045), transparent)' }}
            />
          </div>

          {/* Lid surface sheen */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(148deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 35%, transparent 60%)' }}
          />
        </div>

        {/* ── Hinge ── */}
        <div
          style={{
            height: '6px',
            background: 'linear-gradient(to bottom, #0a0a0e, #1c1c22)',
            borderLeft: '2px solid rgba(255,255,255,0.07)',
            borderRight: '2px solid rgba(255,255,255,0.07)',
          }}
        />

        {/* ── Base (keyboard body) ── */}
        <div
          style={{
            height: '26px',
            background: 'linear-gradient(to bottom, #2c2c34 0%, #22222a 55%, #18181e 100%)',
            border: '2px solid rgba(255,255,255,0.09)',
            borderTop: 'none',
            borderRadius: '0 0 14px 14px',
            boxShadow: '0 28px 72px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Keyboard-row shadow line */}
          <div
            style={{
              position: 'absolute', top: '46%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '72%', height: '1.5px',
              background: 'rgba(255,255,255,0.05)',
            }}
          />
          {/* Foot strip */}
          <div
            style={{
              position: 'absolute', bottom: 0, left: '50%',
              transform: 'translateX(-50%)',
              width: '32%', height: '6px',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '0 0 10px 10px',
            }}
          />
        </div>
      </div>

      {/* Ground shadow / floor reflection */}
      <div
        className="pointer-events-none"
        style={{
          height: '28px',
          marginTop: '8px',
          background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${hex}16 0%, rgba(0,0,0,0.3) 45%, transparent 70%)`,
          filter: 'blur(8px)',
        }}
      />
    </div>
  );
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

/* ─── Logo mark (shared) ─────────────────────────────────────────────────── */
function LogoMark({ isDark }: { isDark: boolean }) {
  return (
    <a href="#home" className="group" aria-label="HS Forge – home">
      {isDark ? (
        <div className="overflow-hidden rounded-full bg-white/90 p-0.5 shadow-[0_1px_4px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:scale-105">
          <img src={logoImg} alt="HS Forge" className="block h-8 w-auto" />
        </div>
      ) : (
        <img
          src={logoImg}
          alt="HS Forge"
          className="block h-8 w-auto transition-transform duration-200 group-hover:scale-105"
          style={{ mixBlendMode: 'multiply' }}
        />
      )}
    </a>
  );
}

/* ─── Floating dock (desktop) ────────────────────────────────────────────── */
function PortfolioDock({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const iconCls = `w-[22px] h-[22px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`;
  return (
    <div className="fixed top-4 left-1/2 z-50 hidden -translate-x-1/2 md:block">
      <Dock isDark={isDark} iconSize={50}>
        <DockIcon href="#home" name="Home">
          <Home className={iconCls} strokeWidth={1.6} />
        </DockIcon>
        <DockIcon href="#work" name="Case Studies">
          <Briefcase className={iconCls} strokeWidth={1.6} />
        </DockIcon>
        <DockIcon href="#proof" name="Public Proof">
          <Award className={iconCls} strokeWidth={1.6} />
        </DockIcon>
        <DockIcon href="#process" name="Process">
          <Workflow className={iconCls} strokeWidth={1.6} />
        </DockIcon>
        <DockIcon href="#contact" name="Contact">
          <Mail className={iconCls} strokeWidth={1.6} />
        </DockIcon>
        {/* Separator */}
        <li aria-hidden="true" className="mx-1 h-8 w-px self-center rounded-full" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
        <DockIcon href="#" name={isDark ? 'Light mode' : 'Dark mode'} onClick={toggleTheme}>
          {isDark
            ? <Sun className={iconCls} strokeWidth={1.6} />
            : <Moon className={iconCls} strokeWidth={1.6} />}
        </DockIcon>
      </Dock>
    </div>
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
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Dotted wave — fills the full hero */}
      <Suspense fallback={null}>
        <DottedSurface isDark={isDark} className="absolute inset-0 w-full h-full" />
      </Suspense>

      {/* Edge fades so dots dissolve into the page bg */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${isDark ? 'from-[#020817]' : 'from-[#f5f3ee]'} to-transparent`} />
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t ${isDark ? 'from-[#020817]' : 'from-[#f5f3ee]'} to-transparent`} />

      {/* Soft radial glow centred behind the text */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
        style={{
          width: '680px', height: '480px',
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(255,255,255,0.07), transparent 68%)'
            : 'radial-gradient(ellipse at center, rgba(15,23,42,0.07), transparent 68%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center md:px-8">
        <motion.h1 custom={0} variants={fadeUp} initial="hidden" animate="visible" className="hero-heading max-w-4xl">
          <span className={isDark ? 'text-white' : 'text-slate-950'}>I build AI systems</span>
          <br />
          <span className={isDark ? 'text-slate-300' : 'text-slate-600'}>that turn messy workflows</span>
          <br />
          <span className={isDark ? 'text-white' : 'text-slate-950'}>into clean, profitable software.</span>
        </motion.h1>

        <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible" className={`mt-6 max-w-lg text-sm leading-7 md:text-base md:leading-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          I'm Hassan, a Mathematics and Computer Science professional. I will help your startup or business turn repeated manual workload into an automated AI system.
        </motion.p>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-[0.78rem] font-bold tracking-[0.14em] uppercase transition-all duration-200 ${isDark ? 'border-white/20 text-white hover:border-white/45 hover:bg-white/[0.06]' : 'border-slate-950/20 text-slate-900 hover:border-slate-950/40 hover:bg-slate-950/[0.05]'} border`}
          >
            Work with me
          </a>
          <a
            href="#work"
            className={`inline-flex items-center justify-center rounded-full border px-7 py-3 text-[0.78rem] font-bold tracking-[0.14em] uppercase transition-all duration-200 ${isDark ? 'border-white/20 text-white hover:border-white/45 hover:bg-white/[0.06]' : 'border-slate-950/20 text-slate-900 hover:border-slate-950/40 hover:bg-slate-950/[0.05]'}`}
          >
            View case studies
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

/* ─── VideoCard16x9 ──────────────────────────────────────────────────────── */
function VideoCard16x9({ src, poster, title, label, description, proof, chips, accent, isDark, idx, useLaptop = false, logo }: {
  src: string; poster?: string; title: string; label: string; description: string;
  proof: string[]; chips: string[];
  accent: Accent; isDark: boolean; idx: number; useLaptop?: boolean; logo?: string;
}) {
  const t = tone(accent);
  const { ref: revealRef, visible } = useReveal();
  const videoRef = useVideoLazy(src);
  return (
    <div ref={revealRef} className={`reveal ${visible ? 'revealed' : ''}`} style={{ transitionDelay: `${idx * 80}ms` }}>
      <Surface className="p-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-40`} />

        {useLaptop ? (
          /* ── Stacked laptop layout: full-width stage on top, info strip below ── */
          <div className="relative flex flex-col">

            {/* Stage — dark canvas, laptop as hero */}
            <div
              className="relative flex items-center justify-center overflow-hidden"
              style={{ background: '#04040a', padding: 'clamp(2rem,5vw,3.5rem) clamp(1.5rem,5vw,3rem)' }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(ellipse 70% 75% at 50% 55%, ${t.hex}16, transparent 68%)` }}
              />
              <div className="relative w-full" style={{ maxWidth: '760px' }}>
                <MacbookMockup videoRef={videoRef} hex={t.hex} poster={poster} />
              </div>
            </div>

            {/* Info strip */}
            <div className={`relative flex flex-col gap-6 p-7 md:flex-row md:gap-12 md:p-10 ${isDark ? 'border-t border-white/[0.07]' : 'border-t border-slate-100'}`}>
              {/* Left: label, title, chips, description */}
              <div className="flex-1">
                <span className={`mb-3 block text-[10px] font-black uppercase tracking-[0.28em] ${t.text}`}>{label}</span>
                <div className="mb-3 flex items-center gap-3">
                  {logo && (
                    <div className={`flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border px-2 ${isDark ? 'border-white/[0.08] bg-white/[0.05]' : 'border-slate-700/20 bg-slate-900/80'}`}>
                      <img src={logo} alt={`${title} logo`} className="h-7 w-auto max-w-[88px] object-contain" />
                    </div>
                  )}
                  <h3 className={`text-2xl font-black tracking-[-0.04em] md:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                </div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {chips.map(chip => (
                    <span key={chip} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${t.text} ${t.border} ${t.bg}`}>
                      {chip}
                    </span>
                  ))}
                </div>
                <p className={`text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
              </div>

              {/* Right: proof bullets + proves */}
              <div className="md:w-[260px] md:shrink-0">
                <ul className="mb-5 space-y-2">
                  {proof.map(item => (
                    <li key={item} className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.hex }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          /* ── Side-by-side flat video layout ── */
          <div className="relative flex flex-col xl:flex-row">

            {/* Info panel */}
            <div className="flex flex-col justify-center p-7 md:p-10 xl:w-[360px] xl:shrink-0">
              <span className={`mb-3 block text-[10px] font-black uppercase tracking-[0.28em] ${t.text}`}>{label}</span>
              <div className="mb-3 flex items-center gap-3">
                {logo && (
                  <div className={`flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border px-2 ${isDark ? 'border-white/[0.08] bg-white/[0.05]' : 'border-slate-700/20 bg-slate-900/80'}`}>
                    <img src={logo} alt={`${title} logo`} className="h-7 w-auto max-w-[88px] object-contain" />
                  </div>
                )}
                <h3 className={`text-3xl font-black tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
              </div>
              <div className="mb-5 flex flex-wrap gap-1.5">
                {chips.map(chip => (
                  <span key={chip} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${t.text} ${t.border} ${t.bg}`}>
                    {chip}
                  </span>
                ))}
              </div>
              <p className={`mb-5 text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
              <ul className="space-y-2">
                {proof.map(item => (
                  <li key={item} className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.hex }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Flat 16/9 video panel */}
            <div className="relative flex-1 overflow-hidden xl:border-l xl:border-white/[0.06]">
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <video
                  ref={videoRef}
                  autoPlay muted loop playsInline preload="none"
                  poster={poster}
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ filter: 'brightness(0.86) contrast(1.05)' }}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/35 to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/35 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        )}
      </Surface>
    </div>
  );
}

/* ─── VideoCardPhone ─────────────────────────────────────────────────────── */
function VideoCardPhone({ src, poster, title, label, description = '', proof = [], sections, chips, accent, isDark, logo }: {
  src: string; poster?: string; title: string; label: string;
  description?: string; proof?: string[];
  sections?: { heading: string; text: string }[];
  chips: string[];
  accent: Accent; isDark: boolean; logo?: string;
}) {
  const t = tone(accent);
  const { ref: revealRef, visible } = useReveal();
  const videoRef = useVideoLazy(src);
  return (
    <div ref={revealRef} className={`reveal ${visible ? 'revealed' : ''}`} style={{ transitionDelay: '160ms' }}>
      <Surface className="p-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-40`} />

        {/* ── Stage — dark canvas, phone centred on top ── */}
        <div
          className="relative flex items-end justify-center overflow-hidden"
          style={{ background: '#04040a', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,3rem) clamp(2rem,4vw,3rem)' }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse 55% 65% at 50% 55%, ${t.hex}18, transparent 68%)` }}
          />
          {/* Phone frame — 220 px wide for a compact stage */}
          <div className="relative" style={{ width: '280px' }}>
            <div
              className="relative overflow-hidden bg-[#050508]"
              style={{
                width: '280px',
                aspectRatio: '9/19.5',
                borderRadius: '3.5rem',
                border: '2.5px solid rgba(255,255,255,0.13)',
                boxShadow: [
                  '0 60px 140px rgba(0,0,0,0.72)',
                  `0 0 80px ${t.hex}1a`,
                  'inset 0 1px 0 rgba(255,255,255,0.09)',
                  'inset 0 0 0 1px rgba(255,255,255,0.05)',
                ].join(', '),
              }}
            >
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black" style={{ width: '111px', height: '31px' }} />
              <div className="pointer-events-none absolute inset-0 z-10 rounded-[3.25rem]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }} />
              <video ref={videoRef} autoPlay muted loop playsInline preload="none" poster={poster} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 h-1 w-20 rounded-full bg-white/25" />
            </div>
            {/* Side buttons scaled to 280px frame */}
            <div className="absolute right-[-5px] top-[134px] h-[70px] w-[3px] rounded-full bg-white/[0.10]" />
            <div className="absolute left-[-5px] top-[108px] h-[45px] w-[3px] rounded-full bg-white/[0.10]" />
            <div className="absolute left-[-5px] top-[167px] h-[70px] w-[3px] rounded-full bg-white/[0.10]" />
          </div>
        </div>

        {/* ── Info strip — identical structure to laptop card ── */}
        <div className={`relative flex flex-col gap-6 p-7 md:flex-row md:gap-12 md:p-10 ${isDark ? 'border-t border-white/[0.07]' : 'border-t border-slate-100'}`}>
          {/* Left: label, title, chips, description */}
          <div className="flex-1">
            <span className={`mb-3 block text-[10px] font-black uppercase tracking-[0.28em] ${t.text}`}>{label}</span>
            <div className="mb-3 flex items-center gap-3">
              {logo && (
                <div className={`flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border px-2 ${isDark ? 'border-white/[0.08] bg-white/[0.05]' : 'border-slate-700/20 bg-slate-900/80'}`}>
                  <img src={logo} alt={`${title} logo`} className="h-7 w-auto max-w-[88px] object-contain" />
                </div>
              )}
              <h3 className={`text-2xl font-black tracking-[-0.04em] md:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            </div>
            <div className="mb-4 flex flex-wrap gap-1.5">
              {chips.map(chip => (
                <span key={chip} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${t.text} ${t.border} ${t.bg}`}>
                  {chip}
                </span>
              ))}
            </div>
            <p className={`text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {sections ? sections[0].text : description}
            </p>
          </div>

          {/* Right: proof bullets */}
          <div className="md:w-[260px] md:shrink-0">
            <ul className="mb-5 space-y-2">
              {(sections ? sections.slice(1).map(s => s.heading + ': ' + s.text) : proof).map(item => (
                <li key={item} className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.hex }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Surface>
    </div>
  );
}

/* ─── ProcessSection helpers ─────────────────────────────────────────────── */
function AnimatedArrow({
  d, length, color, marker, active,
}: {
  d: string; length: number; color: string; marker: string; active: boolean;
}) {
  return (
    <g>
      {/* Glow tube behind the arrow */}
      <path
        d={d} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={length} strokeDashoffset={active ? 0 : length}
        style={{
          transition: 'stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease',
          opacity: active ? 0.13 : 0,
          filter: 'blur(4px)',
        }}
      />
      {/* Main arrow line */}
      <path
        d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"
        strokeDasharray={length} strokeDashoffset={active ? 0 : length}
        markerEnd={marker}
        style={{
          transition: 'stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, filter 0.4s ease',
          filter: active ? `drop-shadow(0 0 4px ${color}99)` : 'none',
          opacity: active ? 0.9 : 0.11,
        }}
      />
    </g>
  );
}

function ProcessNode({
  x, y, label, color, active, isDark, gradBase, gradColor,
}: {
  x: number; y: number; label: string; color: string; active: boolean; isDark: boolean;
  gradBase: string; gradColor: string;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Ground shadow — ellipse beneath the sphere */}
      <ellipse rx={26} ry={7} cy={40} fill="url(#sph-shadow)"
        style={{ opacity: active ? 0.65 : 0.08, transition: 'opacity 0.5s ease' }} />
      {/* Outer colour halo */}
      <circle r={44} fill="none" stroke={color} strokeWidth="1"
        style={{ opacity: active ? 0.18 : 0, transition: 'opacity 0.6s ease', filter: 'blur(5px)' }} />
      {/* Sphere body — lit from top-left */}
      <circle r={32} fill={`url(#${gradBase})`} stroke={color}
        strokeWidth={active ? 1.4 : 0.35}
        style={{
          opacity: active ? 1 : 0.22,
          transition: 'opacity 0.5s ease, stroke-width 0.4s ease, filter 0.4s ease',
          filter: active ? `drop-shadow(0 0 10px ${color}55)` : 'none',
        }} />
      {/* Colour tint overlay */}
      <circle r={32} fill={`url(#${gradColor})`}
        style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease' }} />
      {/* Specular highlight */}
      <circle r={32} fill="url(#sph-spec)"
        style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease' }} />
      {/* Label */}
      <text textAnchor="middle" dy="0.35em" fontSize="9.5" fontWeight="800"
        fill={active ? color : isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'}
        style={{ transition: 'fill 0.5s ease', fontFamily: 'inherit', letterSpacing: '0.13em' }}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/* ─── ProcessSection ─────────────────────────────────────────────────────── */
function ProcessSection({ isDark }: { isDark: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(-1);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          // step 0: Define  1: arrow→Build  2: Build  3: arrow→Review
          // step 4: Review  5: arrow→Improve  6: Improve  7: return arrow  8: "next cycle"
          const delays = [120, 600, 1100, 1580, 2080, 2560, 3060, 3560, 4420];
          delays.forEach((ms, i) => setTimeout(() => setStep(i), ms));
        }
      },
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const on = (s: number) => step >= s;

  // 3D tilt — mouse tracking inside the diagram card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 60, damping: 14 });
  const rotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), { stiffness: 60, damping: 14 });

  const handleDiagramMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleDiagramLeave = () => { mouseX.set(0); mouseY.set(0); };

  // Circular orbit — center (280,165), orbit r=110, curved bezier arrows
  const arrows = [
    { d: 'M 305,80 Q 435,55 365,140',   len: 165, color: '#94a3b8', marker: 'url(#prc-c)', aS: 1 },
    { d: 'M 365,190 Q 435,280 305,250', len: 165, color: '#64748b', marker: 'url(#prc-v)', aS: 3 },
    { d: 'M 255,250 Q 125,280 195,190', len: 165, color: '#64748b', marker: 'url(#prc-v)', aS: 5 },
    { d: 'M 195,140 Q 125,55 255,80',   len: 165, color: '#94a3b8', marker: 'url(#prc-c)', aS: 7 },
  ];
  // Single dot path: all four arrows joined by short node-crossing bridges
  const cycleOrbitPath =
    'M 305,80 Q 435,55 365,140 L 365,190 Q 435,280 305,250 L 255,250 Q 125,280 195,190 L 195,140 Q 125,55 255,80 L 305,80';

  const nodes = [
    { label: 'Define',  x: 280, y: 55,  color: '#94a3b8', nS: 0, gradBase: 'sph-base-a', gradColor: 'sph-col-a' },
    { label: 'Build',   x: 390, y: 165, color: '#64748b', nS: 2, gradBase: 'sph-base-b', gradColor: 'sph-col-b' },
    { label: 'Review',  x: 280, y: 275, color: '#64748b', nS: 4, gradBase: 'sph-base-b', gradColor: 'sph-col-b' },
    { label: 'Improve', x: 170, y: 165, color: '#94a3b8', nS: 6, gradBase: 'sph-base-a', gradColor: 'sph-col-a' },
  ];

  const descriptions = [
    { label: 'Define',  desc: 'Clarify the workflow',             pixels: ['#f1f5f9', '#cbd5e1', '#94a3b8'] },
    { label: 'Build',   desc: 'Create the first useful version',  pixels: ['#e2e8f0', '#94a3b8', '#64748b'] },
    { label: 'Review',  desc: 'Test with real feedback',          pixels: ['#e2e8f0', '#94a3b8', '#64748b'] },
    { label: 'Improve', desc: 'Refine and repeat',                pixels: ['#f1f5f9', '#cbd5e1', '#94a3b8'] },
  ];

  return (
    <section id="process" className="py-14 md:py-20 scroll-mt-20">
      {/* Heading */}
      <div className="mb-14 text-center">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">process</p>
        <h2 className={`text-[2.4rem] font-black leading-[1.05] tracking-[-0.04em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          The Agile System
        </h2>
        <p className={`mx-auto mt-4 max-w-[460px] text-base leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Define the workflow, build the first useful version, review it, then improve through the next cycle.
        </p>
      </div>

      {/* Glass card */}
      <div ref={cardRef} className="mx-auto max-w-[860px]">
        <div
          className={`relative overflow-hidden rounded-[2rem] border backdrop-blur-xl ${isDark ? 'border-white/[0.08] bg-white/[0.025]' : 'border-slate-200/80 bg-white/60'}`}
          style={{
            boxShadow: isDark
              ? '0 40px 120px -30px rgba(0,0,0,0.8), 0 0 0 0.5px rgba(255,255,255,0.04) inset, inset 0 1px 0 rgba(255,255,255,0.07)'
              : '0 40px 120px -30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.032)' : 'rgba(0,0,0,0.032)'} 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
            }}
          />
          {/* Centre radial glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 62% 52% at 50% 50%, rgba(148,163,184,0.04), transparent 64%)' }}
          />
          {/* Top-edge shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

          {/* 3D SVG diagram */}
          <div
            className="flex justify-center px-4 py-10 sm:px-8 md:px-12"
            style={{ perspective: '1000px', perspectiveOrigin: '50% 50%' }}
            onMouseMove={handleDiagramMove}
            onMouseLeave={handleDiagramLeave}
          >
            <motion.div
              className="w-full"
              style={{ rotateX: rotX, rotateY: rotY, maxWidth: '740px', margin: '0 auto' }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
            >
              <svg viewBox="0 0 560 330" aria-hidden="true" className="w-full" style={{ overflow: 'visible' }}>
                <defs>
                  {/* Arrow markers */}
                  <marker id="prc-c" markerWidth="6" markerHeight="6" refX="5.2" refY="3" orient="auto">
                    <path d="M0,0.5 L5.5,3 L0,5.5 Z" fill="#94a3b8" />
                  </marker>
                  <marker id="prc-v" markerWidth="6" markerHeight="6" refX="5.2" refY="3" orient="auto">
                    <path d="M0,0.5 L5.5,3 L0,5.5 Z" fill="#64748b" />
                  </marker>
                  {/* Sphere body — light source at top-left */}
                  <radialGradient id="sph-base-a" cx="36%" cy="30%" r="65%" fx="36%" fy="30%">
                    <stop offset="0%"   stopColor={isDark ? '#2c3a52' : '#ffffff'} />
                    <stop offset="55%"  stopColor={isDark ? '#111928' : '#e6ecf4'} />
                    <stop offset="100%" stopColor={isDark ? '#040810' : '#c2ccd8'} />
                  </radialGradient>
                  <radialGradient id="sph-base-b" cx="36%" cy="30%" r="65%" fx="36%" fy="30%">
                    <stop offset="0%"   stopColor={isDark ? '#232e40' : '#f6f8fb'} />
                    <stop offset="55%"  stopColor={isDark ? '#0d1422' : '#dce3ec'} />
                    <stop offset="100%" stopColor={isDark ? '#03060c' : '#b6c0ce'} />
                  </radialGradient>
                  {/* Colour tint overlay */}
                  <radialGradient id="sph-col-a" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#94a3b8" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.05" />
                  </radialGradient>
                  <radialGradient id="sph-col-b" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor="#64748b" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#64748b" stopOpacity="0.05" />
                  </radialGradient>
                  {/* Specular highlight — small bright spot top-left */}
                  <radialGradient id="sph-spec" cx="34%" cy="28%" r="42%" fx="34%" fy="28%">
                    <stop offset="0%"   stopColor="rgba(255,255,255,0.50)" />
                    <stop offset="55%"  stopColor="rgba(255,255,255,0.04)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </radialGradient>
                  {/* Ground shadow */}
                  <radialGradient id="sph-shadow" cx="50%" cy="30%" r="50%">
                    <stop offset="0%"   stopColor="rgba(0,0,0,0.60)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>
                </defs>

                {/* Circular grid — concentric rings + radial spokes */}
                <g opacity={isDark ? 0.06 : 0.08}>
                  {[55, 110, 165, 215].map(r => (
                    <circle key={r} cx="280" cy="165" r={r} fill="none"
                      stroke={isDark ? '#94a3b8' : '#475569'} strokeWidth="0.5" />
                  ))}
                  {Array.from({ length: 8 }, (_, i) => {
                    const a = (i * 45 * Math.PI) / 180;
                    return <line key={i}
                      x1={280 + 30 * Math.cos(a)} y1={165 + 30 * Math.sin(a)}
                      x2={280 + 215 * Math.cos(a)} y2={165 + 215 * Math.sin(a)}
                      stroke={isDark ? '#94a3b8' : '#475569'} strokeWidth="0.5" />;
                  })}
                </g>

                {/* Arrows */}
                {arrows.map((a, i) => (
                  <AnimatedArrow key={i} d={a.d} length={a.len} color={a.color}
                    marker={a.marker} active={on(a.aS)} />
                ))}

                {/* Single dot cycling the full orbit */}
                {on(1) && (
                  <circle r="3.5" fill="#cbd5e1" style={{ filter: 'drop-shadow(0 0 5px #94a3b8) drop-shadow(0 0 2px #cbd5e1)' }}>
                    <animateMotion dur="4s" repeatCount="indefinite" path={cycleOrbitPath} />
                  </circle>
                )}

                {/* Center: cycle indicator */}
                <circle cx="280" cy="165" r="42" fill="none" stroke="#94a3b8" strokeWidth="0.8"
                  strokeDasharray="4 8"
                  style={{ opacity: on(8) ? 0.28 : 0, transition: 'opacity 0.7s ease' }} />
                <text x="280" y="160" textAnchor="middle" fontSize="7" fontWeight="700"
                  fill="#94a3b8"
                  style={{ opacity: on(8) ? 0.5 : 0, transition: 'opacity 0.9s ease 0.4s', fontFamily: 'inherit', letterSpacing: '0.14em' }}>
                  NEXT
                </text>
                <text x="280" y="172" textAnchor="middle" fontSize="7" fontWeight="700"
                  fill="#94a3b8"
                  style={{ opacity: on(8) ? 0.5 : 0, transition: 'opacity 0.9s ease 0.4s', fontFamily: 'inherit', letterSpacing: '0.14em' }}>
                  CYCLE
                </text>

                {/* Nodes */}
                {nodes.map(n => (
                  <ProcessNode key={n.label} x={n.x} y={n.y} label={n.label} color={n.color}
                    active={on(n.nS)} isDark={isDark} gradBase={n.gradBase} gradColor={n.gradColor} />
                ))}
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 4-column step descriptions */}
      <div className="mx-auto mt-7 grid max-w-[860px] grid-cols-2 gap-3 md:grid-cols-4">
        {descriptions.map(({ label, desc, pixels }) => (
          <div
            key={label}
            className={`relative overflow-hidden rounded-xl border p-4 ${isDark ? 'border-white/[0.06] bg-white/[0.018]' : 'border-slate-200 bg-white/50'}`}
          >
            <PixelCanvas
              gap={7}
              speed={30}
              colors={isDark ? pixels : pixels.map(c => c + 'aa')}
              variant="default"
              noFocus
            />
            <div className="relative z-10">
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">{label}</p>
              <p className={`text-[11px] leading-[1.5] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CardScrollReveal ───────────────────────────────────────────────────── */
function CardScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);
  return (
    <div ref={ref} style={{ perspective: '1000px' }}>
      <motion.div
        style={{
          rotateX,
          scale,
          borderRadius: '2rem',
          boxShadow: '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─── ProofSection ───────────────────────────────────────────────────────── */
function ProofSection({ isDark }: { isDark: boolean }) {
  const { ref: headerRef, visible: headerVis } = useReveal();
  return (
    <section id="work" className="py-14 md:py-20 scroll-mt-20">
      <div ref={headerRef} className={`reveal ${headerVis ? 'revealed' : ''} mb-14 max-w-2xl`}>
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">proof of work</p>
        <h2 className={`text-[2.4rem] font-black leading-[1.05] tracking-[-0.04em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Systems I've already built
        </h2>
        <p className={`mt-4 text-base leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Real software. Real workflows. Real product execution.
        </p>
      </div>

      <div className="space-y-6">
        <CardScrollReveal>
          <VideoCard16x9
            src={labSafeVideo}
            poster={posterLabSafe}
            title="LabSafe"
            label="Research workflow system"
            description="A lab management system replacing spreadsheet and email-based workflows with structured records, request flows, and lineage visualisation."
            proof={['Role-based access', 'Structured request workflows', 'Lineage visualisation']}
            chips={['Research ops', 'RBAC', 'Lineage']}
            accent="emerald" isDark={isDark} idx={0} useLaptop logo={labsafeLogo}
          />
        </CardScrollReveal>
        <CardScrollReveal>
          <VideoCard16x9
            src={metaShiftVideo}
            poster={posterMetaShift}
            title="MetaShift"
            label="Metadata automation tool"
            description="A workflow automation tool that turns messy image folders and catalogue metadata into matched, organised, export-ready batches."
            proof={['Metadata matching', 'Duplicate and missing-record detection', 'Organised batch export']}
            chips={['Automation', 'Metadata', 'Batch export']}
            accent="violet" isDark={isDark} idx={1} useLaptop logo={metashiftLogo}
          />
        </CardScrollReveal>
        <CardScrollReveal>
          <VideoCardPhone
            src={gatorParkVideo}
            poster={posterGatorPark}
            title="GatorPark"
            label="Published mobile product"
            sections={[
              { heading: 'Published iOS product', text: 'Live parking availability with check-in/check-out flows.' },
              { heading: 'System behaviour',       text: 'Firebase-powered updates with a privacy-minimal user flow.' },
            ]}
            chips={['iOS', 'Firebase', 'App Store']}
            accent="cyan" isDark={isDark} logo={gatorparkLogo}
          />
        </CardScrollReveal>
      </div>

    </section>
  );
}

/* ─── PublicProofSection ─────────────────────────────────────────────────── */
const liCaptions = [
  'Mitacs @ UofT',
  'MetaShift & Archivault',
  'GatorPark Launch',
  'ICNA Volunteering',
  'Florida Experience',
  'AI Research Progress',
  'Charity Match',
  'LTW / CheckBot',
  'AI Product Integration',
];

function PublicProofSection({ isDark }: { isDark: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);

  function goTo(idx: number) {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(linkedInCards.length - 1, idx));
    activeIdxRef.current = clamped;
    setActiveIdx(clamped);
    el.scrollTo({ left: clamped * el.offsetWidth, behavior: 'smooth' });
  }

  function handleScroll() {
    const el = scrollRef.current;
    if (!el || el.offsetWidth === 0) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    const clamped = Math.max(0, Math.min(linkedInCards.length - 1, idx));
    activeIdxRef.current = clamped;
    setActiveIdx(clamped);
  }

  useEffect(() => {
    function onResize() {
      const el = scrollRef.current;
      if (!el) return;
      el.scrollTo({ left: activeIdxRef.current * el.offsetWidth, behavior: 'instant' as ScrollBehavior });
    }
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const canPrev = activeIdx > 0;
  const canNext = activeIdx < linkedInCards.length - 1;

  const arrowCls = (enabled: boolean) =>
    `flex h-9 w-9 items-center justify-center rounded-full border text-lg font-bold transition-all duration-200 ${
      enabled
        ? 'border-white/[0.14] bg-black/60 text-white backdrop-blur-md hover:border-cyan-300/50 hover:text-cyan-300'
        : 'cursor-not-allowed border-white/[0.05] bg-black/20 text-white/20'
    }`;

  const titleComponent = (
    <div className="mb-6">
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
        public proof
      </p>
      <h2 className={`text-[2.4rem] font-black leading-[1.05] tracking-[-0.04em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
        Shared publicly, backed by real work
      </h2>
      <p className={`mx-auto mt-4 max-w-[480px] text-base leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        Research, shipped products, and build milestones documented on LinkedIn.
      </p>
    </div>
  );

  return (
    <section id="proof" className="scroll-mt-20">
      <ContainerScroll titleComponent={titleComponent}>
        {/* Carousel inside the scroll card */}
        <div className="relative h-full w-full">
          {/* Badges */}
          <div className="pointer-events-none absolute right-3 top-3 z-10">
            <span className="rounded-full border border-[#0a66c2]/50 bg-[#0a66c2]/25 px-2.5 py-[3px] text-[9px] font-black uppercase tracking-[0.12em] text-[#7ab8f5]">
              LinkedIn
            </span>
          </div>
          <div className="pointer-events-none absolute left-3 top-3 z-10">
            <span className="rounded-full border border-white/[0.12] bg-black/50 px-2.5 py-[3px] text-[9px] font-black uppercase tracking-[0.12em] text-white/50">
              {String(activeIdx + 1).padStart(2, '0')} / {String(linkedInCards.length).padStart(2, '0')}
            </span>
          </div>

          {/* Arrows */}
          <button
            onClick={() => goTo(activeIdx - 1)}
            disabled={!canPrev}
            aria-label="Previous post"
            className={`absolute left-3 top-1/2 z-20 -translate-y-1/2 ${arrowCls(canPrev)}`}
          >
            ‹
          </button>
          <button
            onClick={() => goTo(activeIdx + 1)}
            disabled={!canNext}
            aria-label="Next post"
            className={`absolute right-3 top-1/2 z-20 -translate-y-1/2 ${arrowCls(canNext)}`}
          >
            ›
          </button>

          {/* Slide strip */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="no-scrollbar flex h-full"
            style={{ overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
          >
            {linkedInCards.map((card, i) => (
              <div
                key={i}
                className="flex h-full w-full flex-shrink-0 items-start justify-center"
                style={{ scrollSnapAlign: 'start', background: '#070d1a', padding: '14px 14px 10px' }}
              >
                <img
                  src={card.img}
                  alt={liCaptions[i]}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', objectPosition: 'center top' }}
                />
              </div>
            ))}
          </div>

          {/* Caption + dots — bottom overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 pb-3 pt-8"
            style={{ background: 'linear-gradient(to top, rgba(7,13,26,0.9) 60%, transparent)' }}
          >
            <p className="text-[11px] font-semibold tracking-wide text-slate-400">
              {liCaptions[activeIdx]}
            </p>
            <div className="pointer-events-auto flex items-center gap-1.5">
              {linkedInCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${liCaptions[i]}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: '5px',
                    width: i === activeIdx ? '18px' : '5px',
                    background: i === activeIdx ? '#94a3b8' : i < activeIdx ? 'rgba(148,163,184,0.3)' : 'rgba(255,255,255,0.12)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}

/* ─── EnquirySection ─────────────────────────────────────────────────────── */
function EnquirySection({ isDark }: { isDark: boolean }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState({ name: false, email: false, message: false });
  const [emailValid, setEmailValid] = useState(true);
  const { ref, visible } = useReveal();

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const active = (k: keyof typeof form) => focused[k] || form[k].length > 0;
  const focus = (k: keyof typeof form, on: boolean) => setFocused(f => ({ ...f, [k]: on }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateEmail(form.email)) { setEmailValid(false); return; }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\nWhat I want built:\n${form.message}`;
    window.location.href = `mailto:hassantariq233@gmail.com?subject=Build Request&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="contact" className="py-14 md:py-20 scroll-mt-20">
      <div ref={ref} className={`reveal ${visible ? 'revealed' : ''} mb-12 text-center`}>
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">services</p>
        <h2 className={`text-3xl font-black tracking-[-0.03em] md:text-4xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Build systems, automation,{' '}
          <span className="block sm:inline">and internal tools</span>
        </h2>
        <p className={`mx-auto mt-4 max-w-[480px] text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          If you need software, automation, or workflow systems built properly, send a short note and we can discuss the right scope together.
        </p>
      </div>

      <div className="mx-auto max-w-[560px]">
        <Surface className="p-7 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className={`float-field ${active('name') ? 'active' : ''} ${focused.name ? 'focused' : ''}`}>
              <input
                type="text" id="f-name" required
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                onFocus={() => focus('name', true)}
                onBlur={() => focus('name', false)}
                className="float-input"
              />
              <label htmlFor="f-name">Name</label>
            </div>

            {/* Email */}
            <div className={`float-field ${active('email') ? 'active' : ''} ${focused.email ? 'focused' : ''} ${!emailValid && form.email ? 'invalid' : ''}`}
              style={{ paddingBottom: !emailValid && form.email ? '1.2rem' : undefined }}>
              <input
                type="email" id="f-email" required
                value={form.email}
                onChange={e => {
                  setForm(f => ({ ...f, email: e.target.value }));
                  setEmailValid(!e.target.value || validateEmail(e.target.value));
                }}
                onFocus={() => focus('email', true)}
                onBlur={() => focus('email', false)}
                className="float-input"
              />
              <label htmlFor="f-email">Email Address</label>
              {!emailValid && form.email && <span className="float-error">Please enter a valid email</span>}
            </div>

            {/* Message */}
            <div className={`float-field float-field--textarea ${active('message') ? 'active' : ''} ${focused.message ? 'focused' : ''}`}>
              <textarea
                id="f-message" required rows={4}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                onFocus={() => focus('message', true)}
                onBlur={() => focus('message', false)}
                className="float-textarea"
              />
              <label htmlFor="f-message">What do you want built?</label>
            </div>

            <div className="pt-1">
              <NeonButton type="submit" variant="primary" size="default" className="w-full">
                Request a build call
              </NeonButton>
              <p className={`mt-3 text-center text-[11px] leading-5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                If it looks like a fit, I'll get back to you to arrange a call.
              </p>
            </div>

          </form>
        </Surface>
      </div>
    </section>
  );
}

/* ─── App ────────────────────────────────────────────────────────────────── */
export function App() {
  const { isDark, toggle } = useTheme();
  return (
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 selection:bg-slate-200 selection:text-slate-950 ${isDark ? 'bg-[#020817] text-slate-100' : 'bg-[#f5f3ee] text-slate-900'}`}>
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_8%,rgba(148,163,184,.04),transparent_32%),radial-gradient(ellipse_at_78%_12%,rgba(100,116,139,.03),transparent_30%),radial-gradient(ellipse_at_85%_80%,rgba(71,85,105,.03),transparent_30%)]" />
        <div className="dot-grid absolute inset-0 opacity-[0.22]" />
        <div className="noise absolute inset-0 opacity-[0.04]" />
      </div>

      {/* Floating logo — top-left on all screen sizes */}
      <div className="fixed top-4 left-5 z-50">
        <LogoMark isDark={isDark} />
      </div>

      {/* Theme toggle — top-right on mobile only (dock handles desktop) */}
      <div className="fixed top-3 right-4 z-50 md:hidden">
        <AnimatedThemeToggler isDark={isDark} onToggle={toggle} />
      </div>

      <Hero isDark={isDark} />

      <main className="mx-auto max-w-7xl px-5 md:px-8">
        <ProofSection isDark={isDark} />
        <PublicProofSection isDark={isDark} />
        <ProcessSection isDark={isDark} />

        <EnquirySection isDark={isDark} />
      </main>

      <PortfolioFooter />

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 inset-x-0 z-50 md:hidden">
        <InteractiveMenu />
      </div>

      {/* Desktop dock */}
      <PortfolioDock isDark={isDark} toggleTheme={toggle} />

    </div>
  );
}
