"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { chewData } from "@/lib/data";

export function NutritionBreakdown() {
  const data = chewData.nutrition;
  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="card-title">Nutrition Breakdown</div>
        <button style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>
          See details <ChevronRight size={12} strokeWidth={2.4} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: "8px 10px", alignItems: "center" }}>
        <div />
        <div />
        <div style={{ fontSize: 10, color: "var(--chew-text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Consumed</div>
        <div style={{ fontSize: 10, color: "var(--chew-text-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Goal</div>
        <div />
        {data.map((n) => (
          <React.Fragment key={n.name}>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--chew-text-2)", whiteSpace: "nowrap" }}>{n.name}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${Math.min(n.pct, 100)}%`, background: n.color }} />
            </div>
            <div className="mono" style={{ fontSize: 11.5, color: "var(--chew-text-2)", textAlign: "right", whiteSpace: "nowrap" }}>{n.consumed}</div>
            <div style={{ fontSize: 11, color: "var(--chew-text-3)", whiteSpace: "nowrap" }}>{n.goal}</div>
            <div className="mono" style={{ fontSize: 11.5, fontWeight: 700, color: n.color, textAlign: "right", whiteSpace: "nowrap" }}>{n.pct}%</div>
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 10.5, color: "var(--chew-text-4)", fontWeight: 500 }}>% of daily goal</div>
    </div>
  );
}
