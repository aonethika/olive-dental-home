"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function Inner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setMsg("");

    const res = await fetch("/api/admin/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    setLoading(false);
    setMsg(data.message);

    if (res.ok) {
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center -mt-30 justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm space-y-4">
        <input
          type="password"
          placeholder="New password"
          className="w-full border p-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-emerald-600 text-white p-3 rounded"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {msg && <p className="text-sm text-center">{msg}</p>}
      </div>
    </div>
  );
}

export default function ResetPasswordClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inner />
    </Suspense>
  );
}