"use client";

import { useEffect, useMemo, useState } from "react";

export default function BookingsPage() {
  const getToday = () => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const getTime = () => new Date().toTimeString().slice(0, 5);

  const [selectedDate, setSelectedDate] = useState(getToday());
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    date: getToday(),
    time: getTime(),
    doctor: "",
  });

  const [doctors, setDoctors] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    const res = await fetch("/api/admin/doctors");
    if (!res.ok) return;
    const data = await res.json();
    setDoctors(data.doctors.filter((d: any) => d.isActive === true));
  };

  const fetchBookings = async () => {
    const res = await fetch("/api/admin/bookings");
    if (!res.ok) return;
    const data = await res.json();
    setBookings(data.bookings);
  };

 useEffect(() => {
  const load = async () => {
    const [docRes, bookRes] = await Promise.all([
      fetch("/api/admin/doctors"),
      fetch("/api/admin/bookings"),
    ]);

    const docData = await docRes.json();
    const bookData = await bookRes.json();

    setDoctors(docData.doctors.filter((d: any) => d.isActive));
    setBookings(bookData.bookings);
  };

  load();
}, []);
  const createBooking = async () => {
    setLoading(true);

    await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      patientName: "",
      phone: "",
      date: getToday(),
      time: getTime(),
      doctor: "",
    });

    await fetchBookings();
    setLoading(false);
  };

  const markVisited = async (id: string) => {
    await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });

    fetchBookings();
  };

  const filtered = useMemo(() => {
    return bookings
      .filter((b) => {
        const q = search.toLowerCase();
        return (
          b.date === selectedDate &&
          (b.patientName?.toLowerCase().includes(q) ||
            b.phone?.includes(q))
        );
      })
      .sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      );
  }, [bookings, selectedDate, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 mt-0 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-2 space-y-6">

        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

          <button
            onClick={() => setOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition text-white px-5 py-2 rounded-xl font-medium shadow-sm"
          >
            + New Booking
          </button>

          <div className="flex gap-3 w-full md:w-auto">

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded-xl px-3 py-2 text-sm"
            />

            <input
              placeholder="Search patient or phone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-xl px-3 py-2 text-sm w-full md:w-72"
            />

          </div>

        </div>

        <div className="space-y-4">

          {filtered.length === 0 ? (
            <div className="text-center text-gray-500 py-20 bg-white rounded-2xl shadow-sm">
              No bookings found
            </div>
          ) : (
            filtered.map((b, i) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col md:flex-row md:items-center md:justify-between animate-fadeIn"
                style={{ animationDelay: `${i * 40}ms` }}
              >

                <div className="flex gap-4 items-center">

                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold text-lg">
                    {b.patientName?.charAt(0)}
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900">
                      {b.patientName}
                    </div>

                    <div className="text-sm text-gray-500">
                      {b.phone}
                    </div>

                    <div className="text-xs text-gray-400 mt-1">
                      {b.date} • {b.time}
                    </div>

                    <div className="text-xs text-emerald-600 mt-1 font-medium">
                      Dr. {b.doctor?.name || "Not assigned"}
                    </div>
                  </div>

                </div>

                <div className="flex items-center gap-3 mt-4 md:mt-0">

                  <span
                    className={`px-3 py-1 text-xs rounded-full transition ${
                      b.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {b.status}
                  </span>

                  {b.status !== "completed" && (
                    <button
                      onClick={() => markVisited(b._id)}
                      className="px-4 py-2 text-sm border rounded-xl hover:bg-gray-50 active:scale-95 transition"
                    >
                      Mark Visited
                    </button>
                  )}

                </div>

              </div>
            ))
          )}

        </div>

      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl transform transition-all duration-300 scale-100">

            <div className="p-5 border-b font-semibold text-lg">
              New Booking
            </div>

            <div className="p-5 space-y-4">

              <input
                placeholder="Patient Name"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={form.patientName}
                onChange={(e) =>
                  setForm({ ...form, patientName: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-3">

                <input
                  type="date"
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={form.date}
                  onChange={(e) =>
                    setForm({ ...form, date: e.target.value })
                  }
                />

                <input
                  type="time"
                  className="border rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={form.time}
                  onChange={(e) =>
                    setForm({ ...form, time: e.target.value })
                  }
                />

              </div>

              <select
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={form.doctor}
                onChange={(e) =>
                  setForm({ ...form, doctor: e.target.value })
                }
              >
                <option value="">Select Doctor</option>
                {doctors.map((d) => (
                  <option key={d._id} value={d._id}>
                    Dr. {d.name}
                  </option>
                ))}
              </select>

            </div>

            <div className="p-5 flex gap-3 border-t">

              <button
                disabled={loading}
                onClick={async () => {
                  await createBooking();
                  setOpen(false);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white py-2 rounded-xl transition active:scale-95"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 py-2 rounded-xl transition"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out both;
        }
      `}</style>

    </div>
  );
}