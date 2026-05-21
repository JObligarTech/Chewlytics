"use client";

import { useState } from "react";
import { Plus, Flame, Zap, Droplets, TrendingUp, Leaf } from "lucide-react";
import { toast } from "sonner";
import { TopNav } from "@/components/layout/TopNav";
import { DayNav } from "@/components/layout/DayNav";
import { MacroStatCard } from "@/components/food-log/MacroStatCard";
import { MealCard } from "@/components/food-log/MealCard";
import { QuickAddCard, FrequentlyLogged, DailyInsight } from "@/components/food-log/QuickAddCard";
import { foodLogData } from "@/lib/data";

const PAGE_PAD = { maxWidth: 1440, margin: "0 auto", padding: "24px 24px 40px" };

export default function FoodLogPage() {
  type MealItem = { name: string; brand: string; kcal: number; p: number; c: number; f: number; thumb: string; bg: string };
  type Meal = { key: string; name: string; emoji: string; time: string | null; kcal: number; macros: { p: number; c: number; f: number }; items: MealItem[]; empty?: boolean; suggested?: string[] };
  const [meals, setMeals] = useState<Meal[]>(foodLogData.meals as Meal[]);

  const handleRemoveItem = (mealKey: string, idx: number) => {
    setMeals((ms) =>
      ms.map((m) => {
        if (m.key !== mealKey) return m;
        const items = m.items.filter((_, i) => i !== idx);
        const kcal = items.reduce((s, x) => s + x.kcal, 0);
        const p = items.reduce((s, x) => s + x.p, 0);
        const c = items.reduce((s, x) => s + x.c, 0);
        const f = items.reduce((s, x) => s + x.f, 0);
        return { ...m, items, kcal, macros: { p, c, f } };
      })
    );
    toast.success("Item removed");
  };

  const handleAdd = (item: { name: string; kcal: number }) => {
    toast.success(`Added ${item.name} to your log`);
  };

  const totals = foodLogData.totals;

  return (
    <div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
      <TopNav />
      <div style={PAGE_PAD} className="fade-in">
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--chew-text)", margin: 0, letterSpacing: "-0.025em" }}>Food Log</h1>
            <p style={{ fontSize: 13.5, color: "var(--chew-text-3)", margin: "4px 0 0", fontWeight: 500 }}>
              Track every meal, snack, and bite. Calories logged update your dashboard in real-time.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <DayNav />
            <button
              onClick={() => toast.info("Opening food search…")}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 16px", borderRadius: 10,
                background: "var(--chew-green)", color: "white",
                fontSize: 13.5, fontWeight: 700, border: "none", cursor: "pointer",
                boxShadow: "0 2px 8px -2px rgba(34,181,115,0.4)",
              }}
            >
              <Plus size={14} strokeWidth={2.4} /> Add Food
            </button>
          </div>
        </div>

        {/* Macro stats strip */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <MacroStatCard label="Calories" icon={Flame} value={totals.calories.v} goal={totals.calories.goal} unit="kcal" color="#22b573" />
          <MacroStatCard label="Protein" icon={Zap} value={totals.protein.v} goal={totals.protein.goal} unit="g" color="#7c5cff" />
          <MacroStatCard label="Carbs" icon={Leaf} value={totals.carbs.v} goal={totals.carbs.goal} unit="g" color="#16b3ad" />
          <MacroStatCard label="Fat" icon={Droplets} value={totals.fat.v} goal={totals.fat.goal} unit="g" color="#f5b942" />
          <MacroStatCard label="Fiber" icon={TrendingUp} value={totals.fiber.v} goal={totals.fiber.goal} unit="g" color="#5fc46e" />
        </div>

        {/* Two-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>
          {/* Meal cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {meals.map((m) => (
              <MealCard
                key={m.key}
                meal={m}
                onAddFood={() => toast.info(`Opening search for ${m.name.toLowerCase()}…`)}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>

          {/* Right rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <QuickAddCard onAdd={handleAdd} />
            <FrequentlyLogged onAdd={handleAdd} />
            <DailyInsight />
          </div>
        </div>
      </div>
    </div>
  );
}
