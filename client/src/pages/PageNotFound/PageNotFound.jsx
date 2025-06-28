import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Clock from "../../components/Clock/Clock";
import PageNav from "../../components/PageNav/PageNav";

export default function PageNotFound() {
  const navigate = useNavigate();
  const [float, setFloat] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setFloat((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#dce4ef] flex items-center justify-center px-6">
      <section className="text-center space-y-8 sm:space-y-10">
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          {[4, null, 4].map((char, i) =>
            char === null ? (
              <Clock key={i} size={90} />
            ) : (
              <span
                key={i}
                className="text-[6rem] sm:text-[7rem] lg:text-[8rem] font-extrabold text-[#dce4ef]
        [text-shadow:-4px_-4px_6px_#ffffff,_4px_4px_6px_#b6c6d8] select-none"
              >
                {char}
              </span>
            )
          )}
        </div>

        <h1 className="text-[clamp(1.5rem,5vw,2.5rem)] font-semibold text-[#dce4ef] leading-snug tracking-tight select-none max-w-[90vw] sm:max-w-xl mx-auto">
          <span className="block mb-1 [text-shadow:-1px_-1px_2px_#ffffff,_2px_2px_4px_#b8c6d9]">
            This page doesn’t exist.
          </span>
          <span className="block text-[0.9em] opacity-95 [text-shadow:-1px_-1px_2px_#ffffff,_2px_2px_4px_#b8c6d9]">
            But your to-do still does.
          </span>
        </h1>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 text-sm sm:text-base font-semibold rounded-full text-[#5c6570] bg-[#dce4ef]
    shadow-[6px_6px_12px_#bcc8d8,_-6px_-6px_12px_#ffffff]
    hover:shadow-[inset_4px_4px_10px_#cad8e7,_inset_-4px_-4px_10px_#ffffff]
    transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#94a3b8]"
        >
          ← Go back home
        </button>
      </section>
    </main>
  );
}
