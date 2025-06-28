import { useEffect, useState } from "react";

function Toaster({ message, type = "info", onClose }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  const colors = {
    success: "#a3d9a5",
    error: "#f9a8a8",
    info: "#cdd9ed",
  };

  const dotColor = colors[type] || colors.info;

  useEffect(() => {
    setVisible(true);

    const hideTimeout = setTimeout(() => setExiting(true), 2500);
    const removeTimeout = setTimeout(() => {
      onClose?.();
    }, 3000);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(removeTimeout);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 flex items-start gap-3 px-6 py-4 max-w-sm
        rounded-xl bg-[#dce4ef] text-[#333] text-sm
        transition-all duration-500 ease-in-out transform 
        shadow-[8px_8px_16px_#c8d0e7,_-8px_-8px_16px_#ffffff]
        ${
          visible && !exiting
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
      `}
      style={{ zIndex: 50 }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="w-3 h-3 mt-1 rounded-full"
        style={{ backgroundColor: dotColor, flexShrink: 0 }}
      ></div>

      <span>{message}</span>
    </div>
  );
}

export default Toaster;
