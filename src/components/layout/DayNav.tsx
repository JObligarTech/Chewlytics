"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface DayNavProps {
  date?: string;
  sub?: string;
  todayLabel?: string;
}

export function DayNav({ date = "Today, May 20", sub = "Wednesday", todayLabel = "Today" }: DayNavProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          border: "1px solid var(--chew-hairline)",
          background: "var(--chew-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--chew-text-2)",
        }}
      >
        <ChevronLeft size={14} strokeWidth={2.4} />
      </button>
      <div style={{ textAlign: "center", minWidth: 140 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--chew-text)", lineHeight: 1.2 }}>{date}</div>
        <div style={{ fontSize: 11, color: "var(--chew-text-3)", lineHeight: 1 }}>{sub}</div>
      </div>
      <button
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          border: "1px solid var(--chew-hairline)",
          background: "var(--chew-surface)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--chew-text-2)",
        }}
      >
        <ChevronRight size={14} strokeWidth={2.4} />
      </button>
      <button
        style={{
          padding: "5px 10px",
          borderRadius: 8,
          border: "1px solid var(--chew-hairline)",
          background: "var(--chew-surface)",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--chew-green-600)",
          cursor: "pointer",
        }}
      >
        {todayLabel}
      </button>
    </div>
  );
}
