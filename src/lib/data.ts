export const chewData = {
  user: {
    name: "Alex Johnson",
    firstName: "Alex",
    initials: "AJ",
    email: "alex.johnson@example.com",
    age: 32,
    height: "5′ 9″",
    currentWeight: 157.2,
    activityLevel: "Moderately Active",
    dietaryStyle: "High Protein",
    memberSince: "January 2025",
    totalLogs: 138,
  },
  goals: {
    overall: 76,
    calories: { current: 1450, goal: 1900, unit: "kcal" },
    protein: { current: 132, goal: 160, unit: "g" },
    exercise: { current: 35, goal: 45, unit: "min" },
    water: { current: 6, goal: 8, unit: "cups" },
    steps: { current: 7842, goal: 10000, unit: "" },
  },
  baseline: {
    goalWeight: { val: 150.0, unit: "lbs" },
    startWeight: { val: 160.4, unit: "lbs" },
    dailyCal: { val: 1900, unit: "kcal" },
    proteinGoal: { val: 160, unit: "g" },
    waterGoal: { val: 8, unit: "cups" },
    stepGoal: { val: "10,000", unit: "" },
    streakDays: 12,
  },
  hero: {
    caloriesLeft: 450,
    proteinLeft: 28,
    burnEst: 420,
    waterCups: 6,
  },
  nutrition: [
    { name: "Calories", consumed: "1,450", goal: "1,900 kcal", pct: 76, color: "#22b573" },
    { name: "Protein", consumed: "132 g", goal: "160 g", pct: 83, color: "#7c5cff" },
    { name: "Carbs", consumed: "160 g", goal: "250 g", pct: 64, color: "#16b3ad" },
    { name: "Fat", consumed: "42 g", goal: "70 g", pct: 60, color: "#f5b942" },
    { name: "Fiber", consumed: "18 g", goal: "30 g", pct: 60, color: "#5fc46e" },
    { name: "Sugar", consumed: "38 g", goal: "65 g", pct: 58, color: "#ef4f5c" },
    { name: "Sodium", consumed: "2,300 mg", goal: "2,300 mg", pct: 100, color: "#ff7a45" },
    { name: "Potassium", consumed: "1,900 mg", goal: "3,400 mg", pct: 56, color: "#2f8af6" },
  ],
  meals: [
    {
      name: "Breakfast", kcal: 520, emoji: "🥣",
      items: [
        { name: "Fairlife Nutrition Plan Shake", detail: "230 kcal · 42g protein", thumb: "🥛", bg: "#e6f0ff" },
        { name: "Dave's Killer Bread (2 slices)", detail: "290 kcal · 10g protein · 300mg sodium", thumb: "🍞", bg: "#fff0e8" },
      ],
    },
    {
      name: "Lunch", kcal: 630, emoji: "🍱",
      items: [
        { name: "Grilled Chicken Breast (6 oz)", detail: "320 kcal · 34g protein · 600mg sodium", thumb: "🍗", bg: "#fff4dc" },
        { name: "Quinoa (1 cup)", detail: "310 kcal · 8g protein · 5g fiber", thumb: "🌾", bg: "#e7f7ef" },
      ],
    },
    {
      name: "Snack", kcal: 300, emoji: "🥗",
      items: [
        { name: "Barebells Protein Bar", detail: "200 kcal · 20g protein", thumb: "🍫", bg: "#efeaff" },
        { name: "Apple", detail: "100 kcal · 4g fiber", thumb: "🍎", bg: "#ffeaec" },
      ],
    },
  ],
  weight: {
    current: 157.2,
    delta: -0.6,
    sevenDayAvg: 157.2,
    series: [160.0, 159.6, 159.1, 158.7, 158.3, 158.0, 157.8, 157.6, 157.5, 157.4, 157.3, 157.3, 157.2, 157.2],
  },
  exercise: {
    minutes: 210, minGoal: 300,
    workouts: 4,
    burned: 2340,
    stepsAvg: 7842,
    list: [
      { name: "Strength Training", meta: "Today · 45 min · 420 kcal", color: "#7c5cff", bg: "#efeaff" },
      { name: "HIIT", meta: "Yesterday · 30 min · 320 kcal", color: "#ff7a45", bg: "#fff0e8" },
      { name: "Yoga", meta: "May 18 · 30 min · 200 kcal", color: "#16b3ad", bg: "#e0f6f5" },
    ],
  },
  ai: {
    query: "Starbucks Tomato & Mozzarella on Focaccia",
    macros: { kcal: 360, protein: 15, carbs: 47, sodium: 590 },
    confidence: 90,
    insight: "Good moderate-calorie option with a balance of protein and carbs. Pair it with a fruit or side salad to increase fiber and micronutrients.",
  },
};

export const foodLogData = {
  date: "Today, May 20",
  totals: {
    calories: { v: 1450, goal: 1900, color: "#22b573" },
    protein: { v: 132, goal: 160, color: "#7c5cff" },
    carbs: { v: 160, goal: 250, color: "#16b3ad" },
    fat: { v: 42, goal: 70, color: "#f5b942" },
    fiber: { v: 18, goal: 30, color: "#5fc46e" },
  },
  meals: [
    {
      key: "breakfast", name: "Breakfast", emoji: "🥣", time: "8:30 AM", kcal: 520,
      macros: { p: 52, c: 48, f: 14 },
      items: [
        { name: "Fairlife Nutrition Plan Shake", brand: "Fairlife · 11 fl oz", kcal: 230, p: 42, c: 6, f: 4, thumb: "🥛", bg: "#e6f0ff" },
        { name: "Dave's Killer Bread", brand: "2 slices · Whole grain", kcal: 290, p: 10, c: 42, f: 4, thumb: "🍞", bg: "#fff0e8" },
      ],
    },
    {
      key: "lunch", name: "Lunch", emoji: "🍱", time: "12:15 PM", kcal: 630,
      macros: { p: 42, c: 70, f: 16 },
      items: [
        { name: "Grilled Chicken Breast", brand: "6 oz · Home cooked", kcal: 320, p: 34, c: 0, f: 8, thumb: "🍗", bg: "#fff4dc" },
        { name: "Quinoa", brand: "1 cup · Cooked", kcal: 310, p: 8, c: 56, f: 5, thumb: "🌾", bg: "#e7f7ef" },
      ],
    },
    {
      key: "snack", name: "Snack", emoji: "🥗", time: "3:45 PM", kcal: 300,
      macros: { p: 24, c: 32, f: 8 },
      items: [
        { name: "Barebells Protein Bar", brand: "Caramel Cashew · 55g", kcal: 200, p: 20, c: 18, f: 7, thumb: "🍫", bg: "#efeaff" },
        { name: "Apple", brand: "Medium · Gala", kcal: 100, p: 0, c: 25, f: 0, thumb: "🍎", bg: "#ffeaec" },
      ],
    },
    {
      key: "dinner", name: "Dinner", emoji: "🍽️", time: null, kcal: 0,
      empty: true,
      suggested: ["Salmon + Veggies", "Stir Fry", "Pasta Bowl"],
      macros: { p: 0, c: 0, f: 0 },
      items: [],
    },
  ],
  quickAdd: [
    { name: "Greek Yogurt", kcal: 100, thumb: "🥄", bg: "#e6f0ff" },
    { name: "Banana", kcal: 105, thumb: "🍌", bg: "#fff4dc" },
    { name: "Almonds (1 oz)", kcal: 165, thumb: "🥜", bg: "#fff0e8" },
    { name: "Egg, large", kcal: 78, thumb: "🥚", bg: "#fff4dc" },
    { name: "Avocado, half", kcal: 120, thumb: "🥑", bg: "#e7f7ef" },
    { name: "Coffee, black", kcal: 5, thumb: "☕", bg: "#f2e9e0" },
    { name: "Oatmeal (½ cup)", kcal: 150, thumb: "🌾", bg: "#e7f7ef" },
    { name: "Salmon (4 oz)", kcal: 230, thumb: "🐟", bg: "#ffe0d6" },
  ],
  recent: ["Fairlife Nutrition Plan Shake", "Grilled Chicken Breast", "Greek Yogurt", "Sweet Potato"],
};

export const exerciseData = {
  date: "Today, May 20",
  totals: {
    minutes: { v: 35, goal: 45, color: "#22b573", unit: "min" },
    calories: { v: 420, goal: 600, color: "#ff7a45", unit: "kcal" },
    workouts: { v: 4, goal: 5, color: "#7c5cff", unit: "this wk" },
    steps: { v: 7842, goal: 10000, color: "#16b3ad", unit: "" },
    distance: { v: 5.4, goal: 7, color: "#2f8af6", unit: "mi" },
  },
  todayWorkouts: [
    { id: 1, name: "Morning Walk", icon: "🚶", time: "7:15 AM", minutes: 20, kcal: 80, intensity: "Light", color: "#16b3ad", bg: "#e0f6f5", heartAvg: 92, heartMax: 108 },
    { id: 2, name: "Strength Training — Upper Body", icon: "🏋️", time: "5:30 PM", minutes: 15, kcal: 340, intensity: "High", color: "#7c5cff", bg: "#efeaff", heartAvg: 135, heartMax: 168, sets: 12, totalWeight: 4250 },
  ],
  history: [
    { id: 11, name: "Strength Training", type: "Upper Body", icon: "🏋️", date: "Today", minutes: 15, kcal: 340, badge: "PR", color: "#7c5cff", bg: "#efeaff" },
    { id: 12, name: "Morning Walk", type: "Outdoors", icon: "🚶", date: "Today", minutes: 20, kcal: 80, color: "#16b3ad", bg: "#e0f6f5" },
    { id: 13, name: "HIIT", type: "Bodyweight", icon: "🔥", date: "Yesterday", minutes: 30, kcal: 320, color: "#ff7a45", bg: "#fff0e8" },
    { id: 14, name: "Yoga", type: "Vinyasa", icon: "🧘", date: "May 18", minutes: 30, kcal: 200, color: "#22b573", bg: "#e7f7ef" },
    { id: 15, name: "Running", type: "Easy 5K", icon: "🏃", date: "May 17", minutes: 35, kcal: 360, distance: "3.1 mi", color: "#2f8af6", bg: "#e6f0ff" },
    { id: 16, name: "Cycling", type: "Indoor", icon: "🚴", date: "May 16", minutes: 45, kcal: 410, color: "#ef4f5c", bg: "#ffeaec" },
    { id: 17, name: "Strength Training", type: "Lower Body", icon: "🏋️", date: "May 15", minutes: 50, kcal: 480, color: "#7c5cff", bg: "#efeaff" },
  ],
  weekly: [
    { day: "Mon", date: "May 12", min: 45, kcal: 410 },
    { day: "Tue", date: "May 13", min: 30, kcal: 280 },
    { day: "Wed", date: "May 14", min: 0, kcal: 0 },
    { day: "Thu", date: "May 15", min: 50, kcal: 480 },
    { day: "Fri", date: "May 16", min: 45, kcal: 410 },
    { day: "Sat", date: "May 17", min: 35, kcal: 360 },
    { day: "Sun", date: "May 18", min: 30, kcal: 200 },
    { day: "Mon", date: "May 19", min: 30, kcal: 320 },
    { day: "Tue", date: "May 20", min: 35, kcal: 420, isToday: true },
  ],
  hourly: [
    { hr: "6a", steps: 120 }, { hr: "7a", steps: 1850 }, { hr: "8a", steps: 480 },
    { hr: "9a", steps: 320 }, { hr: "10a", steps: 410 }, { hr: "11a", steps: 280 },
    { hr: "12p", steps: 620 }, { hr: "1p", steps: 380 }, { hr: "2p", steps: 240 },
    { hr: "3p", steps: 360 }, { hr: "4p", steps: 540 }, { hr: "5p", steps: 1320 },
    { hr: "6p", steps: 820 }, { hr: "7p", steps: 102 },
  ],
  quickStart: [
    { name: "Running", icon: "🏃", color: "#2f8af6", bg: "#e6f0ff" },
    { name: "Strength", icon: "🏋️", color: "#7c5cff", bg: "#efeaff" },
    { name: "HIIT", icon: "🔥", color: "#ff7a45", bg: "#fff0e8" },
    { name: "Yoga", icon: "🧘", color: "#22b573", bg: "#e7f7ef" },
    { name: "Cycling", icon: "🚴", color: "#ef4f5c", bg: "#ffeaec" },
    { name: "Swimming", icon: "🏊", color: "#16b3ad", bg: "#e0f6f5" },
  ],
  records: [
    { label: "Fastest 5K", val: "24:18", sub: "Personal best", color: "#2f8af6" },
    { label: "Heaviest Squat", val: "215 lbs", sub: "+10 lbs this mo", color: "#7c5cff" },
    { label: "Longest Run", val: "6.2 mi", sub: "May 8", color: "#22b573" },
    { label: "Most Steps in a Day", val: "14,320", sub: "Apr 27", color: "#16b3ad" },
  ],
  zones: [
    { name: "Peak", pct: 8, range: "168–185 bpm", color: "#ef4f5c" },
    { name: "Cardio", pct: 24, range: "148–168 bpm", color: "#ff7a45" },
    { name: "Fat Burn", pct: 46, range: "111–148 bpm", color: "#f5b942" },
    { name: "Warm Up", pct: 22, range: "92–111 bpm", color: "#22b573" },
  ],
};

export const progressData = {
  rangeOptions: ["1W", "1M", "3M", "6M", "1Y", "All"] as const,
  defaultRange: "3M" as const,
  weightSeries: (() => {
    const arr: { date: string; val: number }[] = [];
    const start = 160.4, end = 157.2;
    for (let i = 0; i <= 89; i++) {
      const t = i / 89;
      const base = start + (end - start) * t;
      const noise = Math.sin(i * 0.5) * 0.25 + Math.cos(i * 0.31) * 0.18;
      const day = new Date(2026, 1, 12);
      day.setDate(day.getDate() + i);
      arr.push({ date: day.toISOString().slice(0, 10), val: +(base + noise).toFixed(1) });
    }
    return arr;
  })(),
  goalWeight: 150,
  bodyComp: [
    { name: "Body Fat", val: "22.4", unit: "%", delta: "-1.8%", deltaUp: false, color: "#7c5cff", series: [24.2, 24.0, 23.8, 23.5, 23.2, 22.9, 22.6, 22.4] },
    { name: "Lean Mass", val: "122", unit: "lbs", delta: "+1.4 lbs", deltaUp: true, color: "#22b573", series: [120.6, 120.9, 121.1, 121.4, 121.6, 121.8, 121.9, 122.0] },
    { name: "BMI", val: "23.1", unit: "", delta: "-0.5", deltaUp: false, color: "#16b3ad", series: [23.6, 23.5, 23.4, 23.3, 23.3, 23.2, 23.1, 23.1] },
    { name: "Waist", val: "32.0", unit: "in", delta: "-1.0 in", deltaUp: false, color: "#ff7a45", series: [33.0, 32.8, 32.7, 32.5, 32.4, 32.2, 32.1, 32.0] },
  ],
  weekly: [
    { wk: "W10", date: "Mar 2", kcal: 1820, min: 165 },
    { wk: "W11", date: "Mar 9", kcal: 2010, min: 195 },
    { wk: "W12", date: "Mar 16", kcal: 1980, min: 185 },
    { wk: "W13", date: "Mar 23", kcal: 2150, min: 210 },
    { wk: "W14", date: "Mar 30", kcal: 1750, min: 160 },
    { wk: "W15", date: "Apr 6", kcal: 2300, min: 230 },
    { wk: "W16", date: "Apr 13", kcal: 2180, min: 215 },
    { wk: "W17", date: "Apr 20", kcal: 2050, min: 200 },
    { wk: "W18", date: "Apr 27", kcal: 2420, min: 245 },
    { wk: "W19", date: "May 4", kcal: 2330, min: 235 },
    { wk: "W20", date: "May 11", kcal: 2180, min: 220 },
    { wk: "W21", date: "May 18", kcal: 1880, min: 195, partial: true },
  ],
  goalProgress: [
    { name: "Weight Goal", start: 160.4, current: 157.2, goal: 150, unit: "lbs", inverted: false, color: "#22b573", bg: "#e7f7ef" },
    { name: "Calorie Target", start: 0, current: 1450, goal: 1900, unit: "kcal", inverted: true, color: "#ff7a45", bg: "#fff0e8" },
    { name: "Protein Target", start: 0, current: 132, goal: 160, unit: "g", inverted: true, color: "#7c5cff", bg: "#efeaff" },
    { name: "Daily Steps", start: 0, current: 7842, goal: 10000, unit: "", inverted: true, color: "#16b3ad", bg: "#e0f6f5" },
  ],
  milestones: [
    { icon: "🏆", title: "Lost 3 lbs", date: "May 18", color: "#f5b942", bg: "#fff4dc" },
    { icon: "🔥", title: "10-day logging streak", date: "May 17", color: "#ff7a45", bg: "#fff0e8" },
    { icon: "💪", title: "20 workouts this month", date: "May 14", color: "#7c5cff", bg: "#efeaff" },
    { icon: "🥗", title: "Hit protein goal 7 days in a row", date: "May 12", color: "#22b573", bg: "#e7f7ef" },
    { icon: "👟", title: "First 10K steps day", date: "May 4", color: "#16b3ad", bg: "#e0f6f5" },
  ],
  photos: [
    { date: "May 18", weight: "157.2 lbs", label: "Week 14" },
    { date: "May 11", weight: "158.0 lbs", label: "Week 13" },
    { date: "May 4", weight: "158.6 lbs", label: "Week 12" },
    { date: "Apr 27", weight: "159.1 lbs", label: "Week 11" },
  ],
};

export const reportsData = {
  period: "May 13 – May 20, 2026",
  shortPeriod: "Past 7 days",
  generatedAt: "Today, 9:24 AM",
  reportTypes: [
    { key: "nutrition", name: "Weekly Nutrition", desc: "Daily kcal, macros, and food log breakdown", color: "#22b573", bg: "#e7f7ef", lastGen: "Generated today" },
    { key: "activity", name: "Activity Report", desc: "Workouts, steps, and active minutes", color: "#ff7a45", bg: "#fff0e8", lastGen: "May 18" },
    { key: "body", name: "Body Composition", desc: "Weight, body fat, lean mass, BMI trends", color: "#7c5cff", bg: "#efeaff", lastGen: "May 14" },
    { key: "macro", name: "Macro Deep-dive", desc: "Protein, carbs, fat per meal & day", color: "#16b3ad", bg: "#e0f6f5", lastGen: "May 11" },
    { key: "wellness", name: "Wellness Summary", desc: "Quarterly check-in across all metrics", color: "#f5b942", bg: "#fff4dc", lastGen: "Apr 30" },
  ],
  weekKpi: [
    { label: "Avg Calories", v: "1,612", unit: "kcal/day", delta: "-148 vs prev", color: "#22b573" },
    { label: "Avg Protein", v: "138", unit: "g/day", delta: "+12 vs prev", color: "#7c5cff" },
    { label: "Avg Active Time", v: "32", unit: "min/day", delta: "+4 vs prev", color: "#ff7a45" },
    { label: "Weight Change", v: "−0.8", unit: "lbs", delta: "vs last week", color: "#16b3ad" },
  ],
  macroDist: [
    { name: "Protein", pct: 32, grams: 138, kcal: 552, color: "#7c5cff" },
    { name: "Carbs", pct: 44, grams: 178, kcal: 712, color: "#16b3ad" },
    { name: "Fat", pct: 24, grams: 43, kcal: 387, color: "#f5b942" },
  ],
  dailyCalories: [
    { day: "Wed", date: "May 13", kcal: 1820 },
    { day: "Thu", date: "May 14", kcal: 1650 },
    { day: "Fri", date: "May 15", kcal: 1950 },
    { day: "Sat", date: "May 16", kcal: 1480 },
    { day: "Sun", date: "May 17", kcal: 1720 },
    { day: "Mon", date: "May 18", kcal: 1320 },
    { day: "Tue", date: "May 19", kcal: 1480 },
    { day: "Wed", date: "May 20", kcal: 1450, partial: true },
  ],
  goal: 1900,
  topFoods: [
    { rank: 1, name: "Fairlife Nutrition Plan Shake", count: 7, kcal: 1610, p: 294 },
    { rank: 2, name: "Grilled Chicken Breast", count: 6, kcal: 1920, p: 204 },
    { rank: 3, name: "Quinoa (cooked)", count: 5, kcal: 1550, p: 40 },
    { rank: 4, name: "Dave's Killer Bread", count: 5, kcal: 1450, p: 50 },
    { rank: 5, name: "Apple", count: 4, kcal: 400, p: 0 },
    { rank: 6, name: "Greek Yogurt", count: 4, kcal: 400, p: 60 },
  ],
  foodGroups: [
    { name: "Proteins", pct: 28, color: "#7c5cff" },
    { name: "Grains", pct: 22, color: "#16b3ad" },
    { name: "Veggies", pct: 18, color: "#22b573" },
    { name: "Dairy", pct: 14, color: "#2f8af6" },
    { name: "Fruits", pct: 10, color: "#ef4f5c" },
    { name: "Fats & Oils", pct: 6, color: "#f5b942" },
    { name: "Sweets", pct: 2, color: "#ff7a45" },
  ],
  insights: [
    { tone: "good" as const, text: "Hit your protein goal on 6 of 7 days — strongest week this month." },
    { tone: "good" as const, text: "Active minutes increased 14% week-over-week. Keep momentum on Tue/Thu." },
    { tone: "warning" as const, text: "Fiber intake averaged 18g/day — below the 30g target. Add more legumes or veggies." },
    { tone: "info" as const, text: "Sodium peaked on May 17 (2,850 mg). Watch for high-sodium prepared meals." },
  ],
  recentExports: [
    { name: "Weekly Nutrition · May 13–20", format: "PDF", size: "412 KB", when: "Just now" },
    { name: "Monthly Activity · April", format: "PDF", size: "1.2 MB", when: "May 1" },
    { name: "Q1 Wellness Summary", format: "PDF", size: "2.4 MB", when: "Apr 1" },
    { name: "Full data export (Jan–Mar)", format: "CSV", size: "318 KB", when: "Apr 1" },
  ],
  scheduled: [
    { name: "Weekly Nutrition Summary", freq: "Every Monday, 8:00 AM", on: true, next: "May 25" },
    { name: "Monthly Activity Report", freq: "1st of every month", on: true, next: "Jun 1" },
    { name: "Body Comp Update", freq: "Every 2 weeks", on: false, next: "—" },
  ],
};

export const foodDatabase = [
  { name: "Greek Yogurt", brand: "Plain · 6 oz", kcal: 100, p: 17, c: 6, f: 0, thumb: "🥄", bg: "#e6f0ff" },
  { name: "Banana", brand: "Fresh · medium", kcal: 105, p: 1, c: 27, f: 0, thumb: "🍌", bg: "#fff4dc" },
  { name: "Almonds", brand: "Raw · 1 oz (23 nuts)", kcal: 165, p: 6, c: 6, f: 14, thumb: "🥜", bg: "#fff0e8" },
  { name: "Egg, large", brand: "Whole · cooked", kcal: 78, p: 6, c: 1, f: 5, thumb: "🥚", bg: "#fff4dc" },
  { name: "Avocado", brand: "Fresh · half", kcal: 120, p: 2, c: 6, f: 11, thumb: "🥑", bg: "#e7f7ef" },
  { name: "Coffee, black", brand: "Brewed · 8 fl oz", kcal: 5, p: 0, c: 1, f: 0, thumb: "☕", bg: "#f2e9e0" },
  { name: "Oatmeal", brand: "Old fashioned · ½ cup dry", kcal: 150, p: 5, c: 27, f: 3, thumb: "🌾", bg: "#e7f7ef" },
  { name: "Salmon", brand: "Atlantic · 4 oz cooked", kcal: 230, p: 31, c: 0, f: 11, thumb: "🐟", bg: "#ffe0d6" },
  { name: "Fairlife Protein Shake", brand: "Fairlife · 11 fl oz", kcal: 230, p: 42, c: 6, f: 4, thumb: "🥛", bg: "#e6f0ff" },
  { name: "Grilled Chicken Breast", brand: "Home cooked · 6 oz", kcal: 320, p: 34, c: 0, f: 8, thumb: "🍗", bg: "#fff4dc" },
  { name: "Quinoa", brand: "Cooked · 1 cup", kcal: 222, p: 8, c: 39, f: 4, thumb: "🌾", bg: "#e7f7ef" },
  { name: "Protein Bar", brand: "Barebells Caramel · 55g", kcal: 200, p: 20, c: 18, f: 7, thumb: "🍫", bg: "#efeaff" },
  { name: "Apple", brand: "Gala · medium", kcal: 95, p: 0, c: 25, f: 0, thumb: "🍎", bg: "#ffeaec" },
  { name: "Sweet Potato", brand: "Baked · medium", kcal: 103, p: 2, c: 24, f: 0, thumb: "🍠", bg: "#fff0e8" },
  { name: "Brown Rice", brand: "Cooked · 1 cup", kcal: 216, p: 5, c: 45, f: 2, thumb: "🍚", bg: "#e7f7ef" },
  { name: "Cottage Cheese", brand: "Low-fat · ½ cup", kcal: 90, p: 14, c: 5, f: 2, thumb: "🧀", bg: "#e6f0ff" },
  { name: "Blueberries", brand: "Fresh · 1 cup", kcal: 84, p: 1, c: 21, f: 1, thumb: "🫐", bg: "#efeaff" },
  { name: "Peanut Butter", brand: "Natural · 2 tbsp", kcal: 190, p: 8, c: 7, f: 16, thumb: "🥜", bg: "#fff0e8" },
  { name: "Whole Milk", brand: "Dairy · 1 cup", kcal: 149, p: 8, c: 12, f: 8, thumb: "🥛", bg: "#e6f0ff" },
  { name: "Spinach", brand: "Raw · 2 cups", kcal: 14, p: 2, c: 2, f: 0, thumb: "🥬", bg: "#e7f7ef" },
  { name: "Tuna", brand: "Canned in water · 3 oz", kcal: 100, p: 22, c: 0, f: 1, thumb: "🐟", bg: "#e0f6f5" },
  { name: "Orange", brand: "Navel · medium", kcal: 62, p: 1, c: 15, f: 0, thumb: "🍊", bg: "#fff0e8" },
  { name: "Protein Powder", brand: "Whey · 1 scoop (30g)", kcal: 130, p: 25, c: 3, f: 2, thumb: "🥤", bg: "#efeaff" },
  { name: "Dave's Killer Bread", brand: "2 slices · Whole grain", kcal: 290, p: 10, c: 42, f: 4, thumb: "🍞", bg: "#fff0e8" },
  { name: "Stir Fry Vegetables", brand: "Mixed · 1 cup", kcal: 70, p: 3, c: 14, f: 1, thumb: "🥦", bg: "#e7f7ef" },
  { name: "Pasta", brand: "Whole wheat · 2 oz dry", kcal: 200, p: 8, c: 41, f: 1, thumb: "🍝", bg: "#fff4dc" },
  { name: "Strawberries", brand: "Fresh · 1 cup", kcal: 49, p: 1, c: 12, f: 0, thumb: "🍓", bg: "#ffeaec" },
  { name: "Cheddar Cheese", brand: "Shredded · 1 oz", kcal: 113, p: 7, c: 0, f: 9, thumb: "🧀", bg: "#fff4dc" },
  { name: "Mixed Nuts", brand: "Roasted · 1 oz", kcal: 170, p: 5, c: 8, f: 15, thumb: "🥜", bg: "#fff0e8" },
  { name: "Pasta Bowl", brand: "Whole wheat + marinara", kcal: 380, p: 14, c: 68, f: 6, thumb: "🍝", bg: "#fff4dc" },
];
