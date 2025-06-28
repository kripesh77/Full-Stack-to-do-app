import TodoNav from "../../components/TodoNav/TodoNav";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <TodoNav />
      <Outlet />
    </>
  );
}

export default AppLayout;
