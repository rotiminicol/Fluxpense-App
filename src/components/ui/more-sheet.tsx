import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MenuSheet({ open, onOpenChange }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl p-6 border-4 border-champagne shadow-xl"
        as={motion.div}
        initial={{ y: 100, opacity: 0 }}
        animate={open ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ borderColor: "#D4BFAA" }}
      >
        <SheetHeader>
          <SheetTitle className="text-champagne">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Link href="/dashboard/budgets" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Budgets</Link>
          <Link href="/dashboard/billing" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Billing</Link>
          <Link href="/dashboard/integrations" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Integrations</Link>
          <Link href="/dashboard/notifications" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Notifications</Link>
          <Link href="/dashboard/categories" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Categories</Link>
          <Link href="/dashboard/team" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Team</Link>
          <Link href="/dashboard/settings" className="text-lg font-medium" onClick={() => onOpenChange(false)}>Settings</Link>
        </div>
      </SheetContent>
    </Sheet>
  );
} 