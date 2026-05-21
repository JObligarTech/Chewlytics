"use client";

import { useState } from "react";
import { Search, Plus, Zap, ChevronRight } from "lucide-react";
import { foodLogData } from "@/lib/data";

interface QuickAddCardProps {
  onAdd: (item: { name: string; kcal: number }) => void;
}

export function QuickAddCard({ onAdd }: QuickAddCardProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-green-50)", color: "var(--chew-green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Search size={14} strokeWidth={2} />
        </div>
        <div className="card-title">Add Food</div>
      </div>
      <div style={{ position: "relative", marginBottom: 12 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 500,000+ foods, brands, restaurants…"
          style={{ width: "100%", padding: "9px 38px 9px 12px", borderRadius: 10, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 13, color: "var(--chew-text)", outline: "none", fontFamily: "inherit" }}
        />
        <button style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--chew-text-3)" }}>
          <Search size={15} strokeWidth={2} />
        </button>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--chew-text-3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Recent searches</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {foodLogData.recent.map((r) => (
          <button
            key={r}
            onClick={() => setQuery(r)}
            style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 12, fontWeight: 500, color: "var(--chew-text-2)", cursor: "pointer" }}
          >
            {r}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FrequentlyLogged({ onAdd }: QuickAddCardProps) {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-orange-50)", color: "var(--chew-orange)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={14} strokeWidth={2} />
          </div>
          <div className="card-title">Frequently logged</div>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>
          See all <ChevronRight size={11} strokeWidth={2.4} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {foodLogData.quickAdd.map((q) => (
          <button
            key={q.name}
            onClick={() => onAdd(q)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, borderRadius: 10, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", cursor: "pointer", textAlign: "left" }}
          >
            <div style={{ width: 30, height: 30, borderRadius: 8, background: q.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{q.thumb}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.name}</div>
              <div className="mono" style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{q.kcal} kcal</div>
            </div>
            <Plus size={12} strokeWidth={2.6} color="var(--chew-green)" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function DailyInsight() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #d2f0df, #b6e8ce)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 14 }}>✨</span>
        </div>
        <div className="card-title">Today&apos;s Insight</div>
        <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", background: "var(--chew-purple-50)", color: "var(--chew-purple)", borderRadius: 4, padding: "2px 6px" }}>AI</span>
      </div>
      <p style={{ fontSize: 13, color: "var(--chew-text-2)", lineHeight: 1.6, margin: 0, marginBottom: 12 }}>
        Your protein intake is on track — you&apos;ve hit <strong>83%</strong> of your goal before dinner. Aim for a <strong>28g protein</strong> dinner to comfortably close the day.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { color: "var(--chew-green)", text: "On track for protein" },
          { color: "var(--chew-orange)", text: "Fiber a bit low" },
          { color: "var(--chew-green)", text: "Sodium within range" },
        ].map((h) => (
          <div key={h.text} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--chew-text-2)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: h.color, flexShrink: 0 }} />
            {h.text}
          </div>
        ))}
      </div>
    </div>
  );
}
