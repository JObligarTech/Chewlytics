"use client";

import { useState } from "react";
import { Settings, Flame, Dumbbell, Droplets, Footprints, Target, Sun, Zap } from "lucide-react";
import { ProgressRing } from "@/components/charts/ProgressRing";
import { chewData } from "@/lib/data";

interface GoalRow {
  name: string;
  val: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  pct: number;
}

interface BaselineRow {
  name: string;
  val: string | number;
  unit: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

const IconBox = ({ icon: Icon, color, bg }: { icon: React.ElementType; color: string; bg: string }) => (
  <div
    style={{
      width: 26,
      height: 26,
      borderRadius: 7,
      background: bg,
      color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    <Icon size={13} strokeWidth={2} />
  </div>
);

export function Sidebar({ water, setWater }: { water: number; setWater: (v: number) => void }) {
  const data = chewData;

  const goalRows: GoalRow[] = [
    { name: "Calories", val: `${data.goals.calories.current.toLocaleString()} / ${data.goals.calories.goal.toLocaleString()} kcal`, icon: Flame, color: "var(--chew-green)", bg: "var(--chew-green-50)", pct: 76 },
    { name: "Protein", val: `${data.goals.protein.current} / ${data.goals.protein.goal} g`, icon: Zap, color: "var(--chew-purple)", bg: "var(--chew-purple-50)", pct: 83 },
    { name: "Exercise", val: `${data.goals.exercise.current} / ${data.goals.exercise.goal} min`, icon: Dumbbell, color: "var(--chew-orange)", bg: "var(--chew-orange-50)", pct: 78 },
    { name: "Water", val: `${water} / ${data.goals.water.goal} cups`, icon: Droplets, color: "var(--chew-blue)", bg: "var(--chew-blue-50)", pct: Math.round((water / data.goals.water.goal) * 100) },
    { name: "Steps", val: `${data.goals.steps.current.toLocaleString()} / ${data.goals.steps.goal.toLocaleString()}`, icon: Footprints, color: "var(--chew-teal)", bg: "var(--chew-teal-50)", pct: 78 },
  ];

  const baselineRows: BaselineRow[] = [
    { name: "Goal Weight", val: data.baseline.goalWeight.val, unit: data.baseline.goalWeight.unit, icon: Target, color: "var(--chew-green)", bg: "var(--chew-green-50)" },
    { name: "Starting Weight", val: data.baseline.startWeight.val, unit: data.baseline.startWeight.unit, icon: Dumbbell, color: "var(--chew-text-2)", bg: "#f1f3f3" },
    { name: "Daily Calorie Goal", val: data.baseline.dailyCal.val.toLocaleString(), unit: data.baseline.dailyCal.unit, icon: Sun, color: "var(--chew-orange)", bg: "var(--chew-orange-50)" },
    { name: "Protein Goal", val: data.baseline.proteinGoal.val, unit: data.baseline.proteinGoal.unit, icon: Zap, color: "var(--chew-purple)", bg: "var(--chew-purple-50)" },
    { name: "Water Goal", val: data.baseline.waterGoal.val, unit: data.baseline.waterGoal.unit, icon: Droplets, color: "var(--chew-blue)", bg: "var(--chew-blue-50)" },
    { name: "Step Goal", val: data.baseline.stepGoal.val, unit: "", icon: Footprints, color: "var(--chew-teal)", bg: "var(--chew-teal-50)" },
  ];

  return (
    <aside
      style={{
        width: 260,
        minWidth: 260,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignSelf: "flex-start",
        position: "sticky",
        top: 80,
      }}
    >
      {/* Profile card */}
      <div className="chew-card chew-card-pad">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "linear-gradient(135deg, var(--chew-green), var(--chew-teal))",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 15,
              flexShrink: 0,
            }}
          >
            {data.user.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--chew-text)" }}>{data.user.name}</div>
            <div style={{ fontSize: 12, color: "var(--chew-green-600)", fontWeight: 600, cursor: "pointer" }}>
              View profile
            </div>
          </div>
          <button
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: "1px solid var(--chew-hairline)",
              background: "var(--chew-surface-2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--chew-text-3)",
            }}
          >
            <Settings size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="chew-card chew-card-pad">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div className="card-title">Daily Goals</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", cursor: "pointer" }}>Edit</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <ProgressRing pct={data.goals.overall} size={120} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {goalRows.map((r) => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconBox icon={r.icon} color={r.color} bg={r.bg} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 11.5, color: "var(--chew-text-2)", fontWeight: 500 }}>{r.name}</span>
                  <span className="mono" style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>
                    <b style={{ color: "var(--chew-text)" }}>{r.val.split(" / ")[0]}</b>
                    {" / "}{r.val.split(" / ")[1]}
                  </span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${Math.min(r.pct, 100)}%`, background: r.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Baseline */}
      <div className="chew-card chew-card-pad">
        <div className="card-title" style={{ marginBottom: 12 }}>My Baseline</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {baselineRows.map((r) => (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconBox icon={r.icon} color={r.color} bg={r.bg} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: "var(--chew-text-3)", fontWeight: 500 }}>{r.name}</div>
              </div>
              <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--chew-text)", textAlign: "right" }}>
                {r.val}
                {r.unit && <span className="unit"> {r.unit}</span>}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "10px 12px",
            background: "linear-gradient(135deg, var(--chew-orange-50), var(--chew-yellow-50))",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 20 }}>🔥</span>
          <div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 800, color: "var(--chew-orange)", lineHeight: 1 }}>
              {data.baseline.streakDays}-day
            </div>
            <div style={{ fontSize: 11, color: "var(--chew-text-2)", fontWeight: 500 }}>logging streak</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
