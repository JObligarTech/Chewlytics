"use client";

import { useState } from "react";
import { Sparkles, Search, ThumbsUp, ThumbsDown, Leaf } from "lucide-react";
import { chewData } from "@/lib/data";

export function AIFoodFinder() {
  const [query, setQuery] = useState(chewData.ai.query);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const ai = chewData.ai;

  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-green-50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Sparkles size={14} strokeWidth={2} color="var(--chew-green-600)" />
        </div>
        <div className="card-title">AI Food Finder</div>
        <span style={{ marginLeft: "auto", fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", background: "var(--chew-purple-50)", color: "var(--chew-purple)", borderRadius: 4, padding: "2px 6px" }}>BETA</span>
      </div>

      <div style={{ position: "relative", marginBottom: 14 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "9px 38px 9px 12px",
            borderRadius: 10,
            border: "1px solid var(--chew-hairline)",
            background: "var(--chew-surface-2)",
            fontSize: 13,
            color: "var(--chew-text)",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--chew-text-3)" }}>
          <Search size={15} strokeWidth={2} />
        </button>
      </div>

      <div style={{ display: "flex", gap: 14, marginBottom: 12, padding: "12px 14px", background: "var(--chew-surface-2)", borderRadius: 12 }}>
        <div style={{ width: 90, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="90" height="72" viewBox="0 0 96 78" fill="none">
            <rect x="8" y="20" width="80" height="38" rx="10" fill="#f4c987" />
            <path d="M8 32 Q22 26 36 32 T64 30 T88 34 V40 Q72 36 56 40 T28 38 T8 42 Z" fill="#e8a85a" />
            <rect x="8" y="38" width="80" height="6" fill="#a8d57a" />
            <rect x="8" y="42" width="80" height="6" fill="#f3a5a5" />
            <rect x="8" y="46" width="80" height="6" fill="#f7eac0" />
            <rect x="8" y="50" width="80" height="6" fill="#e8a85a" />
            <rect x="8" y="56" width="80" height="6" rx="6" fill="#f4c987" />
          </svg>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 14px", flex: 1 }}>
          {[
            { label: "Calories", val: ai.macros.kcal, unit: "kcal" },
            { label: "Protein", val: ai.macros.protein, unit: "g" },
            { label: "Carbs", val: ai.macros.carbs, unit: "g" },
            { label: "Sodium", val: ai.macros.sodium, unit: "mg" },
          ].map((m) => (
            <div key={m.label}>
              <div className="mono" style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }}>
                {m.val}<span className="unit">{m.unit}</span>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: "var(--chew-green-50)", borderRadius: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, color: "var(--chew-green-600)" }}>
          <span style={{ width: 8, height: 8, borderRadius: 4, background: "var(--chew-green)", display: "inline-block" }} />
          High Confidence
        </div>
        <div className="mono" style={{ fontSize: 13, fontWeight: 700, color: "var(--chew-green)" }}>{ai.confidence}%</div>
      </div>

      <div style={{ padding: "10px 12px", background: "var(--chew-surface-2)", borderRadius: 10, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, fontSize: 12.5, fontWeight: 700, color: "var(--chew-text)" }}>
          <Leaf size={13} strokeWidth={2} color="var(--chew-green-600)" />
          AI Insight
        </div>
        <div style={{ fontSize: 12, color: "var(--chew-text-2)", lineHeight: 1.5 }}>{ai.insight}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "var(--chew-text-3)" }}>
        <span>Nutritional information is estimated.</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>Helpful?</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={() => setFeedback("up")}
              style={{ padding: "4px 6px", borderRadius: 6, border: `1px solid ${feedback === "up" ? "var(--chew-green)" : "var(--chew-hairline)"}`, background: feedback === "up" ? "var(--chew-green-50)" : "transparent", color: feedback === "up" ? "var(--chew-green)" : "var(--chew-text-3)", cursor: "pointer" }}
            >
              <ThumbsUp size={12} strokeWidth={2} />
            </button>
            <button
              onClick={() => setFeedback("down")}
              style={{ padding: "4px 6px", borderRadius: 6, border: `1px solid ${feedback === "down" ? "var(--chew-red)" : "var(--chew-hairline)"}`, background: feedback === "down" ? "var(--chew-red-50)" : "transparent", color: feedback === "down" ? "var(--chew-red)" : "var(--chew-text-3)", cursor: "pointer" }}
            >
              <ThumbsDown size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
