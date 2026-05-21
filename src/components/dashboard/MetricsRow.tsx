"use client";

import { Flame, Zap, Dumbbell } from "lucide-react";
import { Sparkline } from "@/components/charts/Sparkline";
import { chewData } from "@/lib/data";
import { ArrowDown } from "lucide-react";

function MetricCard({
  icon: Icon,
  name,
  value,
  unit,
  sub,
  pct,
  color,
  blobColor,
  accentBg,
  weightSpark,
}: {
  icon: React.ElementType;
  name: string;
  value: string | number;
  unit: string;
  sub?: string;
  pct?: number;
  color: string;
  blobColor: string;
  accentBg: string;
  weightSpark?: React.ReactNode;
}) {
  return (
    <div
      className="chew-card"
      style={{ padding: 18, flex: 1, minWidth: 0, position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: blobColor,
          opacity: 0.5,
        }}
      />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: accentBg,
              color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={16} strokeWidth={2} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-text-2)" }}>{name}</span>
        </div>
        <div
          className="mono"
          style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--chew-text)", lineHeight: 1, marginBottom: 6 }}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
          <span className="unit">{unit}</span>
        </div>
        {weightSpark ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: "var(--chew-green)", fontWeight: 600, marginBottom: 6 }}>
              <ArrowDown size={11} strokeWidth={2.4} />
              0.6 lbs vs yesterday
            </div>
            {weightSpark}
          </>
        ) : (
          <>
            <div style={{ fontSize: 11.5, color: "var(--chew-text-3)", marginBottom: 6 }}>{sub}</div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${Math.min(pct ?? 0, 100)}%`, background: color }} />
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 600, color, marginTop: 5 }}>{pct}% of goal</div>
          </>
        )}
      </div>
    </div>
  );
}

export function MetricsRow() {
  const d = chewData;
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <MetricCard icon={Flame} name="Calories" value={d.goals.calories.current.toLocaleString()} unit="kcal" sub={`of ${d.goals.calories.goal.toLocaleString()} kcal`} pct={76} color="var(--chew-green)" accentBg="var(--chew-green-50)" blobColor="var(--chew-green-100)" />
      <MetricCard icon={Zap} name="Protein" value={d.goals.protein.current} unit="g" sub={`of ${d.goals.protein.goal} g`} pct={83} color="var(--chew-purple)" accentBg="var(--chew-purple-50)" blobColor="#d9cfff" />
      <MetricCard
        icon={Dumbbell}
        name="Weight"
        value={d.weight.current}
        unit="lbs"
        color="var(--chew-teal)"
        accentBg="var(--chew-teal-50)"
        blobColor="#bfeae8"
        weightSpark={
          <div style={{ marginTop: 4 }}>
            <Sparkline data={d.weight.series.slice(-7)} color="#16b3ad" height={60} />
          </div>
        }
      />
      <MetricCard icon={Dumbbell} name="Exercise" value={d.goals.exercise.current} unit="min" sub={`of ${d.goals.exercise.goal} min`} pct={78} color="var(--chew-orange)" accentBg="var(--chew-orange-50)" blobColor="#ffd5be" />
    </div>
  );
}
