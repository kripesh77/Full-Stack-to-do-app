import { useState, useEffect } from "react";

export default function NeumorphicClock({ size = 96 }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = (time.getHours() % 12) + minutes / 60;

  const secDeg = (seconds / 60) * 360;
  const minDeg = (minutes / 60) * 360;
  const hrDeg = (hours / 12) * 360;

  const radius = size / 2;

  return (
    <div
      className="relative rounded-full bg-[#dce4ef] flex items-center justify-center"
      style={{
        width: size,
        height: size,
        boxShadow:
          "inset 6px 6px 10px #c5cede, inset -6px -6px 10px #ffffff, 2px 2px 8px #c2cce0, -2px -2px 8px #ffffff",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="text-[#8a96ab]"
      >
        <circle
          cx={radius}
          cy={radius}
          r={radius - 4}
          fill="#dce4ef"
          stroke="#d3dfea"
          strokeWidth="1"
        />

        <line
          x1={radius}
          y1={radius}
          x2={radius + (radius - 22) * Math.sin((hrDeg * Math.PI) / 180)}
          y2={radius - (radius - 22) * Math.cos((hrDeg * Math.PI) / 180)}
          stroke="#60738c"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <line
          x1={radius}
          y1={radius}
          x2={radius + (radius - 14) * Math.sin((minDeg * Math.PI) / 180)}
          y2={radius - (radius - 14) * Math.cos((minDeg * Math.PI) / 180)}
          stroke="#7e91a8"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <line
          x1={radius}
          y1={radius}
          x2={radius + (radius - 10) * Math.sin((secDeg * Math.PI) / 180)}
          y2={radius - (radius - 10) * Math.cos((secDeg * Math.PI) / 180)}
          stroke="#9aa8bc"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#5f6c85]" />
    </div>
  );
}
