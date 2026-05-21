"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Eye, EyeOff, Check } from "lucide-react";

function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    window.location.href = "/dashboard";
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    window.location.href = "/dashboard";
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(13,31,28,0.45)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "white", borderRadius: 22, width: 420, padding: 36, position: "relative", boxShadow: "0 24px 60px -12px rgba(13,31,28,0.3)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 8, border: "1px solid #ececee", background: "#fafbfb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8a9794" }}>
          <X size={14} strokeWidth={2.4} />
        </button>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <Image src="/chewlytics-mark.png" alt="Chewlytics" width={48} height={48} style={{ height: 48, width: "auto" }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0d1f1c", letterSpacing: "-0.025em", marginBottom: 4 }}>Welcome back</div>
          <div style={{ fontSize: 13.5, color: "#8a9794" }}>Log in to your Chewlytics account</div>
        </div>

        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 0", borderRadius: 12, border: "1px solid #ececee", background: "white", fontSize: 14.5, fontWeight: 600, color: "#0d1f1c", cursor: "pointer", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.29-8.16 2.29-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
          {loading ? "Connecting…" : "Continue with Google"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 1, background: "#ececee" }} />
          <span style={{ fontSize: 12, color: "#8a9794", fontWeight: 500 }}>or continue with email</span>
          <div style={{ flex: 1, height: 1, background: "#ececee" }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "#4d605d", display: "block", marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={{ width: "100%", padding: "11px 14px", borderRadius: 11, border: "1px solid #ececee", background: "#fafbfb", fontSize: 14, color: "#0d1f1c", outline: "none", fontFamily: "inherit" }} />
          </div>
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 12.5, fontWeight: 600, color: "#4d605d" }}>Password</label>
              <button type="button" style={{ fontSize: 12, fontWeight: 600, color: "#1a9e63", background: "none", border: "none", cursor: "pointer" }}>Forgot password?</button>
            </div>
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: "100%", padding: "11px 40px 11px 14px", borderRadius: 11, border: "1px solid #ececee", background: "#fafbfb", fontSize: 14, color: "#0d1f1c", outline: "none", fontFamily: "inherit" }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#8a9794" }}>
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "13px 0", borderRadius: 12, background: "#22b573", color: "white", fontSize: 14.5, fontWeight: 700, border: "none", cursor: "pointer", marginTop: 16, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Signing you in…" : "Log in"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "#8a9794" }}>
          Don&apos;t have access yet?{" "}
          <button onClick={onClose} style={{ color: "#1a9e63", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Request access</button>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: "🍱", title: "Effortless food logging", bullets: ["500K+ food database with brands", "Meal grouping and quick-add", "AI-powered food recognition"] },
  { icon: "🤖", title: "AI nutrition insights", bullets: ["Real-time macro coaching", "AI food finder with confidence scores", "Personalized meal recommendations"] },
  { icon: "📈", title: "Progress that shows up", bullets: ["Weight trends with goal markers", "Body composition tracking", "Weekly and monthly reports"] },
];

const faqs = [
  { q: "Is Chewlytics free?", a: "We're currently in private beta. Access is by request. Pricing will be announced at launch — early beta users get a founding member discount." },
  { q: "What data do you track?", a: "Calories, macros (protein, carbs, fat, fiber, sugar, sodium, potassium), weight, body composition, exercise, steps, hydration, and custom goals." },
  { q: "Does it connect to wearables?", a: "Apple Health and Google Fit integrations are on the roadmap. The current beta focuses on manual and search-based logging." },
  { q: "How accurate is the AI food finder?", a: "We show a confidence score on every result. High-confidence matches pull from verified brand databases; lower-confidence results are estimated." },
  { q: "Can I share data with my doctor?", a: "Yes — the Reports page lets you export PDFs or send a secure link directly to a provider email." },
  { q: "How do you handle my data?", a: "Your health data is encrypted at rest and in transit. We never sell it. You can export or delete everything at any time." },
];

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");

  return (
    <div style={{ minHeight: "100vh", background: "#f8faf9", fontFamily: "inherit" }}>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />

      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(248,250,249,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ececee", padding: "0 40px", display: "flex", alignItems: "center", gap: 32, height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Image src="/chewlytics-mark.png" alt="Chewlytics" width={32} height={32} style={{ height: 32, width: "auto" }} />
          <Image src="/chewlytics-wordmark.png" alt="Chewlytics" width={100} height={24} style={{ height: 24, width: "auto" }} />
        </div>
        <div style={{ display: "flex", gap: 24, marginLeft: 8 }}>
          {["#features", "#how-it-works", "#faq"].map((href, i) => (
            <a key={href} href={href} style={{ fontSize: 14, fontWeight: 500, color: "#4d605d", textDecoration: "none" }}>{["Features", "How it works", "FAQ"][i]}</a>
          ))}
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button onClick={() => setLoginOpen(true)} style={{ padding: "8px 18px", borderRadius: 9, border: "1px solid #ececee", background: "white", fontSize: 14, fontWeight: 600, color: "#0d1f1c", cursor: "pointer" }}>Log in</button>
          <a href="#waitlist" style={{ padding: "8px 18px", borderRadius: 9, background: "#22b573", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>Request access</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: 600, display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <pattern id="hero-stripe" patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)">
                <rect width="24" height="24" fill="#1a4a3a" />
                <line x1="0" y1="0" x2="0" y2="24" stroke="#1e5440" strokeWidth="12" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-stripe)" />
          </svg>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,31,28,0.72) 0%, rgba(13,31,28,0.42) 100%)" }} />
          <div style={{ position: "absolute", top: 16, right: 24, fontSize: 11, fontFamily: "ui-monospace, monospace", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>[ hero image · food + lifestyle ]</div>
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, padding: "80px 64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", borderRadius: 20, padding: "6px 14px", marginBottom: 24, border: "1px solid rgba(255,255,255,0.2)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2dd089", display: "inline-block" }} />
            <span style={{ fontSize: 12.5, color: "white", fontWeight: 600 }}>Now accepting beta users</span>
          </div>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: "white", letterSpacing: "-0.035em", lineHeight: 1.1, margin: "0 0 20px" }}>
            Track every bite.<br />
            <span style={{ color: "#2dd089" }}>See every trend.</span>
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.75)", lineHeight: 1.6, margin: "0 0 32px" }}>
            Chewlytics turns your daily food and exercise logs into clear, actionable insights — so you can hit your goals without the guesswork.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#waitlist" style={{ padding: "14px 28px", borderRadius: 12, background: "#22b573", color: "white", fontSize: 15.5, fontWeight: 700, textDecoration: "none" }}>Request access</a>
            <button onClick={() => setLoginOpen(true)} style={{ padding: "14px 28px", borderRadius: 12, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", color: "white", fontSize: 15.5, fontWeight: 600, border: "1px solid rgba(255,255,255,0.3)", cursor: "pointer" }}>Log in</button>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 24 }}>
            <div style={{ display: "flex" }}>
              {["🧑", "👩", "🧑‍🦱", "👨‍🦰"].map((e, i) => (
                <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.25)", border: "2px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginLeft: i > 0 ? -8 : 0 }}>{e}</div>
              ))}
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>2,800+ on the waitlist</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "white", borderBottom: "1px solid #ececee", padding: "28px 64px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "space-around", gap: 24, flexWrap: "wrap" }}>
          {[["500K+", "Foods in database"], ["12", "Metrics tracked daily"], ["8s", "Avg log time"], ["94%", "Beta user success rate"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 30, fontWeight: 800, color: "#22b573", letterSpacing: "-0.025em" }}>{v}</div>
              <div style={{ fontSize: 12.5, color: "#8a9794", fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "72px 64px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: "#0d1f1c", letterSpacing: "-0.025em", margin: "0 0 10px" }}>Why Chewlytics</h2>
          <p style={{ fontSize: 15.5, color: "#8a9794", maxWidth: 480, margin: "0 auto" }}>A nutrition tracker that actually tells you something useful.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "white", borderRadius: 18, border: "1px solid #ececee", padding: 26, boxShadow: "0 1px 2px rgba(15,31,28,0.04)" }}>
              <div style={{ fontSize: 34, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0d1f1c", margin: "0 0 12px" }}>{f.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {f.bullets.map((b) => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "#4d605d" }}>
                    <div style={{ width: 18, height: 18, borderRadius: 5, background: "#e7f7ef", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Check size={11} strokeWidth={2.6} color="#22b573" />
                    </div>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dashboard preview */}
      <section id="product" style={{ padding: "64px", background: "white", borderTop: "1px solid #ececee", borderBottom: "1px solid #ececee" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0d1f1c", letterSpacing: "-0.025em", margin: "0 0 36px" }}>A look inside</h2>
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 20px 60px -12px rgba(13,31,28,0.12)", border: "1px solid #ececee", background: "#f6f7f8" }}>
            <div style={{ height: 34, background: "#ececee", display: "flex", alignItems: "center", gap: 7, padding: "0 14px", borderBottom: "1px solid #e2e5e6" }}>
              {["#ef4f5c", "#f5b942", "#22b573"].map((c) => <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "inline-block" }} />)}
            </div>
            <div style={{ padding: 48, minHeight: 280, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <svg width="100%" height="180" viewBox="0 0 800 180" style={{ maxWidth: 700 }}>
                <defs>
                  <pattern id="dash-p" patternUnits="userSpaceOnUse" width="16" height="16" patternTransform="rotate(45)">
                    <rect width="16" height="16" fill="#f6f7f8" />
                    <line x1="0" y1="0" x2="0" y2="16" stroke="#ececee" strokeWidth="6" />
                  </pattern>
                </defs>
                <rect width="800" height="180" fill="url(#dash-p)" rx="8" />
                <text x="400" y="92" fontSize="13" fill="#9aa9a5" textAnchor="middle" fontFamily="ui-monospace, monospace">[ dashboard screenshot placeholder ]</text>
                <text x="400" y="110" fontSize="11" fill="#b8c1bf" textAnchor="middle" fontFamily="ui-monospace, monospace">visit /dashboard to see the live app</text>
              </svg>
              <Link href="/dashboard" style={{ padding: "10px 22px", borderRadius: 10, background: "#22b573", color: "white", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                Open live dashboard →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: "72px 64px", maxWidth: 760, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0d1f1c", letterSpacing: "-0.025em", margin: "0 0 44px", textAlign: "center" }}>How it works</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            { n: "1", title: "Set your goals", desc: "Enter your target weight, daily calorie goal, macro targets, and activity goals. Takes 60 seconds." },
            { n: "2", title: "Log your meals", desc: "Search our 500K+ food database, scan barcodes, or let the AI recognize what you're eating from a description." },
            { n: "3", title: "See what's working", desc: "Your dashboard updates in real time. Weekly reports and AI insights tell you exactly what to adjust." },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", alignItems: "flex-start", gap: 18, textAlign: "left" }}>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#22b573", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 800, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#0d1f1c", marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: "#8a9794", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section style={{ background: "#0d1f1c", padding: "72px 64px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 44, color: "#22b573", fontWeight: 800, lineHeight: 1, marginBottom: 20 }}>&ldquo;</div>
          <p style={{ fontSize: 19, fontWeight: 500, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: "0 0 24px" }}>
            I&apos;ve tried every nutrition app. Chewlytics is the first one that actually explains <em>why</em> I&apos;m not hitting my goals — not just what I ate.
          </p>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)" }}>— Sarah M., beta user</div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "72px 64px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontSize: 30, fontWeight: 800, color: "#0d1f1c", letterSpacing: "-0.025em", margin: "0 0 36px", textAlign: "center" }}>Frequently asked questions</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {faqs.map((f) => (
            <div key={f.q} style={{ background: "white", borderRadius: 14, border: "1px solid #ececee", padding: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0d1f1c", marginBottom: 8 }}>{f.q}</div>
              <div style={{ fontSize: 13.5, color: "#8a9794", lineHeight: 1.6 }}>{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" style={{ background: "#22b573", padding: "72px 64px" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 900, color: "white", letterSpacing: "-0.025em", margin: "0 0 10px" }}>Get early access</h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.8)", margin: "0 0 28px" }}>
            Join 2,800+ people waiting for Chewlytics. Beta users get founding member pricing.
          </p>
          {submitted ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "16px 24px", background: "rgba(255,255,255,0.15)", borderRadius: 14, color: "white", fontSize: 15, fontWeight: 600 }}>
              <Check size={20} strokeWidth={2.6} /> You&apos;re on the list! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", gap: 10 }}>
              <input type="email" value={waitlistEmail} onChange={(e) => setWaitlistEmail(e.target.value)} placeholder="your@email.com" required style={{ flex: 1, padding: "13px 16px", borderRadius: 11, border: "none", background: "rgba(255,255,255,0.2)", color: "white", fontSize: 14.5, fontFamily: "inherit", outline: "none" }} />
              <button type="submit" style={{ padding: "13px 22px", borderRadius: 11, background: "white", color: "#1a9e63", fontSize: 14.5, fontWeight: 700, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>Request access →</button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#0d1f1c", color: "rgba(255,255,255,0.55)", padding: "44px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 240 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <Image src="/chewlytics-mark.png" alt="" width={26} height={26} style={{ height: 26, width: "auto", opacity: 0.7 }} />
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>Chewlytics</span>
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, margin: 0 }}>Track every bite. See every trend. Hit your goals.</p>
          </div>
          {[["Product", ["Features", "Dashboard", "Reports", "AI Insights"]], ["Company", ["About", "Blog", "Press", "Careers"]], ["Legal", ["Privacy", "Terms", "Security"]]].map(([title, links]) => (
            <div key={title as string}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>{title as string}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {(links as string[]).map((l) => <a key={l} href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}>{l}</a>)}
              </div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1100, margin: "28px auto 0", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
          © 2026 Chewlytics, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
