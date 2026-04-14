import Link from "next/link";
import { Phone, MapPin, CalendarCheck } from "lucide-react";

export default function Contact() {
  const phone = process.env.NEXT_PUBLIC_PHONE || "8089905095";

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-gray-100">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-3">

        <div className="text-center mb-12 mt-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-emerald-950">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Olive Dental Home — Care you can trust, smiles you can feel.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col items-center text-center">

            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Phone className="text-emerald-700" />
            </div>

            <p className="text-gray-500 text-sm">Call Now</p>

            <a
              href={`tel:${phone}`}
              className="text-2xl font-bold text-emerald-700 mt-2 hover:scale-105 transition"
            >
              {phone}
            </a>

            <p className="text-xs text-gray-400 mt-2">
              Available for appointments & emergencies
            </p>

          </div>

          <div className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col items-center text-center">

            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <MapPin className="text-emerald-700" />
            </div>

            <p className="text-gray-500 text-sm">Visit Us</p>

            <p className="text-lg font-semibold text-gray-800 mt-2">
              Calicut, Kerala
            </p>

            <a
              href="https://maps.app.goo.gl/oQkjYomV1txzUzEy9"
              target="_blank"
              className="text-emerald-700 font-semibold mt-2 hover:underline"
            >
              Open in Google Maps →
            </a>

          </div>

        </div>

        <div className="mt-10 bg-emerald-700 rounded-2xl p-8 text-center text-white shadow-md">

          <h2 className="text-2xl font-bold mb-2">
            Need Immediate Appointment?
          </h2>

          <p className="text-emerald-100 text-sm mb-5">
            Click below to book your visit in seconds
          </p>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            <CalendarCheck size={18} />
            Book Appointment
          </Link>

        </div>

      </section>
    </main>
  );
}