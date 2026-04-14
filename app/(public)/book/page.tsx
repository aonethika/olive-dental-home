"use client";

import { useEffect, useState } from "react";
import { Phone, Stethoscope } from "lucide-react";

export default function Book() {
  const [doctors, setDoctors] = useState<any[]>([]);

  const phone = process.env.NEXT_PUBLIC_PHONE || "8089905095";

  useEffect(() => {
    fetch("/api/admin/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors || []));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-emerald-50 pt-10 pb-16">
      <section className="max-w-6xl mx-auto px-4">

     
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-950">
            Book Appointment
          </h1>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Call us to book your appointment quickly and easily.
          </p>
        </div>

      
        <div className="flex justify-center mb-12">
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 bg-emerald-700 text-white px-7 py-3 rounded-2xl shadow-md hover:bg-emerald-800 hover:scale-105 transition"
          >
            <Phone size={18} />
            <span className="font-semibold">Call: {phone}</span>
          </a>
        </div>

       
        <div className="flex items-center justify-center gap-2 mb-8">
          <Stethoscope className="text-emerald-700" />
          <h2 className="text-xl font-semibold text-emerald-800">
            Available Doctors
          </h2>
        </div>

   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {doctors.map((d) => (
            <div
              key={d._id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex justify-between items-start mb-5">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Dr. {d.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {d.specialization}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    d.isActive
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {d.isActive ? "Available" : "Offline"}
                </span>
              </div>

     
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">Phone:</span>{" "}
                  {d.phone || "Not available"}
                </p>
              </div>

   
              <div className="mt-5">
                <a
                  href={`tel:${phone}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-xl font-medium hover:bg-emerald-700 transition"
                >
                  <Phone size={16} />
                  Call Clinic
                </a>
              </div>

            </div>
          ))}

        </div>

      </section>
    </main>
  );
}