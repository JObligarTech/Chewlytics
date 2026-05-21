"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Calendar, ChevronDown, LayoutDashboard, UtensilsCrossed, Dumbbell, TrendingUp, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tabs = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { id: "food-log", label: "Food Log", href: "/food-log", icon: UtensilsCrossed },
  { id: "exercise", label: "Exercise", href: "/exercise", icon: Dumbbell },
  { id: "progress", label: "Progress", href: "/progress", icon: TrendingUp },
  { id: "reports", label: "Reports", href: "/reports", icon: FileText },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(246, 247, 248, 0.85)",
        backdropFilter: "saturate(180%) blur(10px)",
        borderBottom: "1px solid var(--chew-hairline)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          gap: 24,
          height: 68,
        }}
      >
        {/* Brand */}
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <Image src="/chewlytics-mark.png" alt="Chewlytics" width={36} height={36} style={{ height: 36, width: "auto" }} />
          <Image src="/chewlytics-wordmark.png" alt="Chewlytics" width={110} height={26} style={{ height: 26, width: "auto" }} />
        </Link>

        {/* Navigation tabs */}
        <nav style={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
          {tabs.map((tab) => {
            const active = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 13.5,
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--chew-green-600)" : "var(--chew-text-2)",
                  background: active ? "var(--chew-green-50)" : "transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <button
            style={{
              position: "relative",
              width: 38,
              height: 38,
              borderRadius: 10,
              border: "1px solid var(--chew-hairline)",
              background: "var(--chew-surface)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--chew-text-2)",
            }}
          >
            <Bell size={18} strokeWidth={1.8} />
            <span
              style={{
                position: "absolute",
                top: -4,
                right: -4,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                background: "var(--chew-red)",
                color: "white",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 4px",
              }}
            >
              3
            </span>
          </button>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 12px",
              borderRadius: 10,
              border: "1px solid var(--chew-hairline)",
              background: "var(--chew-surface)",
              cursor: "pointer",
              color: "var(--chew-text)",
            }}
          >
            <Calendar size={14} strokeWidth={2} color="var(--chew-green)" />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>May 20, 2026</div>
              <div style={{ fontSize: 10, color: "var(--chew-text-3)", lineHeight: 1 }}>Today</div>
            </div>
            <ChevronDown size={13} strokeWidth={2} color="var(--chew-text-3)" />
          </button>
        </div>
      </div>
    </header>
  );
}
