"use client";

import React, { useState } from "react";
import { Plus, ChevronRight, Download } from "lucide-react";
import { toast } from "sonner";
import { TopNav } from "@/components/layout/TopNav";
import { DayNav } from "@/components/layout/DayNav";
import { reportsData } from "@/lib/data";

const PAGE_PAD = { maxWidth: 1440, margin: "0 auto", padding: "24px 24px 40px" };

const REPORT_ICONS: Record<string, string> = {
  nutrition: "🥗",
  activity: "🏃",
  body: "⚖️",
  macro: "🍱",
  wellness: "✨",
};

function MacroDonut() {
  const size = 160;
  const cx = size / 2, cy = size / 2;
  const r = (size / 2) - 14;
  const stroke = 20;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const arcs = reportsData.macroDist.map((m) => {
    const length = (m.pct / 100) * c;
    const arc = { color: m.color, length, offset };
    offset += length;
    return arc;
  });
  const total = reportsData.macroDist.reduce((s, m) => s + m.kcal, 0);

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={cx} cy={cy} r={r} stroke="#eef1f0" strokeWidth={stroke} fill="none" />
          {arcs.map((a, i) => (
            <circle key={i} cx={cx} cy={cy} r={r} stroke={a.color} strokeWidth={stroke} fill="none"
              strokeDasharray={`${a.length} ${c}`} strokeDashoffset={-a.offset} />
          ))}
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}>{total.toLocaleString()}</div>
          <div style={{ fontSize: 9.5, color: "var(--chew-text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 2 }}>avg kcal/day</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {reportsData.macroDist.map((m) => (
          <div key={m.name}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: m.color, flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}>{m.name}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 17 }}>
              <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: m.color }}>{m.pct}%</span>
              <span className="mono" style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{m.grams}g · {m.kcal} kcal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DailyCalBars() {
  const max = Math.max(...reportsData.dailyCalories.map((d) => d.kcal), reportsData.goal);
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-end", height: 120 }}>
      {reportsData.dailyCalories.map((d) => {
        const h = (d.kcal / max) * 100;
        const goalH = (reportsData.goal / max) * 100;
        return (
          <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--chew-text-3)", opacity: d.partial ? 0.55 : 1 }}>{d.kcal.toLocaleString()}</div>
            <div style={{ width: "100%", height: 88, position: "relative", display: "flex", alignItems: "flex-end" }}>
              <div style={{
                position: "absolute",
                left: 0, right: 0,
                bottom: `${goalH}%`,
                height: 2,
                background: "rgba(34,181,115,0.4)",
              }} />
              <div style={{
                width: "100%",
                height: `${h}%`,
                borderRadius: "4px 4px 0 0",
                background: d.partial ? "repeating-linear-gradient(135deg, #c8e8d6 0 6px, #b0dec0 6px 12px)" : "linear-gradient(180deg, #2dd089, #1a9e63)",
                transition: "height 0.6s ease",
              }} />
            </div>
            <div style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>{d.day}</div>
          </div>
        );
      })}
    </div>
  );
}

function ReportPreview({ active }: { active: string }) {
  const r = reportsData.reportTypes.find((x) => x.key === active) || reportsData.reportTypes[0];
  return (
    <div className="chew-card" style={{ padding: 28 }}>
      {/* Cover */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingBottom: 20, borderBottom: "1px solid var(--chew-hairline)", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--chew-text-3)", textTransform: "uppercase", marginBottom: 6 }}>REPORT · {r.name.toUpperCase()}</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--chew-text)", letterSpacing: "-0.025em", marginBottom: 8 }}>{reportsData.period}</div>
          <div style={{ fontSize: 12.5, color: "var(--chew-text-3)", display: "flex", gap: 8 }}>
            <span><b>Alex Johnson</b></span>
            <span>·</span>
            <span>Generated {reportsData.generatedAt}</span>
            <span>·</span>
            <span>Page 1 of 1</span>
          </div>
        </div>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: r.bg, color: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>
          {REPORT_ICONS[r.key]}
        </div>
      </div>

      {/* KPIs */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 700, color: "var(--chew-text)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.04em", fontSize: 11 } as React.CSSProperties}>Summary at a glance</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {reportsData.weekKpi.map((k) => (
            <div key={k.label} style={{ padding: 14, background: "var(--chew-surface-2)", borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginBottom: 4 }}>{k.label}</div>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: k.color }}>{k.v}<span className="unit"> {k.unit}</span></div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginTop: 2 }}>{k.delta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Macro dist */}
      <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--chew-hairline)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--chew-text-3)", marginBottom: 12 }}>Macro distribution</div>
        <MacroDonut />
      </div>

      {/* Daily calories */}
      <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--chew-hairline)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--chew-text-3)" }}>Daily calories</span>
          <span style={{ fontSize: 11, color: "var(--chew-text-3)" }}>vs <b className="mono">{reportsData.goal.toLocaleString()}</b> goal</span>
        </div>
        <DailyCalBars />
      </div>

      {/* Food group balance */}
      <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--chew-hairline)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--chew-text-3)", marginBottom: 12 }}>Food group balance</div>
        <div style={{ display: "flex", height: 28, borderRadius: 7, overflow: "hidden", marginBottom: 12 }}>
          {reportsData.foodGroups.map((g) => (
            <div key={g.name} style={{ width: `${g.pct}%`, background: g.color }} title={`${g.name}: ${g.pct}%`} />
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
          {reportsData.foodGroups.map((g) => (
            <span key={g.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--chew-text-2)" }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: g.color, display: "inline-block" }} />
              {g.name} <span className="mono" style={{ fontWeight: 700 }}>{g.pct}%</span>
            </span>
          ))}
        </div>
      </div>

      {/* Top foods table */}
      <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid var(--chew-hairline)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--chew-text-3)", marginBottom: 12 }}>Top consumed foods</div>
        <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 60px 80px 70px", gap: "0 12px" }}>
          {["#", "Food", "Times", "Total kcal", "Protein"].map((h) => (
            <div key={h} style={{ fontSize: 10.5, fontWeight: 600, color: "var(--chew-text-3)", paddingBottom: 8, borderBottom: "1px solid var(--chew-hairline)" }}>{h}</div>
          ))}
          {reportsData.topFoods.map((f) => (
            <React.Fragment key={f.rank}>
              <div className="mono" style={{ fontSize: 12, color: "var(--chew-text-3)", padding: "8px 0" }}>{f.rank}</div>
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--chew-text)", padding: "8px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--chew-text-2)", padding: "8px 0", textAlign: "right" }}>{f.count}×</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--chew-text-2)", padding: "8px 0", textAlign: "right" }}>{f.kcal.toLocaleString()}</div>
              <div className="mono" style={{ fontSize: 12, color: "var(--chew-text-2)", padding: "8px 0", textAlign: "right" }}>{f.p}g</div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Key insights */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--chew-text-3)", marginBottom: 12 }}>Key insights</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {reportsData.insights.map((ins, i) => {
            const styles = { good: { bg: "var(--chew-green-50)", color: "var(--chew-green)", ico: "✓" }, warning: { bg: "var(--chew-orange-50)", color: "var(--chew-orange)", ico: "!" }, info: { bg: "var(--chew-blue-50)", color: "var(--chew-blue)", ico: "i" } }[ins.tone];
            return (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: styles.bg, color: styles.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{styles.ico}</div>
                <span style={{ fontSize: 13, color: "var(--chew-text-2)", lineHeight: 1.5 }}>{ins.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ fontSize: 11, color: "var(--chew-text-4)", lineHeight: 1.5, borderTop: "1px solid var(--chew-hairline)", paddingTop: 14 }}>
        Report generated by Chewlytics · Nutritional information is estimated from your logged entries. Share with your physician or coach as needed.
      </div>
    </div>
  );
}

function RecentExports() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-green-50)", color: "var(--chew-green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Download size={13} strokeWidth={2} />
          </div>
          <div className="card-title">Recent exports</div>
        </div>
        <button onClick={() => toast.info("Opening exports history…")} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>
          See all <ChevronRight size={11} strokeWidth={2.4} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {reportsData.recentExports.map((e, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ padding: "3px 8px", borderRadius: 6, background: e.format === "PDF" ? "var(--chew-red-50)" : "var(--chew-teal-50)", color: e.format === "PDF" ? "var(--chew-red)" : "var(--chew-teal)", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{e.format}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.name}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{e.size} · {e.when}</div>
            </div>
            <button onClick={() => toast.info(`Re-downloading ${e.name}…`)} style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--chew-text-2)" }}>
              <Download size={13} strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduledReports() {
  const [items, setItems] = useState(reportsData.scheduled);
  const toggle = (idx: number) => {
    const was = items[idx].on;
    setItems((arr) => arr.map((it, i) => i === idx ? { ...it, on: !it.on } : it));
    toast.info(was ? "Schedule paused" : "Schedule resumed");
  };

  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-purple-50)", color: "var(--chew-purple)", display: "flex", alignItems: "center", justifyContent: "center" }}>📅</div>
          <div className="card-title">Scheduled</div>
        </div>
        <button style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>Manage →</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)", marginBottom: 2 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{s.freq}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>Next: <b>{s.next}</b></div>
            </div>
            <button
              onClick={() => toggle(i)}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                background: s.on ? "var(--chew-green)" : "var(--chew-hairline-strong)",
                position: "relative",
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                transition: "background 0.2s ease",
              }}
            >
              <span style={{
                position: "absolute",
                top: 3,
                left: s.on ? 23 : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "white",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transition: "left 0.2s ease",
              }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShareWithProvider() {
  return (
    <div className="chew-card chew-card-pad" style={{ background: "linear-gradient(135deg, var(--chew-green-50), #fff)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 11, background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>🩺</div>
        <div>
          <div className="card-title">Share with provider</div>
          <div style={{ fontSize: 11.5, color: "var(--chew-text-3)" }}>Send a secure link to your doctor or coach</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="provider@email.com" style={{ flex: 1, padding: "8px 12px", borderRadius: 9, border: "1px solid var(--chew-hairline)", background: "white", fontSize: 13, color: "var(--chew-text)", outline: "none", fontFamily: "inherit" }} />
        <button onClick={() => toast.success("Secure link sent!")} style={{ padding: "8px 14px", borderRadius: 9, background: "var(--chew-green)", color: "white", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
          Send link
        </button>
      </div>
    </div>
  );
}

function ExportRaw() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-teal-50)", color: "var(--chew-teal)", display: "flex", alignItems: "center", justifyContent: "center" }}>📊</div>
        <div className="card-title">Export raw data</div>
      </div>
      <p style={{ fontSize: 12.5, color: "var(--chew-text-3)", lineHeight: 1.5, margin: "0 0 12px" }}>
        Download your logged data for any period. Compatible with spreadsheets and most health platforms.
      </p>
      <div style={{ display: "flex", gap: 8 }}>
        {["📊 CSV", "JSON", "📄 PDF"].map((label) => (
          <button
            key={label}
            onClick={() => toast.info(`Building ${label.replace(/[^\w]/g, "").trim()}…`)}
            style={{ flex: 1, padding: "8px 0", borderRadius: 9, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 12, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [active, setActive] = useState("nutrition");

  return (
    <div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
      <TopNav />
      <div style={PAGE_PAD} className="fade-in">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--chew-text)", margin: 0, letterSpacing: "-0.025em" }}>Reports</h1>
            <p style={{ fontSize: 13.5, color: "var(--chew-text-3)", margin: "4px 0 0" }}>
              Generate, schedule, and share summaries of your nutrition, activity, and body trends.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            <DayNav date="May 13 – May 20, 2026" sub="Past 7 days" todayLabel="This week" />
            <button onClick={() => toast.info("Generating new report…")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 14px", borderRadius: 10, background: "var(--chew-green)", color: "white", fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer" }}>
              <Plus size={13} strokeWidth={2.4} /> New report
            </button>
          </div>
        </div>

        {/* Category strip */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {reportsData.reportTypes.map((rt) => (
            <button
              key={rt.key}
              onClick={() => setActive(rt.key)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
                padding: 14,
                borderRadius: 14,
                border: `1px solid ${active === rt.key ? rt.color : "var(--chew-hairline)"}`,
                background: active === rt.key ? `${rt.color}0f` : "var(--chew-surface)",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 11, background: rt.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {REPORT_ICONS[rt.key]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--chew-text)", marginBottom: 2 }}>{rt.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--chew-text-3)", lineHeight: 1.4 }}>{rt.desc}</div>
                <div style={{ fontSize: 10.5, color: "var(--chew-text-4)", marginTop: 4 }}>{rt.lastGen}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div>
            {/* Action bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--chew-surface)", border: "1px solid var(--chew-hairline)", borderRadius: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: "var(--chew-text-2)" }}>
                <b>Past 7 days</b>
                <span style={{ margin: "0 8px", color: "var(--chew-text-4)" }}>·</span>
                {reportsData.period}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toast.info("Printing…")} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 12.5, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}>🖨 Print</button>
                <button onClick={() => toast.info("Copying share link…")} style={{ padding: "7px 12px", borderRadius: 8, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 12.5, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}>🔗 Share</button>
                <button onClick={() => toast.info("Downloading PDF…")} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, background: "var(--chew-green)", color: "white", fontSize: 12.5, fontWeight: 700, border: "none", cursor: "pointer" }}>
                  <Download size={13} strokeWidth={2.4} /> Download PDF
                </button>
              </div>
            </div>
            <ReportPreview active={active} />
          </div>

          {/* Right rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <RecentExports />
            <ScheduledReports />
            <ShareWithProvider />
            <ExportRaw />
          </div>
        </div>
      </div>
    </div>
  );
}
