import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import LogoutBtn from "../btn/LogoutBtn";

function PageNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const { isAuthenticated } = useAuth();

  return (
    <header className="h-[100px] px-5 md:px-10 bg-[#dce4ef] shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff] relative z-20 flex items-center rounded-b-xl">
      <nav className="flex items-center justify-between w-full text-[#333] text-base font-medium">
        <div
          className={`text-parent ${isAuthenticated ? "" : "lg:mr-[140px]"}`}
        >
          <NavLink to="/">
            <img
              src="./todo.png"
              alt="todologo"
              className="size-0 min-h-20 min-w-20 sm:size-0 sm:min-h-25 sm:min-w-25 inline mix-blend-darken"
            />
          </NavLink>
        </div>

        <div className="flex flex-1 items-center space-x-4">
          {["about", "features"].map((page, i) => (
            <NavLink
              key={page}
              to={`/${page}`}
              className={({ isActive }) =>
                `hidden lg:inline-flex items-center px-8 py-1.5 ${
                  i !== 0 ? "ml-5" : "ml-auto"
                } rounded-lg bg-[#dce4ef] text-[#333] hover:text-sky-600
              shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff]
              hover:shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]
              transition-all duration-300 overflow-hidden justify-center w-[100px] ${
                isActive
                  ? "text-sky-600 shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]"
                  : ""
              }`
              }
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </NavLink>
          ))}

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `group relative hidden md:inline-flex items-center px-8 py-1.5 ml-auto rounded-lg bg-[#dce4ef] text-[#333] hover:text-sky-600
              shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff]
              hover:shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]
              transition-all duration-300 overflow-hidden justify-center w-[100px] ${
                isActive
                  ? "text-sky-600 shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]"
                  : ""
              }`
                }
              >
                <span className="relative flex items-center justify-center w-full">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    Login
                  </span>
                  <span className="absolute left-full ml-1 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    &rarr;
                  </span>
                </span>
              </NavLink>

              <div className="h-6 w-px bg-[#333] hidden md:inline"></div>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `group relative hidden md:inline-flex items-center px-8 py-1.5 rounded-lg bg-[#dce4ef] text-[#333] hover:text-sky-600
              shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff]
              hover:shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]
              transition-all duration-300 overflow-hidden justify-center w-[100px] ${
                isActive
                  ? "text-sky-600 shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]"
                  : ""
              }`
                }
              >
                <span className="relative flex items-center justify-center w-full">
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    Signup
                  </span>
                  <span className="absolute left-full ml-2 opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    &rarr;
                  </span>
                </span>
              </NavLink>
            </>
          ) : (
            <LogoutBtn styles="ml-auto hidden md:block" />
          )}
        </div>
      </nav>

      <button
        ref={toggleRef}
        className="lg:hidden ml-3 sm:ml-6 focus:outline-none z-30"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="relative w-6 h-6">
          <Menu
            className={`absolute top-0 left-0 w-6 h-6 transition-all duration-300 transform ${
              menuOpen
                ? "opacity-0 scale-90 rotate-45"
                : "opacity-100 scale-100 rotate-0"
            }`}
          />
          <X
            className={`absolute top-0 left-0 w-6 h-6 transition-all duration-300 transform ${
              menuOpen
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-90 -rotate-45"
            }`}
          />
        </div>
      </button>

      <div
        ref={menuRef}
        className={`absolute top-full right-5 mt-3 w-48 bg-[#dce4ef] shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff] border border-gray-300 rounded-md p-4 flex-col space-y-3 text-base font-medium lg:hidden z-20 transform transition-all duration-300 ease-out ${
          menuOpen
            ? "flex opacity-100 scale-100 translate-y-0"
            : "hidden opacity-0 scale-95 -translate-y-2"
        }`}
      >
        {["about", "features"].map((page) => (
          <NavLink
            key={page}
            to={`/${page}`}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `hover:text-sky-600 p-2 text-center rounded-sm transition-all duration-300
       shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff]
       ${page === "features" ? "md:mb-0" : ""}
       ${
         isActive
           ? "text-sky-600 shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]"
           : ""
       }`
            }
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </NavLink>
        ))}

        {!isAuthenticated ? (
          <>
            <NavLink
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-sky-600 p-2 text-center rounded-sm transition-all duration-300 shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff] block md:hidden ${
                  isActive
                    ? "text-sky-600 shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]"
                    : ""
                }`
              }
            >
              Signup
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-sky-600 p-2 text-center rounded-sm transition-all duration-300 shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff] block md:hidden ${
                  isActive
                    ? "text-sky-600 shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff]"
                    : ""
                }`
              }
            >
              Login
            </NavLink>
          </>
        ) : (
          <div className="flex justify-center">
            <LogoutBtn styles="w-full text-center p-2 rounded-sm shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff] hover:shadow-[inset_4px_4px_10px_#c8d0e7,_inset_-4px_-4px_10px_#ffffff] hover:text-sky-600 transition-all duration-300 block md:hidden" />
          </div>
        )}
      </div>
    </header>
  );
}

export default PageNav;
