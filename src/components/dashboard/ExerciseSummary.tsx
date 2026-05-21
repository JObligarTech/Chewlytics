"use client";

import { ChevronRight } from "lucide-react";
import { chewData } from "@/lib/data";
import { ProgressRing } from "@/components/charts/ProgressRing";

const workoutEmoji: Record<string, string> = {
  "Strength Training": "🏋️",
  HIIT: "🔥",
  Yoga: "🧘",
};

export function ExerciseSummary() {
  const d = chewData.exercise;
  const minPct = Math.round((d.minutes / d.minGoal) * 100);
  const size = 100, stroke = 9;

  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1 }}>
      <div className="card-title" style={{ marginBottom: 14 }}>Exercise Summary</div>
      <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16 }}>
        <ProgressRing
          pct={minPct}
          size={size}
          stroke={stroke}
          centerContent={
            <div style={{ textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: "var(--chew-text)" }}>{d.minutes}</div>
              <div style={{ fontSize: 9, color: "var(--chew-text-3)", fontWeight: 600 }}>min of {d.minGoal}</div>
            </div>
          }
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, flex: 1 }}>
          {[
            { label: "Workouts", val: d.workouts, unit: "" },
            { label: "Burned", val: d.burned.toLocaleString(), unit: "kcal" },
            { label: "Steps/day", val: d.stepsAvg.toLocaleString(), unit: "" },
            { label: "Distance", val: "5.4", unit: "mi" },
          ].map((s) => (
            <div key={s.label}>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--chew-text)" }}>
                {s.val}<span className="unit">{s.unit}</span>
              </div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {d.list.map((w) => (
          <div key={w.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>
              {workoutEmoji[w.name] ?? "💪"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w.name}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{w.meta}</div>
            </div>
            <ChevronRight size={13} strokeWidth={2} color="var(--chew-text-4)" />
          </div>
        ))}
      </div>
      <button style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>
        View all workouts →
      </button>
    </div>
  );
}
