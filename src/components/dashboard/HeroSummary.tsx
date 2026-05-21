"use client";

import { Flame, Zap, Droplets, Sun } from "lucide-react";
import { chewData } from "@/lib/data";

const statDef = [
  { label: "Calories left", unit: "kcal", key: "caloriesLeft" as const, of: "24% of goal", icon: Flame, color: "var(--chew-green)" },
  { label: "Protein left", unit: "g", key: "proteinLeft" as const, of: "18% of goal", icon: Zap, color: "var(--chew-purple)" },
  { label: "Today's est. burn", unit: "kcal", key: "burnEst" as const, of: "vs 380 yesterday", icon: Flame, color: "var(--chew-orange)" },
  { label: "Water", unit: "cups", key: "waterCups" as const, of: "75% of goal", icon: Droplets, color: "var(--chew-blue)" },
];

export function HeroSummary() {
  const data = chewData.hero;

  return (
    <div
      className="chew-card"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        padding: "16px 20px",
        overflow: "hidden",
      }}
    >
      {/* Greeting */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingRight: 20,
          borderRight: "1px solid var(--chew-hairline)",
          minWidth: 180,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: "var(--chew-yellow-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sun size={18} strokeWidth={2} color="var(--chew-yellow)" />
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--chew-text)" }}>Your daily summary</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)", fontWeight: 500 }}>Good morning, Alex!</div>
        </div>
      </div>

      {/* Stats */}
      {statDef.map((s, i) => {
        const Icon = s.icon;
        const val = data[s.key];
        return (
          <div
            key={s.label}
            style={{
              flex: 1,
              paddingLeft: 20,
              paddingRight: i < statDef.length - 1 ? 20 : 0,
              borderRight: i < statDef.length - 1 ? "1px solid var(--chew-hairline)" : "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
              <Icon size={13} strokeWidth={2} color={s.color} />
              <span style={{ fontSize: 11.5, color: "var(--chew-text-3)", fontWeight: 500 }}>{s.label}</span>
            </div>
            <div
              className="mono"
              style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--chew-text)", lineHeight: 1 }}
            >
              {val.toLocaleString()}
              <span className="unit">{s.unit}</span>
            </div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600, marginTop: 2 }}>{s.of}</div>
          </div>
        );
      })}
    </div>
  );
}
