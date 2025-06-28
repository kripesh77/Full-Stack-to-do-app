import { NavLink } from "react-router-dom";
import LogoutBtn from "../btn/LogoutBtn";

function TodoNav() {
  return (
    <header className="h-[100px] px-5 md:px-10 bg-[#dce4ef] shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff] relative z-20 flex items-center rounded-b-xl">
      <nav className="flex items-center justify-between w-full text-[#333] text-base font-medium">
        <div className="text-parent lg:mr-[132px]">
          <NavLink to="/">
            <img
              src="../todo.png"
              alt="todologo"
              className="size-0 min-h-20 min-w-20 sm:size-0 sm:min-h-25 sm:min-w-25 inline mix-blend-darken"
            />
          </NavLink>
        </div>
        <div className="justify-self-end">
          <LogoutBtn />
        </div>
      </nav>
    </header>
  );
}

export default TodoNav;
