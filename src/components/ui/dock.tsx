import * as React from "react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

interface DockProps {
  className?: string
  children: React.ReactNode
  maxAdditionalSize?: number
  iconSize?: number
  isDark?: boolean
}

interface DockIconProps {
  className?: string
  src?: string
  href?: string
  name: string
  handleIconHover?: (e: React.MouseEvent<HTMLLIElement>) => void
  children?: React.ReactNode
  iconSize?: number
  onClick?: () => void
  isDark?: boolean
}

type ScaleValueParams = [number, number]

export const scaleValue = function (
  value: number,
  from: ScaleValueParams,
  to: ScaleValueParams
): number {
  const scale = (to[1] - to[0]) / (from[1] - from[0])
  const capped = Math.min(from[1], Math.max(from[0], value)) - from[0]
  return Math.floor(capped * scale + to[0])
}

export function DockIcon({
  className,
  src,
  href = "#",
  name,
  handleIconHover,
  children,
  iconSize,
  onClick,
  isDark = true,
}: DockIconProps) {
  const ref = useRef<HTMLLIElement | null>(null)

  return (
    <li
      ref={ref}
      style={
        {
          transition: "width 150ms cubic-bezier(0.25,1,0.5,1), height 150ms cubic-bezier(0.25,1,0.5,1), margin-top 150ms cubic-bezier(0.25,1,0.5,1)",
          "--icon-size": `${iconSize}px`,
        } as React.CSSProperties
      }
      onMouseMove={handleIconHover}
      className={cn(
        "dock-icon group/li relative flex h-[var(--icon-size)] w-[var(--icon-size)] cursor-pointer items-center justify-center px-[calc(var(--icon-size)*0.075)] hover:-mt-[calc(var(--icon-size)/2)] hover:h-[calc(var(--icon-size)*1.5)] hover:w-[calc(var(--icon-size)*1.5)]",
        className
      )}
    >
      <a
        href={href}
        onClick={onClick ? (e) => { e.preventDefault(); onClick(); } : undefined}
        className={cn(
          "group/a relative flex aspect-square w-full items-center justify-center rounded-[10px] border p-1.5 after:absolute after:inset-0 after:rounded-[inherit] after:shadow-md",
          isDark
            ? "border-white/[0.10] bg-gradient-to-t from-zinc-900 to-zinc-800 after:shadow-zinc-900/30 shadow-[rgba(255,255,255,0.08)_0px_1px_0px_inset]"
            : "border-black/[0.10] bg-gradient-to-t from-neutral-100 to-white after:shadow-zinc-800/10 shadow-[rgba(0,0,0,0.05)_0px_1px_0px_inset]"
        )}
      >
        <span className={cn(
          "pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border px-2 py-1 text-[11px] font-medium opacity-0 transition-opacity duration-200 group-hover/li:opacity-100 z-10",
          isDark
            ? "border-white/[0.10] bg-zinc-900/95 text-white backdrop-blur-sm"
            : "border-black/[0.08] bg-white/95 text-slate-900 backdrop-blur-sm"
        )}>
          {name}
        </span>
        {src ? (
          <img src={src} alt={name} className="h-full w-full rounded-[inherit] object-contain" />
        ) : (
          children
        )}
      </a>
    </li>
  )
}

DockIcon.displayName = "DockIcon"

export function Dock({
  className,
  children,
  maxAdditionalSize = 5,
  iconSize = 52,
  isDark = true,
}: DockProps) {
  const dockRef = useRef<HTMLDivElement | null>(null)

  const handleIconHover = (e: React.MouseEvent<HTMLLIElement>) => {
    if (!dockRef.current) return
    const mousePos = e.clientX
    const iconPosLeft = e.currentTarget.getBoundingClientRect().left
    const iconWidth = e.currentTarget.getBoundingClientRect().width

    const cursorDistance = (mousePos - iconPosLeft) / iconWidth
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    )

    dockRef.current.style.setProperty("--dock-offset-left", `${offsetPixels * -1}px`)
    dockRef.current.style.setProperty("--dock-offset-right", `${offsetPixels}px`)
  }

  return (
    <div ref={dockRef} role="navigation" aria-label="Site navigation">
      <ul
        className={cn(
          "flex items-center gap-0.5 rounded-2xl border p-1.5 backdrop-blur-xl",
          isDark
            ? "border-white/[0.08] bg-[#020817]/88 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "border-black/[0.07] bg-[#f5f3ee]/92 shadow-[0_8px_32px_rgba(0,0,0,0.10)]",
          className
        )}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) &&
          (child.type as { displayName?: string }).displayName === "DockIcon"
            ? React.cloneElement(child as React.ReactElement<DockIconProps>, {
                handleIconHover,
                iconSize,
                isDark,
              })
            : child
        )}
      </ul>
    </div>
  )
}
