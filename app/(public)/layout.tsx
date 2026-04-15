"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);  
    const t2 = setTimeout(() => setStage(2), 700);  
    const t3 = setTimeout(() => setStage(3), 2000); 

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (stage < 3) {
    return (
      <div className="fixed inset-0 bg-emerald-900 text-white overflow-hidden z-50 flex flex-col items-center justify-center">

        {/* TEXT */}
        <div
          className={`text-center transition-all duration-1000 ${
            stage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
        <h1 className="text-3xl sm:text-5xl font-bold tracking-wider leading-tight text-center">
  <span className="text-emerald-300 font-black italic drop-shadow-md">
    O
  </span>
  <span className="font-medium">live</span>

  {/* line break only on mobile */}
  <br className="sm:hidden" />

  <span className="text-white sm:ml-2">
    Dental Home
  </span>
</h1>

          <p className="text-emerald-200 mt-2 text-sm sm:text-base">
            Healthy Smile, Better Life
          </p>
        </div>

        {/* TOOTH */}
      <div
  className={`absolute left-1/2 -translate-x-1/2 text-6xl sm:text-7xl transition-all duration-1000 ease-out z-0 ${
    stage >= 2
      ? "top-[62%] sm:top-[58%] opacity-100"
      : "top-[-120px] opacity-0"
  }`}
>
  🦷
</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}