import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import LogoutIcon from "../LogoutIcon/LogoutIcon";

function LogoutBtn({ styles = "" }) {
  const { setIsAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  function handleClick() {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/login");
    }, 2000);
  }
  return (
    <>
      <button
        onClick={handleClick}
        className={`${styles} group relative px-6 py-1.5 rounded-lg bg-[#e0e5ec] text-[red] shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff] transition-all duration-300 overflow-hidden hover:shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]`}
      >
        <span className="relative flex items-center justify-center w-full">
          <span className="transition-transform duration-300 group-hover:translate-x-3">
            {isLoggingOut ? "Logging Out..." : "Logout"}
          </span>
          <span className="absolute right-full opacity-0 translate-x-[-6px] transition-all duration-300 group-hover:right-[calc(100%-0.4rem)] group-hover:opacity-100 group-hover:translate-x-0">
            <LogoutIcon />
          </span>
        </span>
      </button>
    </>
  );
}

export default LogoutBtn;
