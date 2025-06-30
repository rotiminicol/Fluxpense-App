"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add sign up logic
    setTimeout(() => {
      setLoading(false);
      router.push("/onboarding");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background px-6">
      <h2 className="text-2xl font-black text-center mb-6 text-primary font-headline">Create Account</h2>
      <form className="w-full max-w-xs flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="w-full px-4 py-3 rounded-xl border border-input bg-white text-base focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full px-4 py-3 rounded-xl border border-input bg-white text-base focus:outline-none focus:ring-2 focus:ring-primary"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full px-4 py-3 rounded-xl border border-input bg-white text-base focus:outline-none focus:ring-2 focus:ring-primary"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-primary text-white font-bold text-lg button-glow active:scale-95 transition-transform disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <button className="text-primary font-bold underline" onClick={() => router.push("/auth/login")}>Login</button>
      </p>
    </div>
  );
} 