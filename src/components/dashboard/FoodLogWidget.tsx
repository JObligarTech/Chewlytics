"use client";

import React, { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { chewData } from "@/lib/data";
import { toast } from "sonner";
import { AddFoodModal, type PendingItem, type ModalMeal } from "@/components/shared/AddFoodModal";

type DashboardFoodItem = { name: string; detail: string; thumb: string; bg: string };
type DashboardMeal = { name: string; kcal: number; emoji: string; items: DashboardFoodItem[] };

const initialMeals: DashboardMeal[] = chewData.meals.map((m) => ({
  name: m.name,
  kcal: m.kcal,
  emoji: m.emoji,
  items: m.items as DashboardFoodItem[],
}));

const mealsForModal: ModalMeal[] = chewData.meals.map((m) => ({
  key: m.name.toLowerCase(),
  name: m.name,
  emoji: m.emoji,
}));

export function FoodLogWidget() {
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [meals, setMeals] = useState<DashboardMeal[]>(initialMeals);
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultMealKey, setDefaultMealKey] = useState<string | undefined>();

  const toggle = (name: string) => {
    setCollapsed((c) => (c.includes(name) ? c.filter((n) => n !== name) : [...c, name]));
  };

  const openModal = (mealKey?: string) => {
    setDefaultMealKey(mealKey);
    setModalOpen(true);
  };

  const handleAdd = (items: PendingItem[], mealKey: string) => {
    setMeals((ms) =>
      ms.map((m) => {
        if (m.name.toLowerCase() !== mealKey) return m;
        const newItems = items.flatMap(({ item, qty }) =>
          Array.from({ length: qty }, () => ({
            name: item.name,
            detail: `${item.kcal} kcal · ${item.p}g protein`,
            thumb: item.thumb,
            bg: item.bg,
          }))
        );
        const addedKcal = items.reduce((s, { item, qty }) => s + item.kcal * qty, 0);
        return { ...m, kcal: m.kcal + addedKcal, items: [...m.items, ...newItems] };
      })
    );
    const totalQty = items.reduce((s, x) => s + x.qty, 0);
    const mealName = mealsForModal.find((m) => m.key === mealKey)?.name ?? mealKey;
    toast.success(`Added ${totalQty} item${totalQty !== 1 ? "s" : ""} to ${mealName}`);
  };

  return (
    <div className="chew-card chew-card-pad" style={{ flex: 1 }}>
      <AddFoodModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        meals={mealsForModal}
        defaultMealKey={defaultMealKey}
        onAdd={handleAdd}
      />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="card-title">Today&apos;s Food Log</div>
        <button
          onClick={() => openModal()}
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

      {meals.map((m) => {
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
            {!isCollapsed && (
              <div style={{ maxHeight: 230, overflowY: "auto" }}>
              {m.items.map((item, i) => (
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
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{item.detail}</div>
                  </div>
                  <button style={{ color: "var(--chew-text-4)", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
                    <MoreHorizontal size={15} />
                  </button>
                </div>
              ))}
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={() => openModal(m.name.toLowerCase())}
                style={{
                  width: "100%",
                  marginTop: 6,
                  padding: "7px 0",
                  borderRadius: 8,
                  border: "1px dashed var(--chew-hairline-strong)",
                  background: "transparent",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--chew-green-600)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <Plus size={12} strokeWidth={2.4} /> Add to {m.name.toLowerCase()}
              </button>
            )}
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
