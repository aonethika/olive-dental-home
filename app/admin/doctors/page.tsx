"use client";

import { useEffect, useState } from "react";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    phone: "",
    experience: "",
  });

  const fetchDoctors = async () => {
    const res = await fetch("/api/admin/doctors");
    const data = await res.json();
    setDoctors(data.doctors || []);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const addDoctor = async () => {
    await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setOpen(false);
    setForm({
      name: "",
      specialization: "",
      phone: "",
      experience: "",
    });

    fetchDoctors();
  };

  const toggle = async (id: string, current: boolean) => {
    const updated = !current;

    setDoctors((prev) =>
      prev.map((d) =>
        d._id === id ? { ...d, isActive: updated } : d
      )
    );

    try {
      await fetch(`/api/admin/doctors/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: updated }),
      });
    } catch {
      setDoctors((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, isActive: current } : d
        )
      );
    }
  };

  const del = async (id: string) => {
    await fetch(`/api/admin/doctors/${id}`, {
      method: "DELETE",
    });

    setDoctors((prev) => prev.filter((d) => d._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 pt-2 space-y-6">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Doctors
          </h1>

          <button
            onClick={() => setOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
          >
            + Add Doctor
          </button>
        </div>

        {/* LIST */}
        <div className="grid gap-4">

          {doctors.map((d) => (
            <div
              key={d._id}
              className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm hover:shadow-md transition"
            >

              {/* LEFT */}
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-semibold text-emerald-700">
                  {d.name?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-gray-900">
                    Dr. {d.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {d.specialization}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    📞 {d.phone}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3 mt-4 md:mt-0">

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    d.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {d.isActive ? "Active" : "Inactive"}
                </span>

                <button
                  onClick={() => toggle(d._id, d.isActive)}
                  className={`px-4 py-2 rounded-lg text-sm text-white transition ${
                    d.isActive
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-emerald-600 hover:bg-emerald-700"
                  }`}
                >
                  {d.isActive ? "Deactivate" : "Activate"}
                </button>

                <button
                  onClick={() => del(d._id)}
                  className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-50 transition"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl">

            {/* HEADER */}
            <div className="border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Add Doctor</h2>
            </div>

            {/* BODY */}
            <div className="p-6 space-y-3">

              <input
                className="border p-3 w-full rounded-lg"
                placeholder="Doctor Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                className="border p-3 w-full rounded-lg"
                placeholder="Specialization"
                value={form.specialization}
                onChange={(e) =>
                  setForm({ ...form, specialization: e.target.value })
                }
              />

              <input
                className="border p-3 w-full rounded-lg"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                className="border p-3 w-full rounded-lg"
                placeholder="Experience (years)"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
              />

            </div>

            {/* FOOTER */}
            <div className="border-t p-4 flex gap-3">

              <button
                onClick={addDoctor}
                className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setOpen(false)}
                className="bg-gray-100 hover:bg-gray-200 w-full py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}