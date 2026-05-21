"use client";

import { useState } from "react";
import { toast } from "sonner";
import { HeroSummary } from "@/components/dashboard/HeroSummary";
import { MetricsRow } from "@/components/dashboard/MetricsRow";
import { NutritionBreakdown } from "@/components/dashboard/NutritionBreakdown";
import { FoodLogWidget } from "@/components/dashboard/FoodLogWidget";
import { WeightTrend } from "@/components/dashboard/WeightTrend";
import { ExerciseSummary } from "@/components/dashboard/ExerciseSummary";
import { AIFoodFinder } from "@/components/dashboard/AIFoodFinder";
import { HydrationTracker } from "@/components/dashboard/HydrationTracker";
import { Sidebar } from "@/components/layout/Sidebar";
import { SmartRecBar } from "@/components/layout/SmartRecBar";

export default function DashboardPage() {
  const [water, setWater] = useState(6);
  const [smartRecDismissed, setSmartRecDismissed] = useState(false);

  return (
    <div style={{ paddingBottom: smartRecDismissed ? 32 : 80 }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "24px 24px 0",
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
        }}
      >
        {/* Sidebar */}
        <Sidebar water={water} setWater={setWater} />

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          <HeroSummary />
          <MetricsRow />

          {/* Middle row 1 */}
          <div style={{ display: "flex", gap: 12 }}>
            <FoodLogWidget />
            <NutritionBreakdown />
          </div>

          {/* Middle row 2 */}
          <div style={{ display: "flex", gap: 12 }}>
            <WeightTrend />
            <AIFoodFinder />
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", gap: 12 }}>
            <ExerciseSummary />
            <HydrationTracker water={water} goal={8} setWater={setWater} />
          </div>
        </div>
      </div>

      {!smartRecDismissed && (
        <SmartRecBar
          onSeeMeals={() => toast.info("Generating personalized meal ideas…")}
          onClose={() => setSmartRecDismissed(true)}
        />
      )}
    </div>
  );
}
