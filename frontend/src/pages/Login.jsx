
import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/login/`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login response:", response.data);

      // Store user information for React
      localStorage.setItem(
        "creatorMarketUser",
        JSON.stringify(response.data)
      );

      setMessage("Login successful!");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);
    } catch (error) {
      console.error("Login error:", error);
      console.error("Login response:", error.response?.data);

      if (error.response) {
        setMessage(
          error.response.data?.message ||
            error.response.data?.error ||
            error.response.data?.detail ||
            "Invalid email or password."
        );
      } else {
        setMessage(
          "Unable to connect to the Django server. Make sure the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">

      {/* NAVBAR */}
      <nav className="navbar navbar-dark sticky-top">
        <div className="container py-3">

          <a href="/" className="navbar-brand">
            Creator
            <span className="gradient-text">
              Market
            </span>
          </a>

          <div className="d-flex align-items-center gap-2">

            <a
              href="/jobs"
              className="nav-link d-none d-md-block px-3"
            >
              Browse Jobs
            </a>

            <a
              href="/signup"
              className="btn btn-primary"
            >
              Get Started
            </a>

          </div>
        </div>
      </nav>

      {/* LOGIN PAGE */}
      <main className="form-page">

        <div className="form-wrapper">

          {/* HEADER */}
          <div className="form-header">

            <span className="badge bg-dark border border-secondary">
              WELCOME BACK
            </span>

            <h1 className="mt-3 mb-2">
              Welcome to{" "}
              <span className="gradient-text">
                CreatorMarket
              </span>
            </h1>

            <p>
              Sign in to manage your creative projects
              and connect with talented professionals.
            </p>

          </div>

          {/* LOGIN CARD */}
          <div className="form-card">

            {message && (
              <div
                className={`alert ${
                  message === "Login successful!"
                    ? "alert-success"
                    : "alert-danger"
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="mb-4">

                <label
                  htmlFor="email"
                  className="form-label fw-semibold"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PASSWORD */}
              <div className="mb-4">

                <label
                  htmlFor="password"
                  className="form-label fw-semibold"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-3"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "Sign In →"}
              </button>

            </form>

            {/* DIVIDER */}
            <div className="d-flex align-items-center gap-3 my-4">

              <div className="flex-grow-1 border-top border-secondary"></div>

              <span className="text-muted small">
                OR
              </span>

              <div className="flex-grow-1 border-top border-secondary"></div>

            </div>

            {/* SIGNUP */}
            <div className="text-center">

              <p className="text-muted mb-2">
                Don't have an account?
              </p>

              <a
                href="/signup"
                className="text-primary fw-semibold"
              >
                Create a free account →
              </a>

            </div>

          </div>

          {/* FOOTNOTE */}
          <div className="text-center mt-4">

            <small className="text-muted">
              By continuing, you agree to use
              CreatorMarket responsibly and
              professionally.
            </small>

          </div>

        </div>
      </main>

    </div>
  );
}

export default Login;
