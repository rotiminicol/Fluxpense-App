"use client";
import { useEffect, useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) return;
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:mVJnFa8M/category", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setCategories(data))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <DashboardPageLayout title="Categories">
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8 text-champagne">No categories found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(cat => (
            <motion.div
              key={cat.id}
              className="bg-ivory rounded-xl shadow-lg p-6 border border-champagne/40"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #D4BFAA55" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="font-semibold text-emerald text-lg mb-2">{cat.name}</div>
              <div className="text-charcoal">Color: {cat.color}</div>
              <div className="text-charcoal">Icon: {cat.icon}</div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardPageLayout>
  );
}
