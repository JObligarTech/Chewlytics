"use client";

interface ProgressRingProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
  showLabel?: boolean;
  label?: string;
  centerContent?: React.ReactNode;
}

export function ProgressRing({
  pct,
  size = 132,
  stroke = 11,
  color = "var(--chew-green)",
  showLabel = true,
  label = "of daily goals",
  centerContent,
}: ProgressRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(pct, 100) / 100) * c;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)", display: "block" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#eef1f0"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.2,0.7,0.2,1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        {centerContent ?? (
          showLabel && (
            <div>
              <div
                className="mono"
                style={{ fontSize: size * 0.19, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--chew-text)", lineHeight: 1 }}
              >
                {pct}%
              </div>
              <div style={{ fontSize: 10, color: "var(--chew-text-3)", fontWeight: 500, marginTop: 2 }}>
                {label}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
