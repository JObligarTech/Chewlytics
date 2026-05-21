"use client";

import React, { useEffect, useState } from "react";
import { Search, X, Plus, Minus } from "lucide-react";
import { foodDatabase } from "@/lib/data";

export interface FoodItem {
  name: string;
  brand: string;
  kcal: number;
  p: number;
  c: number;
  f: number;
  thumb: string;
  bg: string;
}

export interface ModalMeal {
  key: string;
  name: string;
  emoji: string;
}

export type PendingItem = { item: FoodItem; qty: number };

interface AddFoodModalProps {
  open: boolean;
  onClose: () => void;
  meals: ModalMeal[];
  defaultMealKey?: string;
  onAdd: (items: PendingItem[], mealKey: string) => void;
}

export function AddFoodModal({ open, onClose, meals, defaultMealKey, onAdd }: AddFoodModalProps) {
  const [query, setQuery] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(defaultMealKey ?? meals[0]?.key ?? "");
  const [pending, setPending] = useState<PendingItem[]>([]);

  useEffect(() => {
    if (defaultMealKey) setSelectedMeal(defaultMealKey);
  }, [defaultMealKey, open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setPending([]);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? foodDatabase.filter((f) => f.name.toLowerCase().includes(q) || f.brand.toLowerCase().includes(q))
    : foodDatabase;

  const getPending = (name: string) => pending.find((x) => x.item.name === name);
  const totalQty = pending.reduce((s, x) => s + x.qty, 0);
  const totalKcal = pending.reduce((s, x) => s + x.item.kcal * x.qty, 0);

  const MAX_ITEMS = 20;

  const increment = (item: FoodItem) => {
    if (totalQty >= MAX_ITEMS) return;
    setPending((p) => {
      const existing = p.find((x) => x.item.name === item.name);
      if (existing) return p.map((x) => (x.item.name === item.name ? { ...x, qty: x.qty + 1 } : x));
      return [...p, { item, qty: 1 }];
    });
  };

  const decrement = (item: FoodItem) => {
    setPending((p) => {
      const existing = p.find((x) => x.item.name === item.name);
      if (!existing) return p;
      if (existing.qty === 1) return p.filter((x) => x.item.name !== item.name);
      return p.map((x) => (x.item.name === item.name ? { ...x, qty: x.qty - 1 } : x));
    });
  };

  const handleSubmit = () => {
    if (pending.length === 0) return;
    onAdd(pending, selectedMeal);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(13,31,28,0.45)",
          backdropFilter: "blur(2px)",
          zIndex: 1000,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(560px, 94vw)",
          maxHeight: "84vh",
          background: "var(--chew-surface)",
          borderRadius: "var(--chew-card-radius)",
          boxShadow: "var(--chew-shadow-lg)",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--chew-hairline)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--chew-text)" }}>Add Food</div>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--chew-text-3)", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <Search
              size={15}
              strokeWidth={2}
              style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--chew-text-3)", pointerEvents: "none" }}
            />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search foods, brands, restaurants…"
              style={{
                width: "100%",
                padding: "9px 12px 9px 34px",
                borderRadius: 10,
                border: "1px solid var(--chew-hairline)",
                background: "var(--chew-surface-2)",
                fontSize: 13,
                color: "var(--chew-text)",
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Meal selector */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {meals.map((m) => (
              <button
                key={m.key}
                onClick={() => setSelectedMeal(m.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "5px 10px",
                  borderRadius: 8,
                  border: selectedMeal === m.key ? "1.5px solid var(--chew-green)" : "1px solid var(--chew-hairline)",
                  background: selectedMeal === m.key ? "var(--chew-green-50)" : "var(--chew-surface-2)",
                  color: selectedMeal === m.key ? "var(--chew-green-600)" : "var(--chew-text-2)",
                  fontSize: 12.5,
                  fontWeight: selectedMeal === m.key ? 700 : 500,
                  cursor: "pointer",
                }}
              >
                <span>{m.emoji}</span> {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results — scrollable */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--chew-text-3)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {q ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "Frequently added"}
          </div>

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--chew-text-3)", fontSize: 13 }}>
              No foods found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {results.map((item) => {
                const p = getPending(item.name);
                return (
                  <div
                    key={item.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 10px",
                      borderRadius: 10,
                      border: p ? "1.5px solid var(--chew-green)" : "1px solid var(--chew-hairline)",
                      background: p ? "var(--chew-green-50)" : "var(--chew-surface-2)",
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        background: item.bg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        flexShrink: 0,
                      }}
                    >
                      {item.thumb}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name}
                      </div>
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

                    {/* Stepper or add button */}
                    {p ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        <button
                          onClick={() => decrement(item)}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            border: "1.5px solid var(--chew-green)",
                            background: "white",
                            color: "var(--chew-green-600)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Minus size={12} strokeWidth={2.4} />
                        </button>
                        <span className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--chew-green-600)", minWidth: 16, textAlign: "center" }}>
                          {p.qty}
                        </span>
                        <button
                          onClick={() => increment(item)}
                          disabled={totalQty >= MAX_ITEMS}
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background: totalQty >= MAX_ITEMS ? "var(--chew-hairline)" : "var(--chew-green)",
                            color: totalQty >= MAX_ITEMS ? "var(--chew-text-4)" : "white",
                            border: "none",
                            cursor: totalQty >= MAX_ITEMS ? "not-allowed" : "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Plus size={12} strokeWidth={2.4} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => increment(item)}
                        disabled={totalQty >= MAX_ITEMS}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: totalQty >= MAX_ITEMS ? "var(--chew-hairline)" : "var(--chew-green)",
                          color: totalQty >= MAX_ITEMS ? "var(--chew-text-4)" : "white",
                          border: "none",
                          cursor: totalQty >= MAX_ITEMS ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Plus size={14} strokeWidth={2.4} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer — only shown when something is selected */}
        {pending.length > 0 && (
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid var(--chew-hairline)",
              background: "var(--chew-surface)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ flex: 1, display: "flex", gap: 6, flexWrap: "wrap", minWidth: 0 }}>
              {pending.map(({ item, qty }) => (
                <span
                  key={item.name}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "3px 8px",
                    borderRadius: 6,
                    background: "var(--chew-green-50)",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: "var(--chew-green-600)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.thumb} {item.name}{qty > 1 ? <span className="mono"> ×{qty}</span> : ""}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
              {totalQty >= MAX_ITEMS && (
                <span style={{ fontSize: 11, color: "var(--chew-orange)", fontWeight: 600 }}>
                  20-item limit reached — log this batch first
                </span>
              )}
              <button
                onClick={handleSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "9px 16px",
                  borderRadius: 10,
                  background: "var(--chew-green)",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px -2px rgba(34,181,115,0.4)",
                }}
              >
                Log <span className="mono" style={{ fontWeight: 800 }}>{totalQty}</span> food{totalQty !== 1 ? "s" : ""}
                <span style={{ opacity: 0.75, fontSize: 11, fontWeight: 500 }}>· {totalKcal} kcal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
