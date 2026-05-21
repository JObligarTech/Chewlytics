"use client";

import { Gem, ChevronRight, X } from "lucide-react";

interface SmartRecBarProps {
  onSeeMeals: () => void;
  onClose: () => void;
}

export function SmartRecBar({ onSeeMeals, onClose }: SmartRecBarProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--chew-surface)",
        borderTop: "1px solid var(--chew-hairline)",
        boxShadow: "0 -4px 24px -8px rgba(15,31,28,0.1)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 11,
          background: "var(--chew-green-50)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Gem size={16} strokeWidth={2} color="var(--chew-green-600)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--chew-text)" }}>Smart Recommendation</span>
          <span style={{ width: 4, height: 4, borderRadius: 2, background: "var(--chew-text-4)", display: "inline-block" }} />
          <span style={{ fontSize: 11, color: "var(--chew-text-3)", fontWeight: 500 }}>Updated 2 min ago</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--chew-text-2)" }}>
          You&apos;ve got <strong>450 kcal</strong> left today. Adding{" "}
          <strong>20–25g of protein</strong> in your next meal can help you hit your goal.
        </div>
      </div>
      <button
        onClick={onSeeMeals}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "8px 14px",
          borderRadius: 9,
          border: "1px solid var(--chew-hairline)",
          background: "var(--chew-surface)",
          fontSize: 13,
          fontWeight: 600,
          color: "var(--chew-text-2)",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        See meal ideas <ChevronRight size={13} strokeWidth={2.4} />
      </button>
      <button
        onClick={onClose}
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          border: "none",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "var(--chew-text-3)",
          flexShrink: 0,
        }}
        aria-label="Dismiss"
      >
        <X size={14} strokeWidth={2.4} />
      </button>
    </div>
  );
}
