"use client";

import { Plus, MoreHorizontal } from "lucide-react";

interface FoodItem {
  name: string;
  brand: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  thumb: string;
  bg: string;
}

interface Meal {
  key: string;
  name: string;
  emoji: string;
  time: string | null;
  kcal: number;
  macros: { p: number; c: number; f: number };
  items: FoodItem[];
  empty?: boolean;
  suggested?: string[];
}

interface MealCardProps {
  meal: Meal;
  onAddFood: () => void;
  onRemoveItem: (mealKey: string, idx: number) => void;
}

export function MealCard({ meal, onAddFood, onRemoveItem }: MealCardProps) {
  if (meal.empty) {
    return (
      <div className="chew-card" style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 22 }}>{meal.emoji}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{meal.name}</div>
            <div style={{ fontSize: 12, color: "var(--chew-text-3)" }}>Not logged yet</div>
          </div>
          <div className="mono" style={{ marginLeft: "auto", color: "var(--chew-text-4)", fontWeight: 600 }}>—</div>
        </div>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 14, color: "var(--chew-text-3)", marginBottom: 14 }}>
            Log your dinner or pick from suggestions below.
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            {meal.suggested?.map((s) => (
              <button
                key={s}
                onClick={onAddFood}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px dashed var(--chew-green)",
                  background: "var(--chew-green-50)",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "var(--chew-green-600)",
                  cursor: "pointer",
                }}
              >
                <Plus size={11} strokeWidth={2.4} /> {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const macroSum = meal.macros.p + meal.macros.c + meal.macros.f || 1;

  return (
    <div className="chew-card" style={{ padding: 18 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: 22 }}>{meal.emoji}</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{meal.name}</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)" }}>{meal.time}</div>
        </div>
        <div className="mono" style={{ marginLeft: "auto", fontSize: 15, fontWeight: 700, color: "var(--chew-text)" }}>
          {meal.kcal} <span style={{ fontSize: 11, color: "var(--chew-text-3)", fontWeight: 500 }}>kcal</span>
        </div>
      </div>

      {/* Macro bar */}
      <div style={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", marginBottom: 8 }}>
        <div style={{ width: `${(meal.macros.p / macroSum) * 100}%`, background: "var(--chew-purple)" }} />
        <div style={{ width: `${(meal.macros.c / macroSum) * 100}%`, background: "var(--chew-teal)" }} />
        <div style={{ width: `${(meal.macros.f / macroSum) * 100}%`, background: "var(--chew-yellow)" }} />
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 14, fontSize: 11, color: "var(--chew-text-3)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <i style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--chew-purple)" }} />{meal.macros.p}g protein
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <i style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--chew-teal)" }} />{meal.macros.c}g carbs
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <i style={{ display: "inline-block", width: 8, height: 8, borderRadius: 2, background: "var(--chew-yellow)" }} />{meal.macros.f}g fat
        </span>
      </div>

      {/* Food items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
        {meal.items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
              {item.thumb}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{item.brand}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-2)", marginTop: 2 }}>
                <span className="mono"><b>{item.kcal}</b> kcal</span>
                <span style={{ margin: "0 4px", color: "var(--chew-text-4)" }}>·</span>
                <span className="mono"><b>{item.p}</b>g P</span>
                <span style={{ margin: "0 4px", color: "var(--chew-text-4)" }}>·</span>
                <span className="mono"><b>{item.c}</b>g C</span>
                <span style={{ margin: "0 4px", color: "var(--chew-text-4)" }}>·</span>
                <span className="mono"><b>{item.f}</b>g F</span>
              </div>
            </div>
            <button
              onClick={() => onRemoveItem(meal.key, i)}
              style={{ color: "var(--chew-text-4)", background: "none", border: "none", cursor: "pointer", padding: 4 }}
            >
              <MoreHorizontal size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={onAddFood}
        style={{
          width: "100%",
          padding: "9px 0",
          borderRadius: 9,
          border: "1px dashed var(--chew-hairline-strong)",
          background: "transparent",
          fontSize: 12.5,
          fontWeight: 600,
          color: "var(--chew-green-600)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Plus size={13} strokeWidth={2.4} /> Add food to {meal.name.toLowerCase()}
      </button>
    </div>
  );
}
