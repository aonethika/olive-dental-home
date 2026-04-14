"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-emerald-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Left: Logo + Menu button */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </button>

         
        <Link
        href="/"
        className="text-lg font-medium tracking-wide transition hover:text-emerald-500"
        >
        <span className="text-emerald-500 font-bold">O</span>live Dental
      </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-emerald-200 transition">
            Home
          </Link>
          <Link href="/services" className="hover:text-emerald-200 transition">
            Services
          </Link>
          <Link href="/book" className="hover:text-emerald-200 transition">
            Book
          </Link>
          <Link href="/contact" className="hover:text-emerald-200 transition">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-15 left-0 h-1/2 w-40 bg-emerald-950 z-50 p-6 flex flex-col gap-6 text-lg font-medium transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Link href="/" onClick={() => setOpen(false)} className="hover:text-emerald-200">
          Home
        </Link>
        <Link href="/services" onClick={() => setOpen(false)} className="hover:text-emerald-200">
          Services
        </Link>
        <Link href="/book" onClick={() => setOpen(false)} className="hover:text-emerald-200">
          Booking
        </Link>
        <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-emerald-200">
          Contact
        </Link>
      </div>
    </nav>
  );
}