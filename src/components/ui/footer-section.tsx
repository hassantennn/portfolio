'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Globe, Link, Mail } from 'lucide-react';

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: 'Navigation',
    links: [
      { title: 'Work', href: '#work' },
      { title: 'Research', href: '#research' },
      { title: 'Contact', href: '#contact' },
    ],
  },
  {
    label: 'Focus',
    links: [
      { title: 'AI / ML Systems', href: '#research' },
      { title: 'Quantum Computing', href: '#research' },
      { title: 'Product Engineering', href: '#research' },
      { title: 'Research Software', href: '#work' },
    ],
  },
  {
    label: 'Projects',
    links: [
      { title: 'LabSafe', href: '#work' },
      { title: 'MetaShift', href: '#work' },
      { title: 'Archivault', href: '#work' },
      { title: 'GatorPark', href: '#work' },
    ],
  },
  {
    label: 'Connect',
    links: [
      { title: 'LinkedIn', href: 'https://uk.linkedin.com/in/hassan-tariq-shafi', icon: Globe },
      { title: 'GitHub', href: '#', icon: Link },
      { title: 'Email', href: 'mailto:hassantariq233@gmail.com', icon: Mail },
    ],
  },
];

export function PortfolioFooter() {
  return (
    <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-3xl border-t border-white/[0.06] bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.05),transparent)] px-6 py-14 lg:py-20">
      <div className="pointer-events-none absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-px rounded-full bg-white/20 blur-sm" />

      <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.07] text-[11px] font-black text-cyan-200">HT</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">Hassan Tariq Shafi</span>
          </div>
          <p className="text-sm text-slate-500 max-w-xs leading-6">
            Maths + CS undergraduate at Aberdeen and AI Research Assistant at the University of Florida — building research-grade software at the intersection of deep learning, quantum computing, and real products.
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
            © {new Date().getFullYear()} Hassan Tariq Shafi
          </p>
        </AnimatedContainer>

        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.08}>
              <div>
                <h3 className="text-[9px] font-black uppercase tracking-[0.28em] text-cyan-300">{section.label}</h3>
                <ul className="mt-4 space-y-2.5">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 transition-colors duration-200 hover:text-slate-200"
                      >
                        {link.icon && <link.icon className="h-3 w-3" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <>{children}</>;
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
