"use client";

import { useState } from "react";
import { ChevronDown, ArrowDown } from "lucide-react";
import { chewData } from "@/lib/data";

function WeightChart({ series }: { series: number[] }) {
  const width = 380, height = 170;
  const padding = { top: 16, right: 14, bottom: 24, left: 30 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const min = Math.min(...series) - 0.4;
  const max = Math.max(...series) + 0.4;
  const rangeV = max - min;
  const step = w / (series.length - 1);
  const points = series.map((v, i) => [
    padding.left + i * step,
    padding.top + h - ((v - min) / rangeV) * h,
  ]);
  const path = points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = `${path} L${padding.left + w},${padding.top + h} L${padding.left},${padding.top + h} Z`;
  const last = points[points.length - 1];
  const xTicks = ["May 14", "May 15", "May 16", "May 17", "May 18", "May 19", "May 20"];
  const yTicks = [162, 160, 158, 156, 154];

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      <defs>
        <linearGradient id="wt-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16b3ad" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#16b3ad" stopOpacity="0" />
        </linearGradient>
      </defs>
      {yTicks.map((y, i) => {
        const yPos = padding.top + h - ((y - min) / rangeV) * h;
        if (yPos < padding.top - 1 || yPos > padding.top + h + 1) return null;
        return (
          <g key={i}>
            <line x1={padding.left} x2={padding.left + w} y1={yPos} y2={yPos} stroke="#eef1f0" strokeDasharray="3 3" />
            <text x={padding.left - 8} y={yPos + 3} fontSize="10" fill="#b8c1bf" textAnchor="end">{y}</text>
          </g>
        );
      })}
      <path d={area} fill="url(#wt-fill)" />
      <path d={path} fill="none" stroke="#16b3ad" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="white" stroke="#16b3ad" strokeWidth="1.5" />
      ))}
      <circle cx={last[0]} cy={last[1]} r="6" fill="#16b3ad" opacity="0.18" />
      <circle cx={last[0]} cy={last[1]} r="4" fill="#16b3ad" />
      {xTicks.map((t, i) => {
        const xPos = padding.left + (i / (xTicks.length - 1)) * w;
        return <text key={i} x={xPos} y={height - 6} fontSize="10" fill="#b8c1bf" textAnchor="middle">{t}</text>;
      })}
    </svg>
  );
}

export function WeightTrend() {
  const [range] = useState("7 Days");
  const data = chewData.weight;

  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div className="card-title">Weight Trend</div>
        <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "var(--chew-text-2)", background: "var(--chew-surface-2)", border: "1px solid var(--chew-hairline)", borderRadius: 8, padding: "4px 10px", cursor: "pointer" }}>
          {range} <ChevronDown size={12} strokeWidth={2} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, marginBottom: 12 }}>
        <div>
          <div className="mono" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1 }}>
            {data.current}<span className="unit">lbs</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginTop: 2 }}>7-day average</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 13, fontWeight: 700, color: "var(--chew-green)", justifyContent: "flex-end" }}>
            <ArrowDown size={12} strokeWidth={2.4} />
            {Math.abs(data.delta)} lbs
          </div>
          <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>vs last 7 days</div>
        </div>
      </div>
      <WeightChart series={data.series.slice(-7)} />
    </div>
  );
}
