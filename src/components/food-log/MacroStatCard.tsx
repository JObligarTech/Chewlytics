"use client";

interface MacroStatCardProps {
  label: string;
  value: number;
  goal: number;
  unit: string;
  color: string;
  icon: React.ElementType;
}

export function MacroStatCard({ label, value, goal, unit, color, icon: Icon }: MacroStatCardProps) {
  const pct = Math.min((value / goal) * 100, 100);
  return (
    <div className="chew-card" style={{ padding: 16, flex: 1, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: `${color}1a`, color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={13} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-text-2)" }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 6 }}>
        {value.toLocaleString()}
        <span style={{ fontSize: 11, fontWeight: 500, color: "var(--chew-text-3)" }}> / {goal.toLocaleString()} {unit}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color, marginTop: 4 }}>{Math.round(pct)}% of goal</div>
    </div>
  );
}
