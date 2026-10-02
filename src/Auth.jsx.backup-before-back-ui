import { useAuth } from "./AuthContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Auth() {
  const navigate = useNavigate();
const { setLoggedInUser } = useAuth();
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    email: "",
    password: "",
    display_name: "",
    role: "traveler",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = mode === "login";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin
        ? "/api/auth/login"
        : "/api/auth/register";

      const body = isLogin
        ? {
            email: form.email,
            password: form.password,
          }
        : {
            email: form.email,
            password: form.password,
            display_name: form.display_name,
            role: form.role,
          };

      const response = await fetch(
        `http://localhost:3000${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log("LOGIN STATUS:", response.status);
console.log("LOGIN DATA:", data);
      if (!response.ok) {
        const details = Array.isArray(data.details)
          ? data.details.join(", ")
          : "";

        throw new Error(
          details || data.error || "Something went wrong."
        );
      }
setLoggedInUser(data.user);
navigate("/");
    } catch (err) {
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function switchMode() {
    setMode(isLogin ? "register" : "login");
    setError("");
  }

  return (
    <div className="auth-page">
      <div className="auth-glow"></div>

      <Link to="/" className="auth-logo">
        Roamly
      </Link>

      <main className="auth-container">
        <section className="auth-card">
          <div className="auth-header">
            <span className="auth-eyebrow">
              {isLogin ? "WELCOME BACK" : "JOIN ROAMLY"}
            </span>

            <h1>
              {isLogin
                ? "Welcome back."
                : "Start your journey."}
            </h1>

            <p>
              {isLogin
                ? "Log in to continue your Roamly experience."
                : "Create an account and discover new experiences."}
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <label className="auth-field">
                  <span>Display name</span>

                  <input
                    type="text"
                    name="display_name"
                    value={form.display_name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="auth-field">
                  <span>Account type</span>

                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="traveler">
                      Traveler
                    </option>

                    <option value="host">
                      Host
                    </option>
                  </select>
                </label>
              </>
            )}

            <label className="auth-field">
              <span>Email</span>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete={
                  isLogin
                    ? "current-password"
                    : "new-password"
                }
                minLength={8}
                required
              />
            </label>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Log in"
                  : "Create account"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="auth-switch"
            onClick={switchMode}
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </section>
      </main>
    </div>
  );
}

export default Auth;
