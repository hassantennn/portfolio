"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const RADIUS = 130;
const DETAIL_H = 200; // px reserved at bottom for detail panel
const DEG_PER_SEC = 20; // 1 full rotation every 18s

function statusStyle(s: TimelineItem["status"]) {
  if (s === "completed")  return { label: "Shipped",  cls: "text-emerald-300 bg-emerald-400/10 border-emerald-400/30" };
  if (s === "in-progress") return { label: "Active",   cls: "text-cyan-300 bg-cyan-400/10 border-cyan-400/30" };
  return                           { label: "Planned",  cls: "text-slate-400 bg-slate-400/10 border-slate-400/30" };
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  /* ── Rotation via RAF — pure refs, no state thrash ─────────────── */
  const [, tick] = useState(0);
  const rotRef    = useRef(0);
  const pausedRef = useRef(false);
  const lastTRef  = useRef<number | null>(null);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const frame = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTRef.current !== null) {
          const dt = Math.min((ts - lastTRef.current) / 1000, 0.1);
          rotRef.current = (rotRef.current + DEG_PER_SEC * dt) % 360;
          tick(n => n + 1);
        }
        lastTRef.current = ts;
      } else {
        lastTRef.current = null;
      }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* ── Node interaction state ────────────────────────────────────── */
  const [activeId,  setActiveId]  = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const open  = (id: number)       => { setActiveId(id); pausedRef.current = true; };
  const close = (id: number)       => { if (activeId === id) { setActiveId(null); pausedRef.current = false; } };
  const dismiss = ()               => { setActiveId(null); pausedRef.current = false; };
  const jump  = (id: number)       => { setActiveId(id); };

  /* ── Position helpers ──────────────────────────────────────────── */
  const getPos = (index: number) => {
    const angle = ((index / timelineData.length) * 360 + rotRef.current - 90) % 360;
    const rad   = (angle * Math.PI) / 180;
    return { x: RADIUS * Math.cos(rad), y: RADIUS * Math.sin(rad) };
  };

  const activeItem = activeId !== null ? timelineData.find(i => i.id === activeId) ?? null : null;

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <div className="relative h-full w-full select-none">

      {/* ── Orbit zone ─────────────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 top-0 overflow-hidden cursor-default"
        style={{ bottom: `${DETAIL_H}px` }}
        onClick={dismiss}
      >
        {/* Decorative rings */}
        {[RADIUS + 22, RADIUS + 58].map((r, i) => (
          <div
            key={r}
            className="orbital-ring pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: r * 2, height: r * 2, border: `1px solid rgba(255,255,255,${i === 0 ? 0.07 : 0.03})` }}
          />
        ))}

        {/* Center orb */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 via-violet-500 to-emerald-500 shadow-[0_0_48px_rgba(34,211,238,0.5)]">
            <div className="absolute h-20 w-20 animate-ping rounded-full border border-cyan-300/20 opacity-30" />
            <div className="h-7 w-7 rounded-full bg-white/85 backdrop-blur-sm" />
          </div>
        </div>

        {/* Nodes */}
        {timelineData.map((item, idx) => {
          const { x, y } = getPos(idx);
          const isActive  = activeId  === item.id;
          const isHovered = hoveredId === item.id;
          const isRelated = activeId !== null && item.relatedIds.includes(activeId);
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top:  `calc(50% + ${y}px)`,
                zIndex: isActive ? 60 : isHovered ? 40 : 20,
              }}
              onClick={(e) => { e.stopPropagation(); isActive ? close(item.id) : open(item.id); }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Glow aura */}
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300"
                style={{
                  left: "50%", top: "50%",
                  width:  isActive ? 88 : isHovered ? 68 : isRelated ? 56 : 44,
                  height: isActive ? 88 : isHovered ? 68 : isRelated ? 56 : 44,
                  background: `radial-gradient(circle, rgba(34,211,238,${
                    isActive ? 0.5 : isHovered ? 0.36 : isRelated ? 0.22 : 0.1
                  }) 0%, transparent 70%)`,
                  filter: "blur(8px)",
                }}
              />

              {/* Node circle */}
              <div
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200"
                style={{
                  transform: `scale(${isActive ? 1.5 : isHovered ? 1.22 : 1})`,
                  background:   isActive ? "rgb(207 250 254)" : isRelated ? "rgba(34,211,238,0.14)" : "rgba(8,16,36,0.9)",
                  borderColor:  isActive ? "rgb(207 250 254)" : isHovered ? "rgba(103,232,249,0.85)" : isRelated ? "rgba(34,211,238,0.55)" : "rgba(255,255,255,0.2)",
                  color:        isActive ? "rgb(2,8,23)"       : isHovered ? "rgb(207,250,254)"       : isRelated ? "rgb(165,243,252)" : "rgb(148,163,184)",
                  boxShadow: isActive
                    ? "0 0 32px rgba(34,211,238,0.75), 0 0 70px rgba(34,211,238,0.3)"
                    : isHovered
                    ? "0 0 20px rgba(34,211,238,0.5)"
                    : isRelated
                    ? "0 0 12px rgba(34,211,238,0.25)"
                    : "none",
                }}
              >
                <Icon size={14} />
              </div>

              {/* Tooltip label — appears on hover or active */}
              {(isHovered || isActive) && (
                <div
                  className="orbital-tooltip pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/[0.1] bg-[#020817]/90 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur-sm transition-all"
                  style={{
                    bottom: "calc(100% + 10px)",
                    color: isActive ? "rgb(207,250,254)" : "rgb(226,232,240)",
                  }}
                >
                  {item.title}
                </div>
              )}

              {/* Permanent dim label below node (non-active, non-hovered) */}
              {!isHovered && !isActive && (
                <p
                  className="pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-wide transition-colors duration-200"
                  style={{ top: "46px", color: isRelated ? "rgba(103,232,249,0.7)" : "rgba(71,85,105,0.9)" }}
                >
                  {item.title}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Detail panel ────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-start px-4 pb-4 pt-2"
        style={{ height: `${DETAIL_H}px` }}
      >
        {activeItem ? (
          <div
            key={activeItem.id}
            className="orbital-panel w-full rounded-2xl border border-white/[0.12] bg-[#020817]/97 backdrop-blur-2xl shadow-2xl shadow-black/60"
            style={{ animation: "detailSlideIn 0.2s ease" }}
          >
            <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3">
              <div className="min-w-0">
                <p className="truncate text-base font-black text-white">{activeItem.title}</p>
                <p className="mt-0.5 text-[10px] font-mono text-slate-500">{activeItem.date}</p>
              </div>
              <span className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider mt-0.5 ${statusStyle(activeItem.status).cls}`}>
                {statusStyle(activeItem.status).label}
              </span>
            </div>

            <div className="grid gap-3 px-5 pb-4 md:grid-cols-[1fr_auto]">
              <p className="text-[11px] leading-[1.65] text-slate-300">{activeItem.content}</p>

              <div className="flex flex-col gap-2 md:w-44">
                {/* Depth bar */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-[9px]">
                    <span className="flex items-center gap-1 text-slate-500"><Zap size={8} />Depth</span>
                    <span className="font-mono text-slate-400">{activeItem.energy}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-500" style={{ width: `${activeItem.energy}%` }} />
                  </div>
                </div>

                {/* Related */}
                {activeItem.relatedIds.length > 0 && (
                  <div>
                    <p className="mb-1.5 text-[9px] uppercase tracking-[0.14em] text-slate-500">Connected</p>
                    <div className="flex flex-wrap gap-1">
                      {activeItem.relatedIds.map(relId => {
                        const rel = timelineData.find(i => i.id === relId);
                        return rel ? (
                          <button
                            key={relId}
                            type="button"
                            className="flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-0.5 text-[9px] text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-cyan-200"
                            onClick={(e) => { e.stopPropagation(); jump(relId); }}
                          >
                            {rel.title} <ArrowRight size={7} />
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-600">Click any node to explore</p>
          </div>
        )}
      </div>
    </div>
  );
}
