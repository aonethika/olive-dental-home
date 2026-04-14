import Link from "next/link";

export default function Services() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        
        <h1 className="text-3xl sm:text-5xl font-semibold text-emerald-950 text-center mb-4">
          Our Dental Services
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-sm sm:text-base">
          We provide complete dental care with modern equipment and expert treatment
          for all age groups.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          
          {[
            [
              "Teeth Cleaning",
              "Professional cleaning to remove plaque and maintain oral hygiene.",
            ],
            [
              "Root Canal Treatment",
              "Pain-free treatment to save infected or damaged teeth.",
            ],
            [
              "Dental Implants",
              "Permanent solution for missing teeth with natural appearance.",
            ],
            [
              "Tooth Extraction",
              "Safe removal of damaged or decayed teeth.",
            ],
            [
              "Braces & Aligners",
              "Orthodontic treatment to straighten teeth and improve smile.",
            ],
            [
              "Cosmetic Dentistry",
              "Smile enhancement procedures including whitening and shaping.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="p-6 rounded-xl border border-gray-100 bg-white hover:shadow-md transition"
            >
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {title}
              </h2>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/book"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition"
          >
            Book Appointment
          </Link>
        </div>

      </section>
    </main>
  );
}