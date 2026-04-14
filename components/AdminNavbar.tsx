"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavbar() {
  const pathname = usePathname();

if (
  pathname === "/admin/login" ||
  pathname.startsWith("/admin/reset-password")
) {
  return null;
}

  const linkClass = (path: string) =>
    `px-4 py-2 rounded-md transition text-sm font-medium ${
      pathname === path
        ? "bg-white text-emerald-700 shadow-sm"
        : "text-white/90 hover:bg-emerald-600"
    }`;

    

  return (
    <nav className="w-full bg-emerald-700 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between px-6 py-4">

        {/* LEFT */}
        <h1 className="text-lg font-semibold tracking-wide">
          Admin Panel
        </h1>

        {/* CENTER NAV */}
        <div className="flex items-center gap-2 sm:gap-4">

          <Link className={linkClass("/admin")} href="/admin">
            Bookings
          </Link>

          <Link className={linkClass("/admin/doctors")} href="/admin/doctors">
            Doctors
          </Link>

          <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition"
        >
          Logout
        </button>


         

        </div>

       
        
      </div>
    </nav>
  );
}