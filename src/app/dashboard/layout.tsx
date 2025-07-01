"use client";

import { DashboardApp } from "@/components/dashboard/dashboard-app";
import { DataProvider } from "@/contexts/data-context";
import { useState } from "react";
import BottomNav from "@/components/ui/bottom-nav";
import MenuSheet from "@/components/ui/more-sheet";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald via-charcoal to-champagne flex flex-col pb-16">
      <DataProvider>
        <DashboardApp>{children}</DashboardApp>
      </DataProvider>
      <BottomNav onMenuClick={() => setMenuOpen(true)} />
      <MenuSheet open={menuOpen} onOpenChange={setMenuOpen} />
    </div>
  );
}
