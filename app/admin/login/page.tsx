"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("admin", "true");
      router.push("/admin");
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async () => {
    if (!email) return;

    setForgotLoading(true);
    setForgotMsg("");

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setForgotMsg(data.message || "Email not found");
        return;
      }

      setForgotMsg(data.message || "Reset link sent");
      setTimeout(() => setOpen(false), 1200);
    } catch {
      setForgotMsg("Server error");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
   <main className="min-h-screen flex items-start justify-center pt-20 bg-gradient-to-br from-emerald-50 via-white to-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 space-y-5"
      >
        <input
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-3 rounded-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "Login"
          )}
        </button>

        <p
          onClick={() => {
            setOpen(true);
            setForgotMsg("");
          }}
          className="text-sm text-center text-emerald-600 cursor-pointer hover:underline"
        >
          Forgot password?
        </p>
      </form>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center  justify-center px-4">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 space-y-4 shadow-2xl">
            <input
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {forgotMsg && (
              <p
                className={`text-sm ${
                  forgotMsg.toLowerCase().includes("not")
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {forgotMsg}
              </p>
            )}

            <button
              onClick={handleForgot}
              disabled={forgotLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              {forgotLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </main>
  );
}