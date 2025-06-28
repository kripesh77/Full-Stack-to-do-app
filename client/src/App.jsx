import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));
const Todo = lazy(() => import("./components/Todo/Todo"));
const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const SignupLayout = lazy(() => import("./pages/SignupLayout/SignupLayout"));
const AboutLayout = lazy(() => import("./pages/AboutLayout/AboutLayout"));
const LoginLayout = lazy(() => import("./pages/LoginLayout/LoginLayout"));

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(
    function () {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAuthenticated(true);
      }
    },
    [setIsAuthenticated]
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route index path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutLayout />} />
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/app" /> : <LoginLayout />}
          />
          <Route
            path="signup"
            element={
              isAuthenticated ? <Navigate to="/app" /> : <SignupLayout />
            }
          />
          <Route
            path="/app"
            element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" />}
          >
            <Route index element={<Navigate to="todo" />} />
            <Route path="todo" element={<Todo />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
