"use client";
import { useEffect, useState } from "react";
import DashboardPageLayout from "@/components/dashboard/DashboardPageLayout";
import { motion } from "framer-motion";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) return;
    fetch("https://x8ki-letl-twmt.n7.xano.io/api:mVJnFa8M/notification", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setNotifications(data))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <DashboardPageLayout title="Notifications">
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-8 text-champagne">No notifications yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notifications.map(n => (
            <motion.div
              key={n.id}
              className="bg-ivory rounded-xl shadow-lg p-6 border border-champagne/40"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 32px #D4BFAA55" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="font-semibold text-emerald text-lg mb-2">{n.type}</div>
              <div className="text-charcoal">{n.message}</div>
              <div className="text-xs text-champagne mt-2">{n.created_at}</div>
            </motion.div>
          ))}
        </div>
      )}
    </DashboardPageLayout>
  );
}
