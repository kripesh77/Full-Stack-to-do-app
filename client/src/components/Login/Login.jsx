import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toaster from "../Toaster/Toaster";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsVisible(true), []);

  const { setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setError({
        id: Date.now(),
        message: "Both email and password are required.",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:2000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError({
          id: Date.now(),
          message: data.message || "Login failed. Please try again.",
        });
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", JSON.stringify(data.token));
      setError({
        id: Date.now(),
        message: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        setIsAuthenticated(true);
        navigate("/app");
      }, 2000);
    } catch (error) {
      setError({
        id: Date.now(),
        message: "Something went wrong. Please try again later.",
      });
      setIsLoading(false);
    }
  }

  return (
    <main className="flex items-center justify-center bg-[#dce4ef] px-6 py-20 min-h-screen">
      <form
        className={`w-full max-w-md p-10 rounded-2xl bg-[#dce4ef] shadow-[8px_8px_16px_#c8d0e7,_-8px_-8px_16px_#ffffff] transform transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-[#333] mb-6 text-center">
          Login
        </h2>

        <div className="relative mb-5">
          <input
            type="email"
            id="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full px-4 pt-5 pb-2 text-sm rounded-lg bg-[#dce4ef] text-[#333] shadow-[inset_6px_6px_12px_#c8d0e7,_inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-invalid={!!error}
            required
          />
          <label
            htmlFor="email"
            className={`absolute left-4 text-sm text-gray-600 transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-600
          ${email ? "top-1 text-xs text-gray-600" : ""}
        `}
          >
            Email
          </label>
        </div>

        <div className="relative mb-5">
          <input
            type="password"
            id="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full px-4 pt-5 pb-2 text-sm rounded-lg bg-[#dce4ef] text-[#333] shadow-[inset_6px_6px_12px_#c8d0e7,_inset_-6px_-6px_12px_#ffffff] focus:outline-none focus:ring-2 focus:ring-gray-300"
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-4 text-sm text-gray-600 transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-gray-600
          ${password ? "top-1 text-xs text-gray-600" : ""}
        `}
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-[#dce4ef] text-[#333] shadow-[8px_8px_16px_#c8d0e7,_-8px_-8px_16px_#ffffff] hover:shadow-[inset_6px_6px_12px_#c8d0e7,_inset_-6px_-6px_12px_#ffffff] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="mt-4 text-base text-center">
          <span>Don't have an account?</span>
          <br />
          <span
            className="mt-1 text-blue-600 underline hover:no-underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </div>
      </form>

      <div aria-live="assertive">
        {error?.message && (
          <Toaster
            key={error.id}
            message={error.message}
            borderColor="#f87171"
          />
        )}
      </div>
    </main>
  );
}

export default Login;
