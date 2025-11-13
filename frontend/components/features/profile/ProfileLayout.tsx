import { ReactNode } from "react";

interface ProfileLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export function ProfileLayout({ sidebar, children }: ProfileLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <aside className="lg:col-span-1">
        <div className="sticky top-24">{sidebar}</div>
      </aside>
      <main className="lg:col-span-2">{children}</main>
    </div>
  );
}
