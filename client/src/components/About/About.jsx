import { useEffect, useState } from "react";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <main className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-[#dce4ef] px-6">
      <section
        className={`max-w-3xl text-center p-8 rounded-2xl bg-[#dce4ef] shadow-[8px_8px_16px_#c8d0e7,_-8px_-8px_16px_#ffffff] transform transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-[#333] mb-6">
          About the Project
        </h1>
        <p className="mt-4 text-sm text-gray-500 italic">
          I almost bought a domain. That's how serious I was.
        </p>
      </section>
    </main>
  );
}

export default About;
