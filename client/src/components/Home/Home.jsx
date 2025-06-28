import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4 sm:px-6 md:px-0 py-12 bg-[#dce4ef]">
      <section
        className={`flex flex-col items-center text-center max-w-xl w-full transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p
          className={`text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] font-medium text-[#333] leading-tight sm:leading-snug mb-10 sm:mb-14 px-2 sm:px-0 transition-all duration-1000 ${
            isVisible ? "translate-y-0" : "translate-y-3 opacity-0"
          }`}
        >
          Ready to manage your everyday tasks?
        </p>

        <button
          onClick={() => navigate("/app")}
          className={`px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg bg-[#dce4ef] text-[#333]
            shadow-[6px_6px_12px_#c8d0e7,_-6px_-6px_12px_#ffffff]
            hover:shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#94a3b8]
            transition-all duration-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
        >
          Get Started
        </button>
      </section>
    </main>
  );
}

export default Home;
