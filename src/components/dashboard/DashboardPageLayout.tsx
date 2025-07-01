"use client";
import { motion } from "framer-motion";

export default function DashboardPageLayout({ title, actions, children }) {
  return (
    <motion.section
      className="max-w-2xl mx-auto w-full px-4 py-6 md:py-10"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-charcoal">{title}</h1>
        {actions && <div>{actions}</div>}
      </div>
      <div className="grid gap-4">{children}</div>
    </motion.section>
  );
} 