"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { BarChart2, Home, Receipt, Settings, LogOut, Bell, Plus } from "lucide-react";
import { AddExpenseDialog } from "@/components/dashboard/add-expense-dialog";
import { useAuth } from "@/contexts/auth-context";
import React from "react";
import { motion } from "framer-motion";

function MobileBottomNav({ onAddExpenseClick }: { onAddExpenseClick: () => void; }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t border-border z-50">
      <div className="flex justify-between items-center p-2">
        <Button variant="ghost" size="sm" asChild className="flex flex-col items-center gap-1 h-auto py-2">
          <Link href="/dashboard/overview">
            <Home className="w-4 h-4" />
            <span className="text-xs">Home</span>
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="flex flex-col items-center gap-1 h-auto py-2">
          <Link href="/dashboard/expenses">
            <Receipt className="w-4 h-4" />
            <span className="text-xs">Expenses</span>
          </Link>
        </Button>
        <span className="flex-1 flex justify-center">
          <Button
            onClick={onAddExpenseClick}
            size="sm"
            className="flex flex-col items-center justify-center gap-1 h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 -translate-y-3 shadow-lg border-4 border-background"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </span>
        <Button variant="ghost" size="sm" asChild className="flex flex-col items-center gap-1 h-auto py-2">
          <Link href="/dashboard/reports">
            <BarChart2 className="w-4 h-4" />
            <span className="text-xs">Reports</span>
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="flex flex-col items-center gap-1 h-auto py-2">
          <Link href="/dashboard/settings">
            <Settings className="w-4 h-4" />
            <span className="text-xs">Settings</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

function DashboardAppContent({ children }: { children: React.ReactNode }) {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>
      <motion.header
        className="z-40 flex h-20 items-center gap-6 border-b-4 border-champagne bg-gradient-to-b from-champagne/80 via-ivory/95 to-ivory/100 shadow-[0_4px_32px_0_rgba(28,28,28,0.10)] px-6"
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          background: "linear-gradient(to bottom, #D4BFAAee 0%, #FAF9F6 80%)",
          borderBottom: "4px solid #D4BFAA",
          boxShadow: "0 4px 32px 0 #1C1C1C18, 0 2px 8px 0 #D4BFAA33",
        }}
      >
        <Logo variant="aiiit" size="md" showText={false} />
        <div className="flex-1"></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-champagne/30 transition-all duration-200">
              <Bell className="h-7 w-7 text-emerald" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 animate-in fade-in-0 zoom-in-95">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <p className="text-center text-sm text-muted-foreground py-4">No notifications yet.</p>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full flex items-center gap-2 px-2 hover:bg-champagne/30 transition-all duration-200">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald to-champagne rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 animate-in fade-in-0 zoom-in-95">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive w-full cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.header>
      <main className="flex-1 relative flex flex-col bg-background transition-all duration-300 pt-14">
        <AddExpenseDialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen} />
        <div className="flex-1 relative z-10 pb-24 p-4">
          {children}
        </div>
      </main>
    </>
  );
}

export function DashboardApp({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <DashboardAppContent>{children}</DashboardAppContent>
    </div>
  );
}
