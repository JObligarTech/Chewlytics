"use client";

import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { chewData } from "@/lib/data";
import { toast } from "sonner";

export function FoodLogWidget() {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const data = chewData.meals;

  const toggle = (name: string) => {
    setCollapsed((c) => c.includes(name) ? c.filter((n) => n !== name) : [...c, name]);
  };

  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="card-title">Today&apos;s Food Log</div>
        <button
          onClick={() => toast.info("Opening food search…")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "6px 12px",
            borderRadius: 8,
            border: "1px solid var(--chew-hairline)",
            background: "var(--chew-surface-2)",
            fontSize: 12.5,
            fontWeight: 600,
            color: "var(--chew-text-2)",
            cursor: "pointer",
          }}
        >
          <Plus size={13} strokeWidth={2.4} /> Add Food
        </button>
      </div>

      {data.map((m) => {
        const isCollapsed = collapsed.includes(m.name);
        return (
          <div key={m.name} style={{ marginBottom: 12 }}>
            <div
              onClick={() => toggle(m.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 0",
                cursor: "pointer",
                borderBottom: "1px solid var(--chew-hairline)",
              }}
            >
              <span style={{ fontSize: 16 }}>{m.emoji}</span>
              <span style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>{m.name}</span>
              <span className="mono" style={{ fontSize: 12.5, color: "var(--chew-text-2)", fontWeight: 600 }}>{m.kcal} kcal</span>
            </div>
            {!isCollapsed && m.items.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "7px 0",
                  borderBottom: i < m.items.length - 1 ? "1px solid var(--chew-hairline)" : "none",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: item.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {item.thumb}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{item.detail}</div>
                </div>
                <button style={{ color: "var(--chew-text-4)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                  <MoreHorizontal size={15} />
                </button>
              </div>
            ))}
          </div>
        );
      })}
      <div style={{ marginTop: 8, textAlign: "center" }}>
        <button
          onClick={() => {}}
          style={{ fontSize: 12.5, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}
        >
          View full food log →
        </button>
      </div>
    </div>
  );
}
