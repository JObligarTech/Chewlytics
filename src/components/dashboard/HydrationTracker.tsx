"use client";

import { Droplets } from "lucide-react";

interface HydrationTrackerProps {
  water: number;
  goal: number;
  setWater: (v: number) => void;
}

export function HydrationTracker({ water, goal, setWater }: HydrationTrackerProps) {
  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: "var(--chew-blue-50)", color: "var(--chew-blue)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Droplets size={16} strokeWidth={2} />
        </div>
        <div className="card-title">Hydration Tracker</div>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--chew-text-3)" }}>tap to log</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
        <div className="mono" style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em" }}>{water}</div>
        <div style={{ color: "var(--chew-text-3)", fontSize: 13 }}>of {goal} cups</div>
        <div style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "var(--chew-blue)" }}>
          {Math.round((water / goal) * 100)}% of goal
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {Array.from({ length: goal }).map((_, i) => {
          const filled = i < water;
          return (
            <button
              key={i}
              onClick={() => setWater(filled ? i : i + 1)}
              title={filled ? "Tap to unfill" : "Tap to log"}
              style={{
                flex: 1,
                height: 52,
                borderRadius: 11,
                border: `1px solid ${filled ? "transparent" : "var(--chew-hairline)"}`,
                background: filled ? "linear-gradient(180deg, #6cb2ff, #2f8af6)" : "var(--chew-surface-2)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: filled ? "white" : "var(--chew-text-4)",
                transition: "all 0.18s ease",
                boxShadow: filled ? "0 4px 10px -4px rgba(47,138,246,0.5)" : "none",
              }}
            >
              <Droplets size={18} strokeWidth={2} />
            </button>
          );
        })}
      </div>
      <div style={{ padding: 12, background: "var(--chew-blue-50)", borderRadius: 10, fontSize: 12, color: "#1e5ba8", lineHeight: 1.5 }}>
        <b>Tip:</b> Drink a glass with each meal to stay on track. You&apos;re{" "}
        <b>{Math.max(0, goal - water)} cup{goal - water === 1 ? "" : "s"}</b> from your goal.
      </div>
    </div>
  );
}
