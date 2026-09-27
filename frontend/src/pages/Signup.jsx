import { useState } from "react";
import axios from "axios";

function Signup() {
const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
role: "freelancer",
phone: "",
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
    "http://127.0.0.1:8000/api/signup/",
    formData
  );

  console.log("Signup response:", response.data);

  setMessage(
    response.data?.message ||
      "Account created successfully!"
  );

  setFormData({
    name: "",
    email: "",
    password: "",
    role: "freelancer",
    phone: "",
  });
} catch (error) {
  console.error("Signup error:", error);

  if (error.response) {
    setMessage(
      error.response.data?.message ||
        error.response.data?.error ||
        "Unable to create account."
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

return ( <div className="bg-light min-vh-100">

  {/* NAVBAR */}
  <nav className="navbar navbar-dark sticky-top">
    <div className="container py-3">
      <a href="/" className="navbar-brand">
        Creator<span className="gradient-text">Market</span>
      </a>

      <div className="d-flex align-items-center gap-2">
        <a
          href="/jobs"
          className="nav-link d-none d-md-block px-3"
        >
          Browse Jobs
        </a>

        <a
          href="/login"
          className="btn btn-outline-light"
        >
          Login
        </a>
      </div>
    </div>
  </nav>

  {/* SIGNUP PAGE */}
  <main className="form-page">
    <div className="form-wrapper">

      {/* HEADER */}
      <div className="form-header">
        <span className="badge bg-dark border border-secondary">
          JOIN CREATORMARKET
        </span>

        <h1 className="mt-3 mb-2">
          Create Your{" "}
          <span className="gradient-text">
            Account
          </span>
        </h1>

        <p>
          Join a growing creative community and start
          working on exciting projects.
        </p>
      </div>

      {/* SIGNUP CARD */}
      <div className="form-card">

        {message && (
          <div
            className={`alert ${
              message.toLowerCase().includes("success")
                ? "alert-success"
                : "alert-danger"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="form-label fw-semibold"
            >
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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

          {/* PHONE */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="form-label fw-semibold"
            >
              Phone Number
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          {/* ROLE */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="form-label fw-semibold"
            >
              I want to
            </label>

            <select
              id="role"
              name="role"
              className="form-select"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="freelancer">
                Work as a Freelancer
              </option>

              <option value="creator">
                Hire Creative Professionals
              </option>
            </select>
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
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* ROLE INFO */}
          <div className="p-3 rounded-3 border border-secondary mb-4">
            <div className="d-flex gap-3">
              <div className="fs-4">
                {formData.role === "creator"
                  ? "💼"
                  : "🎨"}
              </div>

              <div>
                <div className="fw-semibold">
                  {formData.role === "creator"
                    ? "Creator Account"
                    : "Freelancer Account"}
                </div>

                <small className="text-muted">
                  {formData.role === "creator"
                    ? "Post creative jobs and find talented professionals."
                    : "Discover creative jobs and submit proposals to clients."}
                </small>
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-3"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account →"}
          </button>

        </form>

        {/* LOGIN LINK */}
        <div className="text-center mt-4">
          <p className="text-muted mb-2">
            Already have an account?
          </p>

          <a
            href="/login"
            className="text-primary fw-semibold"
          >
            Sign in to CreatorMarket →
          </a>
        </div>

      </div>

      {/* FOOTNOTE */}
      <div className="text-center mt-4">
        <small className="text-muted">
          Create your account and start connecting
          with the creative community.
        </small>
      </div>

    </div>
  </main>

</div>

);
}

export default Signup;
