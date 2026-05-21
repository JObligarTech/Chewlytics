import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--chew-bg)" }}>
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
