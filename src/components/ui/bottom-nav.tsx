"use client";
import { useState } from "react";
import { Home, List, PlusCircle, BarChart2, Menu } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Overview", icon: Home, href: "/dashboard/overview" },
  { label: "Expenses", icon: List, href: "/dashboard/expenses" },
  { label: "Add", icon: PlusCircle, href: "#add" }, // Central blue + button
  { label: "Reports", icon: BarChart2, href: "/dashboard/reports" },
  { label: "Menu", icon: Menu, href: "#menu" },
];

export default function BottomNav({ onMenuClick, onAddClick }) {
  const [active, setActive] = useState(0);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center h-20 pb-safe bg-gradient-to-t from-champagne/90 via-ivory/95 to-ivory/100 border-t-4 border-champagne rounded-t-2xl shadow-[0_-4px_32px_0_rgba(28,28,28,0.10)] px-2"
      style={{
        background: "linear-gradient(to top, #D4BFAAee 0%, #FAF9F6 80%)",
        borderTop: "4px solid #D4BFAA",
        borderTopLeftRadius: "1.25rem",
        borderTopRightRadius: "1.25rem",
        boxShadow: "0 -4px 32px 0 #1C1C1C18, 0 2px 8px 0 #D4BFAA33",
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      {navItems.map((item, idx) => {
        if (item.label === "Add") {
          return (
            <button
              key={item.label}
              onClick={onAddClick}
              className="flex flex-col items-center justify-center text-emerald shadow-lg transition-transform duration-200 hover:scale-110"
              style={{
                position: "relative",
                top: "-28px",
                background: "#046307",
                borderRadius: "50%",
                width: "64px",
                height: "64px",
                boxShadow: "0 8px 32px #04630755, 0 2px 8px #D4BFAA33",
                color: "#FAF9F6",
                border: "6px solid #FAF9F6",
                zIndex: 10,
              }}
              aria-label="Add"
            >
              <item.icon className="w-10 h-10" />
            </button>
          );
        } else if (item.label === "Menu") {
          return (
            <button
              key={item.label}
              onClick={onMenuClick}
              className="flex flex-col items-center justify-center text-charcoal transition-colors duration-200 hover:text-emerald"
            >
              <item.icon className="w-7 h-7 mb-1" />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        } else {
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center transition-colors duration-200 ${active === idx ? "text-emerald" : "text-charcoal"} hover:text-emerald`}
              onClick={() => setActive(idx)}
            >
              <item.icon className="w-7 h-7 mb-1" />
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          );
        }
      })}
    </nav>
  );
} 