# Chewlytics — Project Reference

## What this is
A client-side-only health/nutrition tracking SaaS dashboard. **No backend, no API calls.** All data is mocked in `src/lib/data.ts`. The app is built with Next.js 16 App Router, TypeScript, Tailwind CSS v4, and shadcn/ui.

---

## Tech Stack

| Thing | Version / detail |
|---|---|
| Next.js | 16.2.6 — App Router only, no Pages Router |
| React | 19.2.4 |
| TypeScript | 5.x strict mode |
| Tailwind | v4 — uses `@import "tailwindcss"` not `@tailwind` directives |
| shadcn/ui | v4 — components live in `src/components/ui/` |
| Fonts | Plus Jakarta Sans (body) + JetBrains Mono (numbers/code) via `next/font/google` |
| Toasts | `sonner` — import `toast` from `"sonner"`, NOT from shadcn. The shadcn `toast` component is deprecated. |
| Icons | `lucide-react` v1.16 |
| Build tool | Turbopack (default in Next.js 16) |

---

## Routing

All routes are under `src/app/`:

| Route | File |
|---|---|
| `/` | `src/app/page.tsx` — landing page + LoginModal |
| `/dashboard` | `src/app/dashboard/page.tsx` — main dashboard |
| `/food-log` | `src/app/food-log/page.tsx` |
| `/exercise` | `src/app/exercise/page.tsx` |
| `/progress` | `src/app/progress/page.tsx` |
| `/reports` | `src/app/reports/page.tsx` |

`src/app/dashboard/layout.tsx` wraps `/dashboard` with `<TopNav>`. All other pages (`/food-log`, `/exercise`, `/progress`, `/reports`) import and render `<TopNav>` directly inside their own `page.tsx`. There is no shared route-group layout for those pages — if adding a new app page, include `<TopNav>` manually at the top of the page component.

All pages are `"use client"` — static generation runs but every page is interactive.

---

## Styling conventions — READ THIS FIRST

**Use inline `style={{}}` props, not Tailwind utility classes.** The design uses CSS custom properties extensively and the original design was built with inline styles. Tailwind utility classes are available but are used minimally (mostly in shadcn component files).

Only use Tailwind utilities for things not expressible with inline styles (e.g., `className="mono"`, `className="chew-card"`).

**Never mix Tailwind font-size utilities** (`text-sm`, etc.) with inline `fontSize` — you'll get duplicate-property TypeScript errors.

### Utility CSS classes (defined in `globals.css`)

| Class | What it does |
|---|---|
| `.chew-card` | White card with hairline border, 18px radius, sm shadow |
| `.chew-card-pad` | `padding: 20px` — used inside `.chew-card` |
| `.card-title` | 14px, weight 700, `--chew-text`, tight tracking |
| `.mono` | JetBrains Mono font — use on all numeric displays |
| `.unit` | Smaller muted label after a number (e.g. "kcal", "g") |
| `.progress-track` | Grey progress bar track |
| `.progress-fill` | Colored fill inside `.progress-track` |
| `.fade-in` | 220ms fade-up entrance animation |

### Design tokens (CSS custom properties)

**Brand colors:**
```
--chew-green: #22b573       --chew-green-600: #1a9e63   --chew-green-50: #e7f7ef
--chew-purple: #7c5cff      --chew-purple-50: #efeaff
--chew-blue: #2f8af6        --chew-blue-50: #e6f0ff
--chew-orange: #ff7a45      --chew-orange-50: #fff0e8
--chew-red: #ef4f5c         --chew-red-50: #ffeaec
--chew-teal: #16b3ad        --chew-teal-50: #e0f6f5
--chew-yellow: #f5b942      --chew-yellow-50: #fff4dc
```

**Text hierarchy:**
```
--chew-text:    #0d1f1c   ← primary headings / bold labels
--chew-text-2:  #4d605d   ← body text
--chew-text-3:  #8a9794   ← secondary/muted labels
--chew-text-4:  #b8c1bf   ← very muted / disabled
```

**Surfaces & structure:**
```
--chew-hairline:       #ececee   ← borders between elements
--chew-hairline-strong: #e2e5e6  ← heavier dividers
--chew-surface:        #ffffff   ← card background
--chew-surface-2:      #fafbfb   ← inset/nested backgrounds
--chew-bg:             #f6f7f8   ← page background
--chew-card-radius:    18px
```

**Shadows:**
```
--chew-shadow-sm   ← default card shadow
--chew-shadow-md   ← elevated card
--chew-shadow-lg   ← modal/dropdown
```

---

## Data layer

**Single source of truth: `src/lib/data.ts`**

All mock data is exported from here. No API calls anywhere — every page reads from this file.

| Export | Used by |
|---|---|
| `chewData` | Dashboard — user profile, goals, nutrition grid, meals, weight, exercise, AI |
| `foodLogData` | Food Log — totals, meals array, quickAdd chips, recent searches |
| `exerciseData` | Exercise — totals, today's workouts, history, weekly bars, steps, zones, records |
| `progressData` | Progress — weight series (90 days), body comp, weekly activity, goal progress, milestones |
| `reportsData` | Reports — report types, KPIs, macro dist, daily calories, top foods, food groups, insights |

To change any displayed value (numbers, names, goals), edit `src/lib/data.ts` — do not hardcode values inside components.

---

## Component map

### Layout components (`src/components/layout/`)
- **`TopNav.tsx`** — sticky top nav with logo, 5 route tabs (active detection via `usePathname`), bell badge, date pill
- **`Sidebar.tsx`** — dashboard-only left sidebar: profile, Daily Goals ring (120px), 5 goal rows, My Baseline, streak chip. Accepts `water` and `setWater` props from dashboard page.
- **`DayNav.tsx`** — prev/next arrow + Today button. Drop in wherever date navigation is needed.
- **`SmartRecBar.tsx`** — fixed-bottom AI recommendation bar with dismiss button.

### Chart components (`src/components/charts/`)
- **`ProgressRing.tsx`** — reusable SVG donut ring. Props: `size`, `stroke`, `pct`, `color`, `centerContent` (ReactNode).
- **`Sparkline.tsx`** — reusable SVG area sparkline. Props: `data` (number[]), `color`, `width`, `height`.

All charts are hand-drawn SVG — **no chart library is installed**. Keep it that way.

### Dashboard components (`src/components/dashboard/`)
| Component | What it renders |
|---|---|
| `HeroSummary.tsx` | 5-col card: greeting + calories left / protein left / burn est / water |
| `MetricsRow.tsx` | 4 metric cards (Calories / Protein / Weight / Exercise) |
| `NutritionBreakdown.tsx` | 5-col CSS grid: name / progress bar / consumed / goal / % |
| `FoodLogWidget.tsx` | Collapsible meal groups with food items |
| `WeightTrend.tsx` | SVG weight area chart, 7-day range |
| `ExerciseSummary.tsx` | Ring + stats grid + workout list |
| `AIFoodFinder.tsx` | Search input, macro grid, confidence badge, thumbs feedback |
| `HydrationTracker.tsx` | Interactive cup buttons (tap to fill/unfill) |

### Food Log components (`src/components/food-log/`)
- **`MacroStatCard.tsx`** — progress-bar stat card for the macro strip
- **`MealCard.tsx`** — meal header + macro split bar + food items + dashed Add button
- **`QuickAddCard.tsx`** — also exports `FrequentlyLogged` and `DailyInsight`

---

## Common gotchas

### Key prop on fragments in `.map()`
When returning multiple sibling elements from `.map()`, use `<React.Fragment key={...}>` — never `<>`. The shorthand fragment syntax cannot take a `key` prop.
```tsx
// WRONG — React warning
{items.map(x => (
  <>
    <div key={x.id}>...</div>
    <div key={x.id + '-b'}>...</div>
  </>
))}

// CORRECT
{items.map(x => (
  <React.Fragment key={x.id}>
    <div>...</div>
    <div>...</div>
  </React.Fragment>
))}
```
Remember to `import React from "react"` in the file (not just `{ useState }`).

### Duplicate style properties = TypeScript error
Object literals cannot have the same key twice. This will fail to compile:
```tsx
style={{ fontSize: 13, fontWeight: 700, fontSize: 11 }}  // ❌
style={{ fontWeight: 700, fontSize: 11 }}                 // ✓
```

### State with heterogeneous union types from data.ts
If `useState` infers a narrow union from mock data (e.g., a meals array where one item has `items: never[]`), TypeScript will reject updater functions. Fix by declaring an explicit type and casting:
```tsx
type Meal = { key: string; items: MealItem[]; empty?: boolean; ... };
const [meals, setMeals] = useState<Meal[]>(foodLogData.meals as Meal[]);
```

### Toast notifications
```tsx
import { toast } from "sonner";  // always this import
toast.success("Done");
toast.info("FYI");
toast.error("Oops");
```
The `<Toaster>` is mounted once in `src/app/layout.tsx` — do not add it to individual pages.

### Adding a new page
1. Create `src/app/<route>/page.tsx` with `"use client"` at the top
2. Import and render `<TopNav />` as the first element inside the root div
3. Wrap content in `<div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>`
4. Add the route tab to `src/components/layout/TopNav.tsx` if it should appear in the nav
5. Add mock data to `src/lib/data.ts`

### Page layout pattern
```tsx
const PAGE_PAD = { maxWidth: 1440, margin: "0 auto", padding: "24px 24px 40px" };
// ...
<div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
  <TopNav />
  <div style={PAGE_PAD} className="fade-in">
    {/* content */}
  </div>
</div>
```

---

## npm audit note
There are 2 moderate vulnerabilities in the PostCSS version bundled inside Next.js 16. The automated fix would downgrade Next.js to v9 — do not run `npm audit fix --force`. Wait for an upstream Next.js patch.

No TanStack packages are installed in this project.
