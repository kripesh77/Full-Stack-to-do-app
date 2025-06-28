import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toaster from "../Toaster/Toaster";
import FloatingInput from "../../components/FloatingInput/FloatingInput";

function Signup() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setIsVisible(true), []);

  async function handleSubmit(e) {
    e.preventDefault();

    const newFieldErrors = {
      name:
        name.trim().length < 3
          ? "Name must be at least 3 characters long"
          : undefined,
      email: !email.match(/^\S+@\S+\.\S+$/)
        ? "Invalid email format"
        : undefined,
      password:
        password.length < 6
          ? "Password must be at least 6 characters long"
          : undefined,
    };

    setFieldErrors(newFieldErrors);

    if (Object.values(newFieldErrors).some((error) => error)) return;

    try {
      setIsLoading(true);
      const res = await fetch(`https://to-do-app-sxge.onrender.com/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok || data.message === "Email already exists") {
        setError({
          id: Date.now(),
          message: data.message || "Something went wrong. Please try again.",
        });
        setIsLoading(false);
        setTimeout(() => setError(null), 2000);
        return;
      }

      if (data.message === "You're signed up") {
        setError({
          id: Date.now(),
          message: "Signup successful! Redirecting to login...",
        });
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      setError({ id: Date.now(), message: data.message || "Signup failed" });
    } catch (err) {
      setError({
        id: Date.now(),
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#dce4ef] px-6 py-20">
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-10 rounded-2xl bg-[#dce4ef] shadow-[8px_8px_16px_#c8d0e7,_-8px_-8px_16px_#ffffff] transform transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        <h2 className="text-2xl font-semibold text-[#333] mb-6 text-center">
          Signup
        </h2>

        <FloatingInput
          id="name"
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setFieldErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={fieldErrors.name}
          required
        />

        <FloatingInput
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={fieldErrors.email}
          required
        />

        <FloatingInput
          id="password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={fieldErrors.password}
          required
        />

        <button
          type="submit"
          className="w-full cursor-pointer py-2 rounded-lg bg-[#dce4ef] text-[#333]
          shadow-[8px_8px_16px_#c8d0e7,_-8px_-8px_16px_#ffffff]
          hover:shadow-[inset_6px_6px_12px_#c8d0e7,_inset_-6px_-6px_12px_#ffffff]
          transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Signup"}
        </button>

        <div className="mt-4 text-base text-center">
          <span>Already have an account?</span>
          <br />
          <span
            className="mt-1 text-blue-600 underline hover:no-underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>

      <div aria-live="polite">
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

export default Signup;
