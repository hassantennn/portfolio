import React from 'react';
import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva(
  'relative group border text-foreground mx-auto text-center rounded-full inline-flex items-center justify-center whitespace-nowrap font-bold transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-slate-400/[0.06] hover:bg-slate-400/0 border-slate-400/25 text-slate-200',
        primary: 'bg-slate-200 hover:bg-white text-slate-950 border-transparent shadow-[0_0_40px_rgba(148,163,184,.22)] hover:shadow-[0_0_55px_rgba(148,163,184,.35)]',
        ghost: 'border-white/12 bg-white/[0.04] hover:border-slate-300/40 hover:text-slate-100 text-white',
      },
      size: {
        default: 'px-6 py-3 text-[0.78rem] tracking-[0.14em] uppercase',
        sm: 'px-4 py-2 text-[0.7rem] tracking-[0.12em] uppercase',
        lg: 'px-8 py-4 text-[0.85rem] tracking-[0.14em] uppercase',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  neon?: boolean;
  asLink?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, neon = true, size, variant, children, asLink, href, target, rel, ...props }, ref) => {
    const cls = cn(buttonVariants({ variant, size }), className);

    if (asLink && href) {
      return (
        <a href={href} target={target} rel={rel} className={cls}>
          {neon && variant !== 'primary' && (
            <span className="absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-slate-400 to-transparent" />
          )}
          {children}
          {neon && variant !== 'primary' && (
            <span className="absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-slate-400 to-transparent" />
          )}
        </a>
      );
    }

    return (
      <button className={cls} ref={ref} {...props}>
        {neon && variant !== 'primary' && (
          <span className="absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 top-0 bg-gradient-to-r w-3/4 mx-auto from-transparent via-slate-400 to-transparent" />
        )}
        {children}
        {neon && variant !== 'primary' && (
          <span className="absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-slate-400 to-transparent" />
        )}
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';
export { NeonButton, buttonVariants };
