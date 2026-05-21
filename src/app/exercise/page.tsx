"use client";

import { useState } from "react";
import { Plus, ChevronRight, Zap, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { TopNav } from "@/components/layout/TopNav";
import { DayNav } from "@/components/layout/DayNav";
import { ProgressRing } from "@/components/charts/ProgressRing";
import { exerciseData } from "@/lib/data";

const PAGE_PAD = { maxWidth: 1440, margin: "0 auto", padding: "24px 24px 40px" };

function StatCard({ label, icon: Icon, value, goal, unit, color, format }: {
  label: string; icon: React.ElementType; value: number; goal: number; unit: string; color: string; format?: string;
}) {
  const pct = (value / goal) * 100;
  const displayVal = format === "1dp" ? value.toFixed(1) : value.toLocaleString();
  return (
    <div className="chew-card" style={{ padding: 16, flex: 1 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 7, background: `${color}1a`, color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={13} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-text-2)" }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 6 }}>
        {displayVal}
        {goal > 0 && <span style={{ fontSize: 11, fontWeight: 500, color: "var(--chew-text-3)" }}> / {format === "1dp" ? goal.toFixed(1) : goal.toLocaleString()} {unit}</span>}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color, marginTop: 4 }}>{Math.round(pct)}% of goal</div>
    </div>
  );
}

function TodayActivity() {
  const d = exerciseData;
  const totalMin = d.totals.minutes.v;
  const totalGoal = d.totals.minutes.goal;
  const pct = Math.round((totalMin / totalGoal) * 100);

  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <div className="card-title">Today&apos;s Activity</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)", marginTop: 2 }}>{d.todayWorkouts.length} workouts logged</div>
        </div>
        <button
          onClick={() => toast.info("Starting new workout…")}
          style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 9, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", fontSize: 12.5, fontWeight: 600, color: "var(--chew-text-2)", cursor: "pointer" }}
        >
          <Plus size={12} strokeWidth={2.4} /> Log Workout
        </button>
      </div>
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <ProgressRing
            pct={pct}
            size={140}
            stroke={12}
            centerContent={
              <div style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1, color: "var(--chew-text)" }}>{totalMin}</div>
                <div style={{ fontSize: 10.5, color: "var(--chew-text-3)", marginTop: 2, fontWeight: 600 }}>min of {totalGoal}</div>
              </div>
            }
          />
          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{d.totals.calories.v}</div>
              <div style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>kcal burned</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>131</div>
              <div style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>avg bpm</div>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {d.todayWorkouts.map((w) => (
            <div key={w.id} className="chew-card" style={{ padding: 14 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{w.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--chew-text)", marginBottom: 3 }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: "var(--chew-text-3)", display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <span>{w.time}</span>
                    <span>·</span>
                    <span className="mono"><b>{w.minutes}</b> min</span>
                    <span>·</span>
                    <span className="mono"><b>{w.kcal}</b> kcal</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: w.color, background: w.bg, padding: "2px 8px", borderRadius: 5 }}>{w.intensity}</span>
                    <span style={{ fontSize: 11, color: "var(--chew-text-3)" }}>avg <b className="mono">{w.heartAvg}</b> · max <b className="mono">{w.heartMax}</b> bpm</span>
                    {w.sets && <span style={{ fontSize: 11, color: "var(--chew-text-3)" }}>· <b className="mono">{w.sets}</b> sets</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WeeklyChart() {
  const d = exerciseData.weekly;
  const max = Math.max(...d.map((x) => x.min), 1);
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="card-title">Active Minutes</div>
          <div style={{ fontSize: 12, color: "var(--chew-text-3)", marginTop: 2 }}>Past 9 days · <span className="mono">300</span> of 315 weekly goal</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 120 }}>
        {d.map((day) => {
          const h = day.min > 0 ? (day.min / max) * 100 : 0;
          return (
            <div key={day.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div className="mono" style={{ fontSize: 9.5, color: day.min > 0 ? "var(--chew-text-2)" : "var(--chew-text-4)", fontWeight: 600 }}>{day.min || ""}</div>
              <div style={{ width: "100%", height: 88, display: "flex", alignItems: "flex-end" }}>
                <div style={{
                  width: "100%",
                  height: day.min === 0 ? "100%" : `${h}%`,
                  borderRadius: 5,
                  background: day.isToday ? "linear-gradient(180deg, #2dd089, #1a9e63)" : day.min > 0 ? "linear-gradient(180deg, #c8e8d6, #9ad6b3)" : "transparent",
                  border: day.min === 0 ? "1px dashed var(--chew-hairline-strong)" : "none",
                  transition: "height 0.6s ease",
                }} />
              </div>
              <div style={{ fontSize: 9.5, fontWeight: day.isToday ? 700 : 500, color: day.isToday ? "var(--chew-green)" : "var(--chew-text-3)" }}>{day.day}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WorkoutHistory() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Strength", "Cardio", "Yoga"];
  const history = exerciseData.history.filter((w) => {
    if (filter === "All") return true;
    if (filter === "Strength") return w.name.includes("Strength");
    if (filter === "Cardio") return ["Running", "HIIT", "Cycling", "Walk"].some((t) => w.name.includes(t));
    if (filter === "Yoga") return w.name === "Yoga";
    return true;
  });

  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div className="card-title">Workout History</div>
        <div style={{ display: "flex", gap: 4 }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "4px 10px", borderRadius: 7, border: "none", background: filter === f ? "var(--chew-green)" : "var(--chew-surface-2)", color: filter === f ? "white" : "var(--chew-text-2)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {history.map((w) => (
          <div key={w.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{w.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--chew-text)" }}>{w.name}</span>
                {w.badge && <span style={{ fontSize: 10, fontWeight: 700, color: w.color, background: w.bg, borderRadius: 4, padding: "1px 6px" }}>{w.badge}</span>}
              </div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{w.type} · {w.date}</div>
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{w.minutes}</div>
                <div style={{ fontSize: 10, color: "var(--chew-text-3)" }}>min</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{w.kcal}</div>
                <div style={{ fontSize: 10, color: "var(--chew-text-3)" }}>kcal</div>
              </div>
            </div>
            <ChevronRight size={13} strokeWidth={2.4} color="var(--chew-text-4)" />
          </div>
        ))}
      </div>
    </div>
  );
}

function StepsToday() {
  const d = exerciseData;
  const max = Math.max(...d.hourly.map((h) => h.steps));
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div className="card-title">Steps Today</div>
          <div style={{ marginTop: 4 }}>
            <span className="mono" style={{ fontSize: 20, fontWeight: 700, color: "var(--chew-text)", letterSpacing: "-0.02em" }}>{d.totals.steps.v.toLocaleString()}</span>
            <span style={{ fontSize: 12, color: "var(--chew-text-3)" }}> / {d.totals.steps.goal.toLocaleString()}</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: "var(--chew-teal)" }}>5.4 mi</div>
          <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>distance today</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
        {d.hourly.map((h, i) => {
          const ratio = h.steps / max;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", height: 68, display: "flex", alignItems: "flex-end" }}>
                <div style={{
                  width: "100%",
                  height: `${ratio * 100}%`,
                  borderRadius: 3,
                  background: ratio > 0.6 ? "var(--chew-teal)" : ratio > 0.3 ? "#7adcd5" : "#b6ece9",
                  minHeight: ratio > 0 ? 3 : 0,
                }} />
              </div>
              <div style={{ fontSize: 8, color: "var(--chew-text-4)", transform: "rotate(-45deg)", transformOrigin: "center" }}>{h.hr}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuickStart() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--chew-green-50)", color: "var(--chew-green-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Zap size={14} strokeWidth={2} />
        </div>
        <div className="card-title">Quick Start</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {exerciseData.quickStart.map((q) => (
          <button key={q.name} onClick={() => toast.info(`Starting ${q.name}…`)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "12px 8px", borderRadius: 12, border: "1px solid var(--chew-hairline)", background: "var(--chew-surface-2)", cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: q.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{q.icon}</div>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-text-2)" }}>{q.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function HeartZones() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#ffeaec", display: "flex", alignItems: "center", justifyContent: "center" }}>❤️</div>
          <div className="card-title">Heart Rate Zones</div>
        </div>
        <span style={{ fontSize: 11, color: "var(--chew-text-3)" }}>Today</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {exerciseData.zones.map((z) => (
          <div key={z.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ minWidth: 64 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--chew-text)" }}>{z.name}</div>
              <div style={{ fontSize: 10.5, color: "var(--chew-text-3)" }}>{z.range}</div>
            </div>
            <div className="progress-track" style={{ flex: 1 }}>
              <div className="progress-fill" style={{ width: `${z.pct * 2}%`, background: z.color }} />
            </div>
            <div className="mono" style={{ fontSize: 12, fontWeight: 700, color: z.color, minWidth: 30, textAlign: "right" }}>{z.pct}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PersonalRecords() {
  return (
    <div className="chew-card chew-card-pad">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fff4dc", display: "flex", alignItems: "center", justifyContent: "center" }}>🏆</div>
          <div className="card-title">Personal Records</div>
        </div>
        <button style={{ fontSize: 12, fontWeight: 600, color: "var(--chew-green-600)", background: "none", border: "none", cursor: "pointer" }}>See all →</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {exerciseData.records.map((r) => (
          <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 4, height: 36, borderRadius: 2, background: r.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--chew-text)" }}>{r.label}</div>
              <div style={{ fontSize: 11, color: "var(--chew-text-3)" }}>{r.sub}</div>
            </div>
            <div className="mono" style={{ fontSize: 15, fontWeight: 700, color: r.color }}>{r.val}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExercisePage() {
  const d = exerciseData;
  return (
    <div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
      <TopNav />
      <div style={PAGE_PAD} className="fade-in">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--chew-text)", margin: 0, letterSpacing: "-0.025em" }}>Exercise</h1>
            <p style={{ fontSize: 13.5, color: "var(--chew-text-3)", margin: "4px 0 0" }}>
              Log your workouts, track active minutes, and see your progress over time.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <DayNav />
            <button
              onClick={() => toast.info("Starting a new workout…")}
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 10, background: "var(--chew-green)", color: "white", fontSize: 13.5, fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 2px 8px -2px rgba(34,181,115,0.4)" }}
            >
              <Plus size={14} strokeWidth={2.4} /> Start Workout
            </button>
          </div>
        </div>

        {/* Stat strip */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          <StatCard label="Active Minutes" icon={TrendingUp} value={d.totals.minutes.v} goal={d.totals.minutes.goal} unit="min" color="#22b573" />
          <StatCard label="Calories Burned" icon={Zap} value={d.totals.calories.v} goal={d.totals.calories.goal} unit="kcal" color="#ff7a45" />
          <StatCard label="Workouts" icon={Zap} value={d.totals.workouts.v} goal={d.totals.workouts.goal} unit="this wk" color="#7c5cff" />
          <StatCard label="Steps" icon={TrendingUp} value={d.totals.steps.v} goal={d.totals.steps.goal} unit="" color="#16b3ad" />
          <StatCard label="Distance" icon={TrendingUp} value={d.totals.distance.v} goal={d.totals.distance.goal} unit="mi" color="#2f8af6" format="1dp" />
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <TodayActivity />
            <WeeklyChart />
            <StepsToday />
            <WorkoutHistory />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <QuickStart />
            <HeartZones />
            <PersonalRecords />
          </div>
        </div>
      </div>
    </div>
  );
}
