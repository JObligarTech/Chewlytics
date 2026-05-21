"use client";

import { useState } from "react";
import { Plus, ChevronRight, Target, Flame, Zap, Footprints, Dumbbell } from "lucide-react";
import { toast } from "sonner";
import { TopNav } from "@/components/layout/TopNav";
import { progressData } from "@/lib/data";
import { Sparkline } from "@/components/charts/Sparkline";

const PAGE_PAD = { maxWidth: 1440, margin: "0 auto", padding: "24px 24px 40px" };

type Range = typeof progressData.rangeOptions[number];

function RangePills({ value, onChange }: { value: Range; onChange: (r: Range) => void }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {progressData.rangeOptions.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          style={{
            padding: "4px 10px",
            borderRadius: 7,
            border: "none",
            background: value === r ? "var(--chew-green)" : "var(--chew-surface-2)",
            color: value === r ? "white" : "var(--chew-text-2)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {r}
        </button>
      ))}
    </div>
  );
}

function HeroStat({ label, value, sub, color, icon }: {
  label: string; value: string | number; sub: string; color: string; icon: React.ElementType | string;
}) {
  const isEmoji = typeof icon === "string";
  const I = !isEmoji ? (icon as React.ElementType) : null;
  return (
    <div className="chew-card" style={{ padding: 18, flex: 1 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}1a`, color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
        {isEmoji ? <span style={{ fontSize: 20 }}>{icon as string}</span> : I ? <I size={18} strokeWidth={2} /> : null}
      </div>
      <div className="mono" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", color, lineHeight: 1, marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 11.5, color: "var(--chew-text-3)" }}>{sub}</div>
    </div>
  );
}

function WeightChartSvg({ range }: { range: Range }) {
  const dayCounts: Record<Range, number> = { "1W": 7, "1M": 30, "3M": 90, "6M": 90, "1Y": 90, "All": 90 };
  const series = progressData.weightSeries.slice(-dayCounts[range]);
  const width = 700, height = 240;
  const padding = { top: 24, right: 28, bottom: 28, left: 42 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const vals = series.map((d) => d.val);
  const min = Math.min(...vals, progressData.goalWeight) - 1;
  const max = Math.max(...vals) + 0.5;
  const rangeV = max - min;
  const step = w / Math.max(series.length - 1, 1);
  const points = series.map((d, i) => [padding.left + i * step, padding.top + h - ((d.val - min) / rangeV) * h]);
  const path = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${path} L${padding.left + w},${padding.top + h} L${padding.left},${padding.top + h} Z`;
  const last = points[points.length - 1];
  const first = points[0];
  const goalY = padding.top + h - ((progressData.goalWeight - min) / rangeV) * h;

  const yTicks: number[] = [];
  for (let y = Math.floor(min); y <= Math.ceil(max); y++) { if (y % 2 === 0) yTicks.push(y); }

  const xTickCount = Math.min(6, series.length);
  const xTicks = Array.from({ length: xTickCount }, (_, i) => {
    const idx = Math.floor((i / (xTickCount - 1)) * (series.length - 1));
    const d = new Date(series[idx].date);
    return { x: padding.left + (idx / Math.max(series.length - 1, 1)) * w, label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) };
  });

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id="wc-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22b573" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#22b573" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((y, i) => {
        const yPos = padding.top + h - ((y - min) / rangeV) * h;
        if (yPos < padding.top - 1 || yPos > padding.top + h + 1) return null;
        return (
          <g key={i}>
            <line x1={padding.left} x2={padding.left + w} y1={yPos} y2={yPos} stroke="#eef1f0" strokeDasharray="3 3" />
            <text x={padding.left - 8} y={yPos + 3} fontSize="10.5" fill="#b8c1bf" textAnchor="end">{y}</text>
          </g>
        );
      })}
      <line x1={padding.left} x2={padding.left + w} y1={goalY} y2={goalY} stroke="#22b573" strokeWidth="1.2" strokeDasharray="5 4" opacity="0.6" />
      <text x={padding.left + w - 4} y={goalY - 6} fontSize="10.5" fill="#22b573" textAnchor="end" fontWeight="700">Goal · {progressData.goalWeight} lbs</text>
      <path d={area} fill="url(#wc-fill)" />
      <path d={path} fill="none" stroke="#22b573" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={first[0]} cy={first[1]} r="5" fill="white" stroke="#9aa9a5" strokeWidth="2" />
      <text x={first[0]} y={first[1] - 12} fontSize="10" fill="#9aa9a5" textAnchor="middle" fontWeight="600">START</text>
      <circle cx={last[0]} cy={last[1]} r="7" fill="#22b573" opacity="0.15" />
      <circle cx={last[0]} cy={last[1]} r="5" fill="#22b573" />
      <text x={last[0]} y={last[1] - 13} fontSize="10.5" fill="var(--chew-text)" textAnchor="middle" fontWeight="700">{series[series.length - 1]?.val}</text>
      {xTicks.map((t, i) => <text key={i} x={t.x} y={height - 6} fontSize="10.5" fill="#b8c1bf" textAnchor="middle">{t.label}</text>)}
    </svg>
  );
}

function WeightProgress({ range, setRange }: { range: Range; setRange: (r: Range) => void }) {
  const series = progressData.weightSeries;
  const start = series[0].val, cur = series[series.length - 1].val;
  const delta = +(cur - start).toFixed(1);
  const toGoal = +(cur - progressData.goalWeight).toFixed(1);
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="card-title">Weight Trend</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)", marginTop: 2 }}>Tracking toward your goal of {progressData.goalWeight} lbs</div>
        </div>
        <RangePills value={range} onChange={setRange} />
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 14 }}>
        {[
          { label: "Start", val: start, color: "var(--chew-text)" },
          { label: "Current", val: cur, color: "var(--chew-green)" },
          { label: "Change", val: `${delta < 0 ? "" : "+"}${delta}`, color: delta < 0 ? "var(--chew-green)" : "var(--chew-red)" },
          { label: "To goal", val: Math.abs(toGoal), color: "var(--chew-text)" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginBottom: 2 }}>{s.label}</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}<span className="unit"> lbs</span></div>
          </div>
        ))}
      </div>
      <WeightChartSvg range={range} />
    </div>
  );
}

function BodyComp() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="card-title">Body Composition</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)", marginTop: 2 }}>Updated May 18 · weekly measurement</div>
        </div>
        <button onClick={() => toast.info("Log measurement")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", borderRadius: 9, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 12.5, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}>
          <Plus size={12} strokeWidth={2.4} /> Log measurement
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
        {progressData.bodyComp.map((b) => (
          <div key={b.name} className="chew-card" style={{ padding: 14 }}>
            <div style={{ fontSize: 11.5, color: "var(--chew-text-3)", marginBottom: 4 }}>{b.name}</div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: b.color, marginBottom: 4 }}>
              {b.val}<span className="unit">{b.unit}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: b.deltaUp ? "var(--chew-green)" : "var(--chew-green)", marginBottom: 8 }}>{b.delta}</div>
            <Sparkline data={b.series} color={b.color} height={32} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityTrend() {
  const data = progressData.weekly;
  const maxKcal = Math.max(...data.map((d) => d.kcal));
  const maxMin = Math.max(...data.map((d) => d.min));
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="card-title">Activity Trends</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)", marginTop: 2 }}>Weekly burn & active minutes · last 12 weeks</div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 11.5, color: "var(--chew-text-3)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><i style={{ width: 10, height: 10, borderRadius: 2, background: "#ff7a45", display: "inline-block" }} /> Calories burned</span>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}><i style={{ width: 10, height: 10, borderRadius: 2, background: "#22b573", display: "inline-block" }} /> Active minutes</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 120 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <div style={{ width: "100%", height: 100, display: "flex", alignItems: "flex-end", gap: 2 }}>
              <div style={{ flex: 1, height: `${(d.kcal / maxKcal) * 100}%`, background: "#ff7a45", borderRadius: "3px 3px 0 0", opacity: d.partial ? 0.55 : 1 }} />
              <div style={{ flex: 1, height: `${(d.min / maxMin) * 100}%`, background: "#22b573", borderRadius: "3px 3px 0 0", opacity: d.partial ? 0.55 : 1 }} />
            </div>
            <div style={{ fontSize: 9.5, color: "var(--chew-text-4)", textAlign: "center" }}>{d.date.split(" ")[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GoalProgress() {
  const icons: Record<string, React.ElementType> = { "Weight Goal": Dumbbell, "Calorie Target": Flame, "Protein Target": Zap, "Daily Steps": Footprints };
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-green-50)", color: "var(--chew-green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Target size={14} strokeWidth={2} />
        </div>
        <div className="card-title">Goal Progress</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {progressData.goalProgress.map((g) => {
          let pct: number;
          if (g.inverted) {
            pct = (g.current / g.goal) * 100;
          } else {
            const total = Math.abs(g.start - g.goal);
            const done = Math.abs(g.start - g.current);
            pct = total > 0 ? (done / total) * 100 : 0;
          }
          const I = icons[g.name] ?? Target;
          const display = g.inverted
            ? `${g.current.toLocaleString()} / ${g.goal.toLocaleString()} ${g.unit}`
            : `${g.current} ${g.unit} · ${g.goal} ${g.unit} goal`;
          return (
            <div key={g.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: g.bg, color: g.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I size={12} strokeWidth={2} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{g.name}</span>
                <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: g.color }}>{Math.round(pct)}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: g.color }} />
              </div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginTop: 3 }}>{display}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Milestones() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fff4dc", display: "flex", alignItems: "center", justifyContent: "center" }}>🎖️</div>
          <div className="card-title">Recent Milestones</div>
        </div>
        <button style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>See all →</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {progressData.milestones.map((m) => (
          <div key={m.title} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}>{m.title}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{m.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressPhotos() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-purple-50)", color: "var(--chew-purple)", display: "flex", alignItems: "center", justifyContent: "center" }}>📸</div>
          <div className="card-title">Progress Photos</div>
        </div>
        <button onClick={() => toast.info("Add photo")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 9px", borderRadius: 7, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 11, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}>
          <Plus size={11} strokeWidth={2.4} /> Add
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {progressData.photos.map((p, i) => (
          <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--chew-hairline)" }}>
            <div style={{ height: 100, background: "var(--chew-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <svg width="100%" height="100%" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id={`stripe-${i}`} patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <rect width="8" height="8" fill="#f1f3f3" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#e2e5e6" strokeWidth="3" />
                  </pattern>
                </defs>
                <rect width="100" height="80" fill={`url(#stripe-${i})`} />
                <text x="50" y="44" fontSize="9" fill="#9aa9a5" textAnchor="middle" fontFamily="ui-monospace, monospace">photo</text>
              </svg>
            </div>
            <div style={{ padding: "8px 10px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--chew-text)" }}>{p.date}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{p.weight}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const [range, setRange] = useState<Range>(progressData.defaultRange);
  const d = progressData;

  return (
    <div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
      <TopNav />
      <div style={PAGE_PAD} className="fade-in">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--chew-text)", margin: 0, letterSpacing: "-0.025em" }}>Progress</h1>
            <p style={{ fontSize: 13.5, color: "var(--chew-text-3)", margin: "4px 0 0" }}>
              Long-term trends across your weight, body composition, and activity.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button onClick={() => toast.info("Log measurement…")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 14px", borderRadius: 10, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface)", fontSize: 13, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}>
              <Plus size={13} strokeWidth={2.4} /> Log measurement
            </button>
            <button onClick={() => toast.info("Exporting report…")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 14px", borderRadius: 10, background: "var(--chew-green)", color: "white", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
              Export report
            </button>
          </div>
        </div>

        {/* Hero stats */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <HeroStat label="Weight change" value="-3.2 lbs" sub="since Feb 12" color="var(--chew-green)" icon={Dumbbell} />
          <HeroStat label="Logging streak" value="12 days" sub="current streak" color="#ff7a45" icon="🔥" />
          <HeroStat label="Workouts" value={47} sub="logged this quarter" color="var(--chew-purple)" icon={Zap} />
          <HeroStat label="Days on track" value="38/60" sub="days on track" color="var(--chew-teal)" icon={Target} />
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <WeightProgress range={range} setRange={setRange} />
            <BodyComp />
            <ActivityTrend />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <GoalProgress />
            <Milestones />
            <ProgressPhotos />
          </div>
        </div>
      </div>
    </div>
  );
}
