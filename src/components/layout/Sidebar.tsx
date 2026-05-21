"use client";

import React, { useState } from "react";
import {
  Settings, Flame, Dumbbell, Droplets, Footprints, Target,
  Sun, Zap, X, Plus, Heart, Moon,
} from "lucide-react";
import { ProgressRing } from "@/components/charts/ProgressRing";
import { chewData } from "@/lib/data";
import { toast } from "sonner";

// ─── types ─────────────────────────────────────────────────────────────────────

type GoalEntry = {
  id: string;
  name: string;
  current: number;
  goal: number;
  unit: string;
  icon: React.ElementType;
  iconKey: string;
  color: string;
  colorKey: string;
  bg: string;
};

type BaselineRow = {
  name: string;
  val: string | number;
  unit: string;
  icon: React.ElementType;
  color: string;
  bg: string;
};

type NewGoalForm = {
  presetLabel: string;
  customName: string;
  goal: string;
  unit: string;
  iconKey: string;
  colorKey: string;
};

// ─── catalogs ───────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  flame: Flame, zap: Zap, dumbbell: Dumbbell, droplets: Droplets,
  footprints: Footprints, heart: Heart, moon: Moon, target: Target,
};

const COLOR_MAP: Record<string, { color: string; bg: string }> = {
  green:  { color: "var(--chew-green)",  bg: "var(--chew-green-50)"  },
  purple: { color: "var(--chew-purple)", bg: "var(--chew-purple-50)" },
  orange: { color: "var(--chew-orange)", bg: "var(--chew-orange-50)" },
  blue:   { color: "var(--chew-blue)",   bg: "var(--chew-blue-50)"   },
  teal:   { color: "var(--chew-teal)",   bg: "var(--chew-teal-50)"   },
  red:    { color: "var(--chew-red)",    bg: "var(--chew-red-50)"    },
  yellow: { color: "var(--chew-yellow)", bg: "var(--chew-yellow-50)" },
};

const COLOR_HEX: Record<string, string> = {
  green: "#22b573", purple: "#7c5cff", orange: "#ff7a45",
  blue: "#2f8af6", teal: "#16b3ad", red: "#ef4f5c", yellow: "#f5b942",
};

type GoalPreset = { label: string; unit: string; iconKey: string; colorKey: string };

const GOAL_PRESETS: GoalPreset[] = [
  { label: "Sleep",      unit: "hrs", iconKey: "moon",        colorKey: "purple" },
  { label: "Fiber",      unit: "g",   iconKey: "target",      colorKey: "green"  },
  { label: "Carbs",      unit: "g",   iconKey: "target",      colorKey: "teal"   },
  { label: "Fat",        unit: "g",   iconKey: "target",      colorKey: "yellow" },
  { label: "Sugar",      unit: "g",   iconKey: "target",      colorKey: "red"    },
  { label: "Sodium",     unit: "mg",  iconKey: "target",      colorKey: "orange" },
  { label: "Caffeine",   unit: "mg",  iconKey: "zap",         colorKey: "yellow" },
  { label: "Distance",   unit: "mi",  iconKey: "footprints",  colorKey: "teal"   },
  { label: "Heart Rate", unit: "bpm", iconKey: "heart",       colorKey: "red"    },
  { label: "Custom",     unit: "",    iconKey: "target",      colorKey: "green"  },
];

// ─── helpers ────────────────────────────────────────────────────────────────────

const IconBox = ({ icon: Icon, color, bg }: { icon: React.ElementType; color: string; bg: string }) => (
  <div style={{ width: 26, height: 26, borderRadius: 7, background: bg, color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <Icon size={13} strokeWidth={2} />
  </div>
);

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5,
};

const INPUT_STYLE: React.CSSProperties = {
  width: "100%", padding: "7px 10px",
  border: "1px solid var(--chew-hairline-strong)", borderRadius: 8,
  fontSize: 13, color: "var(--chew-text)", background: "var(--chew-surface)",
  outline: "none", boxSizing: "border-box",
};

const EMPTY_NEW: NewGoalForm = {
  presetLabel: "", customName: "", goal: "", unit: "", iconKey: "target", colorKey: "green",
};

function buildInitialGoals(water: number): GoalEntry[] {
  const d = chewData;
  return [
    { id: "calories", name: "Calories", current: d.goals.calories.current, goal: d.goals.calories.goal, unit: "kcal", icon: Flame,     iconKey: "flame",      ...COLOR_MAP.green,  colorKey: "green"  },
    { id: "protein",  name: "Protein",  current: d.goals.protein.current,  goal: d.goals.protein.goal,  unit: "g",    icon: Zap,       iconKey: "zap",        ...COLOR_MAP.purple, colorKey: "purple" },
    { id: "exercise", name: "Exercise", current: d.goals.exercise.current, goal: d.goals.exercise.goal, unit: "min",  icon: Dumbbell,  iconKey: "dumbbell",   ...COLOR_MAP.orange, colorKey: "orange" },
    { id: "water",    name: "Water",    current: water,                     goal: d.goals.water.goal,    unit: "cups", icon: Droplets,  iconKey: "droplets",   ...COLOR_MAP.blue,   colorKey: "blue"   },
    { id: "steps",    name: "Steps",    current: d.goals.steps.current,    goal: d.goals.steps.goal,    unit: "",     icon: Footprints,iconKey: "footprints", ...COLOR_MAP.teal,   colorKey: "teal"   },
  ];
}

// ─── component ──────────────────────────────────────────────────────────────────

export function Sidebar({ water }: { water: number }) {
  const data = chewData;

  const [goals, setGoals]   = useState<GoalEntry[]>(() => buildInitialGoals(water));
  const [editing, setEditing] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [newGoal, setNewGoal] = useState<NewGoalForm>(EMPTY_NEW);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    typeof window !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark"
  );
  const [units, setUnits] = useState({ weight: "lbs", volume: "cups", distance: "mi" });
  const [notifs, setNotifs] = useState({ dailyReminder: true, goalAlerts: true, weeklySummary: false });

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    try { localStorage.setItem("chew-theme", next ? "dark" : "light"); } catch { /* */ }
  };

  const effectiveName = newGoal.presetLabel === "Custom"
    ? (newGoal.customName?.trim() ?? "")
    : (newGoal.presetLabel ?? "");

  const canAdd = effectiveName.length > 0 && parseInt(newGoal.goal, 10) > 0;

  // ── edit helpers ──

  const updateGoalValue = (id: string, val: string) =>
    setGoals(g => g.map(r => r.id === id ? { ...r, goal: Math.max(0, parseInt(val, 10) || 0) } : r));

  const removeGoal = (id: string) =>
    setGoals(g => g.filter(r => r.id !== id));

  const saveEdits = () => {
    setEditing(false);
    toast.success("Daily goals updated");
  };

  // ── add helpers ──

  const selectPreset = (label: string) => {
    const preset = GOAL_PRESETS.find(p => p.label === label);
    if (!preset) { setNewGoal(EMPTY_NEW); return; }
    setNewGoal(g => ({
      ...g,
      presetLabel: label,
      customName: "",
      unit: preset.unit,
      iconKey: preset.iconKey,
      colorKey: preset.colorKey,
    }));
  };

  const closeModal = () => { setAddOpen(false); setNewGoal(EMPTY_NEW); };

  const confirmAdd = () => {
    if (!canAdd) return;
    const ico = ICON_MAP[newGoal.iconKey] ?? Target;
    const clr = COLOR_MAP[newGoal.colorKey] ?? COLOR_MAP.green;
    setGoals(g => [...g, {
      id: `custom-${Date.now()}`,
      name: effectiveName,
      current: 0,
      goal: parseInt(newGoal.goal, 10),
      unit: newGoal.unit.trim(),
      icon: ico,
      iconKey: newGoal.iconKey,
      colorKey: newGoal.colorKey,
      ...clr,
    }]);
    closeModal();
    toast.success(`${effectiveName} goal added`);
  };

  // ── derived ──

  const overallPct = goals.length
    ? Math.round(goals.reduce((s, r) => s + Math.min((r.current / (r.goal || 1)) * 100, 100), 0) / goals.length)
    : 0;

  const baselineRows: BaselineRow[] = [
    { name: "Goal Weight",        val: data.baseline.goalWeight.val,               unit: data.baseline.goalWeight.unit,  icon: Target,    color: "var(--chew-green)",  bg: "var(--chew-green-50)"  },
    { name: "Starting Weight",    val: data.baseline.startWeight.val,              unit: data.baseline.startWeight.unit, icon: Dumbbell,  color: "var(--chew-text-2)", bg: "#f1f3f3"               },
    { name: "Daily Calorie Goal", val: data.baseline.dailyCal.val.toLocaleString(),unit: data.baseline.dailyCal.unit,    icon: Sun,       color: "var(--chew-orange)", bg: "var(--chew-orange-50)" },
    { name: "Protein Goal",       val: data.baseline.proteinGoal.val,              unit: data.baseline.proteinGoal.unit, icon: Zap,       color: "var(--chew-purple)", bg: "var(--chew-purple-50)" },
    { name: "Water Goal",         val: data.baseline.waterGoal.val,               unit: data.baseline.waterGoal.unit,   icon: Droplets,  color: "var(--chew-blue)",   bg: "var(--chew-blue-50)"   },
    { name: "Step Goal",          val: data.baseline.stepGoal.val,                unit: "",                              icon: Footprints,color: "var(--chew-teal)",   bg: "var(--chew-teal-50)"   },
  ];

  return (
    <>
      <aside style={{ width: 260, minWidth: 260, display: "flex", flexDirection: "column", gap: 12, alignSelf: "flex-start", position: "sticky", top: 80 }}>

        {/* Profile card */}
        <div className="chew-card chew-card-pad">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, var(--chew-green), var(--chew-teal))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
              {data.user.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--chew-text)" }}>{data.user.name}</div>
              <div onClick={() => setProfileOpen(true)} style={{ fontSize: 12, color: "var(--chew-green-600)", fontWeight: 600, cursor: "pointer" }}>View profile</div>
            </div>
            <button onClick={() => setSettingsOpen(true)} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--chew-text-3)" }}>
              <Settings size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Daily Goals */}
        <div className="chew-card chew-card-pad">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div className="card-title">Daily Goals</div>
            {editing ? (
              <button onClick={saveEdits} style={{ fontSize: 12, fontWeight: 700, color: "var(--chew-green-600)", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
                Done
              </button>
            ) : (
              <button onClick={() => setEditing(true)} style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", cursor: "pointer", background: "none", border: "none", padding: 0 }}>
                Edit
              </button>
            )}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <ProgressRing pct={overallPct} size={120} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {goals.map((r) => {
              const pct = Math.round(Math.min((r.current / (r.goal || 1)) * 100, 100));
              return (
                <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {/* Icon — becomes a delete button in edit mode via an overlay badge */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <IconBox icon={r.icon} color={r.color} bg={r.bg} />
                    {editing && (
                      <button
                        onClick={() => removeGoal(r.id)}
                        title={`Remove ${r.name}`}
                        style={{ position: "absolute", top: -5, left: -5, width: 15, height: 15, borderRadius: 8, background: "var(--chew-red)", color: "white", border: "2px solid var(--chew-surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                      >
                        <X size={8} strokeWidth={3} />
                      </button>
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    {editing ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <span style={{ flex: 1, fontSize: 11.5, color: "var(--chew-text-2)", fontWeight: 500, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {r.name}
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={String(r.goal)}
                          onChange={e => updateGoalValue(r.id, e.target.value)}
                          className="mono"
                          style={{ width: 52, padding: "2px 5px", border: "1px solid var(--chew-hairline-strong)", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "var(--chew-text)", textAlign: "right", outline: "none", background: "var(--chew-surface-2)", flexShrink: 0 }}
                        />
                        {r.unit && (
                          <span style={{ fontSize: 10, color: "var(--chew-text-3)", flexShrink: 0 }}>{r.unit}</span>
                        )}
                      </div>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                        <span style={{ fontSize: 11.5, color: "var(--chew-text-2)", fontWeight: 500 }}>{r.name}</span>
                        <span className="mono" style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>
                          <b style={{ color: "var(--chew-text)" }}>{r.current.toLocaleString()}</b>
                          {" / "}{r.goal.toLocaleString()}{r.unit ? ` ${r.unit}` : ""}
                        </span>
                      </div>
                    )}
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${pct}%`, background: r.color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {editing && (
            <button
              onClick={() => setAddOpen(true)}
              style={{ marginTop: 12, width: "100%", padding: "7px", border: "1.5px dashed var(--chew-hairline-strong)", borderRadius: 8, background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, color: "var(--chew-text-3)" }}
            >
              <Plus size={12} strokeWidth={2} />
              <span style={{ fontSize: 12, fontWeight: 600 }}>Add Goal</span>
            </button>
          )}
        </div>

        {/* My Baseline */}
        <div className="chew-card chew-card-pad">
          <div className="card-title" style={{ marginBottom: 12 }}>My Baseline</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {baselineRows.map((r) => (
              <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <IconBox icon={r.icon} color={r.color} bg={r.bg} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: "var(--chew-text-3)", fontWeight: 500 }}>{r.name}</div>
                </div>
                <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: "var(--chew-text)", textAlign: "right" }}>
                  {r.val}{r.unit && <span className="unit"> {r.unit}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 12px", background: "linear-gradient(135deg, var(--chew-orange-50), var(--chew-yellow-50))", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🔥</span>
            <div>
              <div className="mono" style={{ fontSize: 16, fontWeight: 800, color: "var(--chew-orange)", lineHeight: 1 }}>{data.baseline.streakDays}-day</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-2)", fontWeight: 500 }}>logging streak</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Settings Modal ─────────────────────────────────────────────────── */}
      {settingsOpen && (
        <div
          onClick={() => setSettingsOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(13,31,28,0.45)", backdropFilter: "blur(2px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fade-in chew-card"
            style={{ width: 400, padding: 24, zIndex: 901, maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--chew-text)" }}>Settings</div>
              <button onClick={() => setSettingsOpen(false)} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--chew-text-3)" }}>
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Appearance */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Appearance</div>
            <div style={{ padding: "12px 14px", background: "var(--chew-surface-2)", borderRadius: 12, marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}>Dark Mode</div>
                  <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginTop: 1 }}>Switch to a darker interface</div>
                </div>
                <button
                  onClick={toggleDark}
                  style={{ width: 40, height: 22, borderRadius: 11, padding: 2, background: darkMode ? "var(--chew-green)" : "var(--chew-hairline-strong)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}
                >
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: "white", position: "absolute", top: 2, left: darkMode ? 20 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
                </button>
              </div>
            </div>

            {/* Units */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Units</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 14px", background: "var(--chew-surface-2)", borderRadius: 12, marginBottom: 18 }}>
              {([
                { label: "Weight",   key: "weight",   opts: ["lbs", "kg"] },
                { label: "Volume",   key: "volume",   opts: ["cups", "ml", "oz"] },
                { label: "Distance", key: "distance", opts: ["mi", "km"] },
              ] as { label: string; key: keyof typeof units; opts: string[] }[]).map(row => (
                <div key={row.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}>{row.label}</div>
                  <div style={{ display: "flex", gap: 2, background: "var(--chew-hairline)", borderRadius: 8, padding: 2 }}>
                    {row.opts.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setUnits(u => ({ ...u, [row.key]: opt }))}
                        style={{ padding: "4px 10px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: units[row.key] === opt ? 700 : 500, cursor: "pointer", background: units[row.key] === opt ? "var(--chew-surface)" : "transparent", color: units[row.key] === opt ? "var(--chew-text)" : "var(--chew-text-3)", boxShadow: units[row.key] === opt ? "var(--chew-shadow-sm)" : "none", transition: "all 0.15s" }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Notifications</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 14px", background: "var(--chew-surface-2)", borderRadius: 12, marginBottom: 18 }}>
              {([
                { key: "dailyReminder", label: "Daily log reminder",  sub: "Reminder to log meals each day" },
                { key: "goalAlerts",    label: "Goal alerts",          sub: "Notify when you hit a daily goal" },
                { key: "weeklySummary", label: "Weekly summary",       sub: "Sunday recap of your week" },
              ] as { key: keyof typeof notifs; label: string; sub: string }[]).map(row => (
                <div key={row.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}>{row.label}</div>
                    <div style={{ fontSize: 11, color: "var(--chew-text-3)", marginTop: 1 }}>{row.sub}</div>
                  </div>
                  <button
                    onClick={() => setNotifs(n => ({ ...n, [row.key]: !n[row.key] }))}
                    style={{ width: 40, height: 22, borderRadius: 11, padding: 2, background: notifs[row.key] ? "var(--chew-green)" : "var(--chew-hairline-strong)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}
                  >
                    <div style={{ width: 18, height: 18, borderRadius: 9, background: "white", position: "absolute", top: 2, left: notifs[row.key] ? 20 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
                  </button>
                </div>
              ))}
            </div>

            {/* Data */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Data</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button
                onClick={() => { toast.success("Data exported to CSV"); }}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}
              >
                Export data as CSV
              </button>
              <button
                onClick={() => { toast.info("All data has been reset to defaults"); setSettingsOpen(false); }}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--chew-red-50)", background: "var(--chew-red-50)", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600, color: "var(--chew-red)" }}
              >
                Reset to defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Profile Modal ──────────────────────────────────────────────────── */}
      {profileOpen && (
        <div
          onClick={() => setProfileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(13,31,28,0.45)", backdropFilter: "blur(2px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fade-in chew-card"
            style={{ width: 400, padding: 24, zIndex: 901 }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--chew-text)" }}>Profile</div>
              <button onClick={() => setProfileOpen(false)} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--chew-text-3)" }}>
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, padding: "14px 16px", background: "var(--chew-surface-2)", borderRadius: 12 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg, var(--chew-green), var(--chew-teal))", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                {data.user.initials}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--chew-text)" }}>{data.user.name}</div>
                <div style={{ fontSize: 12, color: "var(--chew-text-3)", marginTop: 2 }}>{data.user.email}</div>
                <div style={{ fontSize: 11, color: "var(--chew-text-4)", marginTop: 2 }}>Member since {data.user.memberSince}</div>
              </div>
            </div>

            {/* Body stats */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Body Stats</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
              {[
                { label: "Age",             val: `${data.user.age} yrs` },
                { label: "Height",          val: data.user.height },
                { label: "Current Weight",  val: `${data.user.currentWeight} lbs` },
                { label: "Goal Weight",     val: `${data.baseline.goalWeight.val} lbs` },
              ].map(r => (
                <div key={r.label} style={{ padding: "10px 12px", background: "var(--chew-surface-2)", borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: "var(--chew-text-3)", fontWeight: 600, marginBottom: 3 }}>{r.label}</div>
                  <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--chew-text)" }}>{r.val}</div>
                </div>
              ))}
            </div>

            {/* Preferences */}
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--chew-text-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Preferences</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 18 }}>
              {[
                { label: "Activity Level", val: data.user.activityLevel },
                { label: "Dietary Style",  val: data.user.dietaryStyle },
              ].map(r => (
                <div key={r.label} style={{ padding: "10px 12px", background: "var(--chew-surface-2)", borderRadius: 10 }}>
                  <div style={{ fontSize: 10, color: "var(--chew-text-3)", fontWeight: 600, marginBottom: 3 }}>{r.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--chew-text)" }}>{r.val}</div>
                </div>
              ))}
            </div>

            {/* Quick stats */}
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Logging Streak", val: `${data.baseline.streakDays} days`, color: "var(--chew-orange)", bg: "var(--chew-orange-50)" },
                { label: "Total Logs",     val: String(data.user.totalLogs),         color: "var(--chew-purple)", bg: "var(--chew-purple-50)" },
                { label: "Calorie Goal",   val: `${data.baseline.dailyCal.val.toLocaleString()} kcal`, color: "var(--chew-green)", bg: "var(--chew-green-50)" },
              ].map(r => (
                <div key={r.label} style={{ flex: 1, padding: "10px 10px", background: r.bg, borderRadius: 10, textAlign: "center" }}>
                  <div className="mono" style={{ fontSize: 15, fontWeight: 800, color: r.color }}>{r.val}</div>
                  <div style={{ fontSize: 10, color: "var(--chew-text-2)", fontWeight: 500, marginTop: 2 }}>{r.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Add Goal Modal ─────────────────────────────────────────────────── */}
      {addOpen && (
        <div
          onClick={closeModal}
          style={{ position: "fixed", inset: 0, background: "rgba(13,31,28,0.45)", backdropFilter: "blur(2px)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fade-in chew-card"
            style={{ width: 380, padding: 24, zIndex: 901 }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--chew-text)" }}>Add New Goal</div>
              <button onClick={closeModal} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--chew-text-3)" }}>
                <X size={14} strokeWidth={2} />
              </button>
            </div>

            {/* Goal type dropdown */}
            <div style={{ marginBottom: 14 }}>
              <div style={LABEL_STYLE}>Goal Type</div>
              <select
                value={newGoal.presetLabel}
                onChange={e => selectPreset(e.target.value)}
                style={{ ...INPUT_STYLE, cursor: "pointer", appearance: "auto" }}
              >
                <option value="" disabled>Select a goal…</option>
                {GOAL_PRESETS.map(p => (
                  <option key={p.label} value={p.label}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* Custom name — only when "Custom" is selected */}
            {newGoal.presetLabel === "Custom" && (
              <div style={{ marginBottom: 14 }}>
                <div style={LABEL_STYLE}>Goal Name</div>
                <input
                  type="text"
                  placeholder="e.g. Mindfulness, Reading…"
                  value={newGoal.customName}
                  onChange={e => setNewGoal(g => ({ ...g, customName: e.target.value }))}
                  style={INPUT_STYLE}
                  autoFocus
                />
              </div>
            )}

            {/* Target + unit */}
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={LABEL_STYLE}>Target</div>
                <input
                  type="number"
                  min={1}
                  placeholder="0"
                  value={newGoal.goal}
                  onChange={e => setNewGoal(g => ({ ...g, goal: e.target.value }))}
                  style={INPUT_STYLE}
                />
              </div>
              <div style={{ width: 80 }}>
                <div style={LABEL_STYLE}>Unit</div>
                <input
                  type="text"
                  placeholder="g, hrs…"
                  value={newGoal.unit}
                  onChange={e => setNewGoal(g => ({ ...g, unit: e.target.value }))}
                  style={INPUT_STYLE}
                />
              </div>
            </div>

            {/* Icon picker */}
            <div style={{ marginBottom: 14 }}>
              <div style={LABEL_STYLE}>Icon</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.entries(ICON_MAP).map(([k, Icon]) => {
                  const selected = newGoal.iconKey === k;
                  const hex = COLOR_HEX[newGoal.colorKey] ?? "#22b573";
                  const clr = COLOR_MAP[newGoal.colorKey];
                  return (
                    <button
                      key={k}
                      onClick={() => setNewGoal(g => ({ ...g, iconKey: k }))}
                      style={{ width: 34, height: 34, borderRadius: 9, background: selected ? clr?.bg ?? "var(--chew-green-50)" : "var(--chew-surface-2)", border: selected ? `2px solid ${hex}` : "1.5px solid var(--chew-hairline)", color: selected ? clr?.color ?? "var(--chew-green)" : "var(--chew-text-3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.12s" }}
                    >
                      <Icon size={16} strokeWidth={1.8} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color picker */}
            <div style={{ marginBottom: 22 }}>
              <div style={LABEL_STYLE}>Color</div>
              <div style={{ display: "flex", gap: 8 }}>
                {Object.entries(COLOR_HEX).map(([k, hex]) => (
                  <button
                    key={k}
                    onClick={() => setNewGoal(g => ({ ...g, colorKey: k }))}
                    title={k}
                    style={{ width: 22, height: 22, borderRadius: 11, background: hex, border: newGoal.colorKey === k ? "3px solid var(--chew-text)" : "3px solid transparent", outline: newGoal.colorKey === k ? `2px solid ${hex}` : "none", outlineOffset: 1, cursor: "pointer", transition: "all 0.12s", flexShrink: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* Preview row */}
            {newGoal.presetLabel && (
              <div style={{ marginBottom: 18, padding: "10px 12px", background: "var(--chew-surface-2)", borderRadius: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <IconBox icon={ICON_MAP[newGoal.iconKey] ?? Target} color={COLOR_MAP[newGoal.colorKey]?.color ?? "var(--chew-green)"} bg={COLOR_MAP[newGoal.colorKey]?.bg ?? "var(--chew-green-50)"} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-text)" }}>{effectiveName || "—"}</div>
                  <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>Goal: {newGoal.goal || "—"}{newGoal.unit ? ` ${newGoal.unit}` : ""}</div>
                </div>
                <div className="progress-track" style={{ width: 60 }}>
                  <div className="progress-fill" style={{ width: "0%", background: COLOR_MAP[newGoal.colorKey]?.color ?? "var(--chew-green)" }} />
                </div>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={closeModal}
                style={{ flex: 1, padding: "10px", border: "1px solid var(--chew-hairline)", borderRadius: 10, background: "none", cursor: "pointer", fontSize: 14, color: "var(--chew-text-2)", fontWeight: 600 }}
              >
                Cancel
              </button>
              <button
                onClick={confirmAdd}
                disabled={!canAdd}
                style={{ flex: 2, padding: "10px", border: "none", borderRadius: 10, background: canAdd ? "var(--chew-green)" : "var(--chew-hairline)", cursor: canAdd ? "pointer" : "not-allowed", fontSize: 14, color: canAdd ? "white" : "var(--chew-text-4)", fontWeight: 700, transition: "background 0.15s" }}
              >
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
