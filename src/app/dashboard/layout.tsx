import { TopNav } from "@/components/layout/TopNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
