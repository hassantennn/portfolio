import { useEffect, useRef, useState, lazy, Suspense, type ReactNode, type FormEvent, type RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Briefcase, Award, Workflow, Mail, Sun, Moon } from 'lucide-react';
import { AnimatedThemeToggler } from './components/ui/animated-theme-toggler';
import { Dock, DockIcon } from './components/ui/dock';
import { PixelCanvas } from './components/ui/pixel-canvas';
import labSafeVideo from './assets/walkthrough_labsafe_web.mp4';
import metaShiftVideo from './assets/walkthrough_metashift_web.mp4';
import gatorParkVideo from './assets/walkthrough_gatorpark_web.mp4';
import posterLabSafe from './assets/poster_labsafe.jpg';
import posterMetaShift from './assets/poster_metashift.jpg';
import posterGatorPark from './assets/poster_gatorpark.jpg';
import link1 from './assets/link1.png';
import link2 from './assets/link2.png';
import link3 from './assets/link3.png';
import link4 from './assets/link4.png';
import link5 from './assets/link5.png';
import link6 from './assets/link6.png';
import link7 from './assets/link7.png';
import link8 from './assets/link8.png';
import link9 from './assets/link9.png';
import { ElegantShape } from './components/ui/shape-landing-hero';
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

const proofRow: [string, string][] = [
  ['Real workflow systems', 'LabSafe'],
  ['Automation tooling', 'MetaShift'],
  ['Published mobile app', 'GatorPark'],
  ['Technical stack', 'Python · Django · Swift · Firebase · React'],
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
          if (!video.src) { video.src = src; video.load(); }
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
    <a href="#home" className="group flex items-center gap-2.5" aria-label="HS Forge – home">
      <svg viewBox="0 0 48 56" width="28" height="33" fill="none" aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover:scale-105">
        <polygon points="24,1 2,13 2,43 24,55" fill="#12121a" />
        <polygon points="24,1 46,13 46,43 24,55" fill="#1a1a26" />
        <polygon points="24,1 46,13 46,43 24,55 2,43 2,13" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1" />
        <text x="12" y="40" textAnchor="middle" fontSize="27" fontWeight="900" fontFamily="Arial Black,Helvetica,sans-serif" fill="rgba(210,215,232,0.88)">H</text>
        <text x="36" y="40" textAnchor="middle" fontSize="27" fontWeight="900" fontFamily="Arial Black,Helvetica,sans-serif" fill="rgba(195,202,228,0.80)">S</text>
        <line x1="24" y1="2" x2="24" y2="54" stroke="#1d4ed8" strokeWidth="4" opacity="0.45" />
        <line x1="24" y1="2" x2="24" y2="54" stroke="#60a5fa" strokeWidth="1.5" opacity="0.95" />
        <line x1="24" y1="8" x2="24" y2="48" stroke="#e0f2fe" strokeWidth="0.65" opacity="0.85" />
        <line x1="24" y1="1" x2="46" y2="13" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <line x1="24" y1="1" x2="2"  y2="13" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      </svg>
      <span className={`text-[14px] font-black tracking-[0.04em] transition-colors duration-200 ${isDark ? 'text-white group-hover:text-cyan-100' : 'text-slate-900 group-hover:text-cyan-700'}`}>
        HS <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Forge</span>
      </span>
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
function VideoCard16x9({ src, poster, title, label, description, proof, chips, accent, isDark, idx, useLaptop = false }: {
  src: string; poster?: string; title: string; label: string; description: string;
  proof: string[]; chips: string[];
  accent: Accent; isDark: boolean; idx: number; useLaptop?: boolean;
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
                <h3 className={`mb-3 text-2xl font-black tracking-[-0.04em] md:text-3xl ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
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
              <h3 className={`mb-3 text-3xl font-black tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
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
function VideoCardPhone({ src, poster, title, label, description = '', proof = [], sections, chips, accent, isDark }: {
  src: string; poster?: string; title: string; label: string;
  description?: string; proof?: string[];
  sections?: { heading: string; text: string }[];
  chips: string[];
  accent: Accent; isDark: boolean;
}) {
  const t = tone(accent);
  const { ref: revealRef, visible } = useReveal();
  const videoRef = useVideoLazy(src);
  return (
    <div ref={revealRef} className={`reveal ${visible ? 'revealed' : ''}`} style={{ transitionDelay: '160ms' }}>
      <Surface>
        <div className={`absolute inset-0 bg-gradient-to-br ${t.soft} opacity-40`} />
        <div className="relative flex flex-col items-center gap-8 p-7 md:p-10 xl:flex-row xl:items-center">

          {/* ── Text panel — 45% on desktop ── */}
          <div className="w-full xl:w-[45%] xl:shrink-0 xl:pr-4">
            <span className={`mb-3 block text-[10px] font-black uppercase tracking-[0.28em] ${t.text}`}>{label}</span>
            <h3 className={`mb-3 text-3xl font-black tracking-[-0.04em] ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
            <div className="mb-5 flex flex-wrap gap-1.5">
              {chips.map(chip => (
                <span key={chip} className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${t.text} ${t.border} ${t.bg}`}>
                  {chip}
                </span>
              ))}
            </div>
            {sections ? (
              <div className="space-y-4">
                {sections.map((s, i) => (
                  <div key={i}>
                    <p className={`mb-1 text-[11px] font-black uppercase tracking-[0.18em] ${t.text}`}>{s.heading}</p>
                    <p className={`text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{s.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p className={`mb-5 text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
                <ul className="space-y-2">
                  {proof.map(item => (
                    <li key={item} className={`flex items-start gap-2.5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: t.hex }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* ── Phone mockup — 55% on desktop, centred ── */}
          <div className="relative flex w-full items-center justify-center py-6 xl:w-[55%] xl:shrink-0">
            {/* Ambient glow blob */}
            <div
              className="absolute -z-10 rounded-full blur-[80px] opacity-[0.18]"
              style={{ width: '340px', height: '340px', background: t.hex }}
            />
            {/* Phone frame + buttons — wrapped so buttons position against the phone, not the wide container */}
            <div className="relative" style={{ width: '272px' }}>
              <div
                className="relative overflow-hidden bg-[#050508]"
                style={{
                  width: '272px',
                  aspectRatio: '9/19.5',
                  borderRadius: '3.5rem',
                  border: '2.5px solid rgba(255,255,255,0.13)',
                  boxShadow: [
                    '0 80px 140px rgba(0,0,0,0.58)',
                    `0 0 80px ${t.hex}1a`,
                    'inset 0 1px 0 rgba(255,255,255,0.09)',
                    'inset 0 0 0 1px rgba(255,255,255,0.05)',
                  ].join(', '),
                }}
              >
                {/* Dynamic island */}
                <div
                  className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-black"
                  style={{ width: '108px', height: '30px' }}
                />
                {/* Inner screen ring */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-[3.25rem]"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
                />
                <video
                  ref={videoRef}
                  autoPlay muted loop playsInline preload="none"
                  poster={poster}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Home bar */}
                <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 h-1 w-20 rounded-full bg-white/25" />
              </div>
              {/* Side buttons — relative to the 272px phone wrapper */}
              <div className="absolute right-[-5px] top-[130px] h-[68px] w-1 rounded-full bg-white/[0.10]" />
              <div className="absolute left-[-5px] top-[105px] h-[44px] w-1 rounded-full bg-white/[0.10]" />
              <div className="absolute left-[-5px] top-[162px] h-[68px] w-1 rounded-full bg-white/[0.10]" />
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}

/* ─── ProcessSection helpers ─────────────────────────────────────────────── */
function AnimatedArrow({
  d, length, color, marker, active, pulse,
}: {
  d: string; length: number; color: string; marker: string; active: boolean; pulse: boolean;
}) {
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={active ? 0 : length}
        markerEnd={marker}
        style={{
          transition: 'stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease, filter 0.4s ease',
          filter: active ? `drop-shadow(0 0 5px ${color}bb)` : 'none',
          opacity: active ? 0.88 : 0.11,
        }}
      />
      {pulse && (
        <circle r="3.5" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
          <animateMotion dur="1.9s" repeatCount="indefinite" path={d} />
        </circle>
      )}
    </g>
  );
}

function ProcessNode({
  x, y, label, color, active, isDark,
}: {
  x: number; y: number; label: string; color: string; active: boolean; isDark: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Outer glow ring */}
      <circle
        r={44}
        fill="none"
        stroke={color}
        strokeWidth="1"
        style={{ opacity: active ? 0.16 : 0, transition: 'opacity 0.6s ease', filter: 'blur(4px)' }}
      />
      {/* Base circle */}
      <circle
        r={32}
        fill={isDark ? '#080c18' : '#f8fafc'}
        stroke={color}
        strokeWidth={active ? 1.5 : 0.4}
        style={{
          opacity: active ? 1 : 0.25,
          transition: 'opacity 0.5s ease, stroke-width 0.4s ease, filter 0.4s ease',
          filter: active ? `drop-shadow(0 0 12px ${color}55)` : 'none',
        }}
      />
      {/* Accent fill */}
      <circle
        r={32}
        fill={color}
        style={{ opacity: active ? 0.09 : 0, transition: 'opacity 0.5s ease' }}
      />
      {/* Label */}
      <text
        textAnchor="middle"
        dy="0.35em"
        fontSize="9.5"
        fontWeight="800"
        fill={active ? color : isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.18)'}
        style={{ transition: 'fill 0.5s ease', fontFamily: 'inherit', letterSpacing: '0.13em' }}
      >
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

  // 2×2 circuit layout inside viewBox "0 0 560 330"
  // Define(140,80) → Build(420,80)
  //     ↑                   ↓
  // Improve(140,240) ← Review(420,240)
  //
  // Node radius: 32px  ·  Arrow starts 35px from center

  const arrows = [
    { d: 'M 175,80  L 382,80',  len: 207, color: '#22d3ee', marker: 'url(#prc-c)', aS: 1, pS: 2 },
    { d: 'M 420,115 L 420,205', len: 90,  color: '#a78bfa', marker: 'url(#prc-v)', aS: 3, pS: 4 },
    { d: 'M 385,240 L 178,240', len: 207, color: '#a78bfa', marker: 'url(#prc-v)', aS: 5, pS: 6 },
    { d: 'M 140,205 L 140,115', len: 90,  color: '#22d3ee', marker: 'url(#prc-c)', aS: 7, pS: 8 },
  ];

  const nodes = [
    { label: 'Define',  x: 140, y: 80,  color: '#22d3ee', nS: 0 },
    { label: 'Build',   x: 420, y: 80,  color: '#a78bfa', nS: 2 },
    { label: 'Review',  x: 420, y: 240, color: '#a78bfa', nS: 4 },
    { label: 'Improve', x: 140, y: 240, color: '#22d3ee', nS: 6 },
  ];

  const descriptions = [
    { label: 'Define',  desc: 'Clarify the workflow',             pixels: ['#cffafe', '#67e8f9', '#22d3ee'] },
    { label: 'Build',   desc: 'Create the first useful version',  pixels: ['#ede9fe', '#c4b5fd', '#a78bfa'] },
    { label: 'Review',  desc: 'Test with real feedback',          pixels: ['#ede9fe', '#c4b5fd', '#a78bfa'] },
    { label: 'Improve', desc: 'Refine and repeat',                pixels: ['#cffafe', '#67e8f9', '#22d3ee'] },
  ];

  return (
    <section id="process" className="py-20 md:py-28 scroll-mt-20">
      {/* Heading */}
      <div className="mb-14 text-center">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">process</p>
        <h2 className={`text-[2.4rem] font-black leading-[1.05] tracking-[-0.04em] md:text-5xl ${isDark ? 'text-white' : 'text-slate-900'}`}>
          The Agile System
        </h2>
        <p className={`mx-auto mt-4 max-w-[460px] text-base leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Define the workflow, build the first useful version, review it, then improve through the next cycle.
        </p>
      </div>

      {/* Glass card */}
      <div ref={cardRef} className="mx-auto max-w-[640px]">
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
            style={{ background: 'radial-gradient(ellipse 62% 52% at 50% 50%, rgba(34,211,238,0.048), transparent 64%)' }}
          />
          {/* Top-edge shine */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

          {/* SVG diagram */}
          <div className="flex justify-center px-4 py-12 sm:px-8 md:px-12">
            <svg
              viewBox="0 0 560 330"
              aria-hidden="true"
              className="w-full"
              style={{ maxWidth: '500px', overflow: 'visible' }}
            >
              <defs>
                <marker id="prc-c" markerWidth="6" markerHeight="6" refX="5.2" refY="3" orient="auto">
                  <path d="M0,0.5 L5.5,3 L0,5.5 Z" fill="#22d3ee" />
                </marker>
                <marker id="prc-v" markerWidth="6" markerHeight="6" refX="5.2" refY="3" orient="auto">
                  <path d="M0,0.5 L5.5,3 L0,5.5 Z" fill="#a78bfa" />
                </marker>
              </defs>

              {/* Arrows */}
              {arrows.map((a, i) => (
                <AnimatedArrow
                  key={i}
                  d={a.d}
                  length={a.len}
                  color={a.color}
                  marker={a.marker}
                  active={on(a.aS)}
                  pulse={on(a.pS)}
                />
              ))}

              {/* "next cycle" label — rotated along the left return arrow */}
              <text
                x="52"
                y="160"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="700"
                fill="#22d3ee"
                transform="rotate(-90, 52, 160)"
                style={{
                  opacity: on(8) ? 0.6 : 0,
                  transition: 'opacity 0.9s ease 0.4s',
                  fontFamily: 'inherit',
                  letterSpacing: '0.16em',
                }}
              >
                NEXT CYCLE
              </text>

              {/* Nodes */}
              {nodes.map(n => (
                <ProcessNode
                  key={n.label}
                  x={n.x}
                  y={n.y}
                  label={n.label}
                  color={n.color}
                  active={on(n.nS)}
                  isDark={isDark}
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* 4-column step descriptions */}
      <div className="mx-auto mt-7 grid max-w-[640px] grid-cols-2 gap-3 md:grid-cols-4">
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
              <p className="mb-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-400">{label}</p>
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
    <section id="work" className="py-20 md:py-28 scroll-mt-20">
      <div ref={headerRef} className={`reveal ${headerVis ? 'revealed' : ''} mb-14 max-w-2xl`}>
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">proof of work</p>
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
            accent="emerald" isDark={isDark} idx={0} useLaptop
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
            accent="violet" isDark={isDark} idx={1} useLaptop
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
            accent="cyan" isDark={isDark}
          />
        </CardScrollReveal>
      </div>

      <div className="mt-12">
        <p className={`mb-5 text-[10px] font-black uppercase tracking-[0.28em] ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
          Built, shipped, and used
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {proofRow.map(([label, sub]) => (
            <div key={label} className={`rounded-2xl border p-4 ${isDark ? 'border-white/[0.06] bg-white/[0.025]' : 'border-slate-200 bg-slate-100/50'}`}>
              <p className={`text-sm font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{label}</p>
              <p className={`mt-1 text-[11px] font-medium leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{sub}</p>
            </div>
          ))}
        </div>
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
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">
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
                    background: i === activeIdx ? '#22d3ee' : i < activeIdx ? 'rgba(34,211,238,0.3)' : 'rgba(255,255,255,0.15)',
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
    <section id="contact" className="py-20 md:py-28 scroll-mt-20">
      <div ref={ref} className={`reveal ${visible ? 'revealed' : ''} mb-12 text-center`}>
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.28em] text-cyan-300">services</p>
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
    <div className={`relative min-h-screen overflow-x-hidden transition-colors duration-300 selection:bg-cyan-200 selection:text-slate-950 ${isDark ? 'bg-[#020817] text-slate-100' : 'bg-[#f5f3ee] text-slate-900'}`}>
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_8%,rgba(34,211,238,.06),transparent_32%),radial-gradient(ellipse_at_78%_12%,rgba(168,85,247,.05),transparent_30%),radial-gradient(ellipse_at_85%_80%,rgba(16,185,129,.05),transparent_30%)]" />
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
