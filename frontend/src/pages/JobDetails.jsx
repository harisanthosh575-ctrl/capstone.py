
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { logout } from "../api";

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [proposal, setProposal] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/api/jobs/");
        const jobs = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];
        const selectedJob = jobs.find(
          (item) => String(item.id) === String(jobId)
        );

        if (!cancelled) {
          if (!selectedJob) {
            setError("Job not found.");
          } else {
            setJob(selectedJob);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              err.response?.data?.detail ||
              "Unable to load job details."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchJob();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  const handleApply = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!proposal.trim()) {
      setError("Please enter your proposal.");
      return;
    }

    // Check logged-in user
    let storedUser = null;

    try {
      const storedData = localStorage.getItem("creatorMarketUser");

      if (storedData) {
        storedUser = JSON.parse(storedData);
      }
    } catch {
      storedUser = null;
    }

    const user = storedUser?.data || storedUser;

    if (!user) {
      setError("Please login before applying.");
      return;
    }

    if (user.role !== "freelancer") {
      setError("Only freelancers can apply for jobs.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await api.post(
        `/api/jobs/${jobId}/apply/`,
        {
          proposal: proposal.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        setMessage(
          response.data.message ||
            "Application submitted successfully."
        );

        setProposal("");
      } else {
        setError(
          response.data?.message ||
            response.data?.detail ||
            "Unable to submit application."
        );
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Your login session has expired. Please login again.");
      } else if (err.response?.status === 403) {
        setError(
          err.response?.data?.detail ||
            err.response?.data?.message ||
            "You are not authorized to apply for this job."
        );
      } else {
        setError(
          err.response?.data?.message ||
            err.response?.data?.detail ||
            "Unable to submit application."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login";
    } catch {
      setError("Unable to log out. Please try again.");
    }
  };

  const getJobIcon = (title = "") => {
    const lowerTitle = title.toLowerCase();

    if (
      lowerTitle.includes("video") ||
      lowerTitle.includes("edit")
    ) {
      return "🎬";
    }

    if (
      lowerTitle.includes("design") ||
      lowerTitle.includes("graphic") ||
      lowerTitle.includes("ui")
    ) {
      return "🎨";
    }

    if (
      lowerTitle.includes("script") ||
      lowerTitle.includes("writing") ||
      lowerTitle.includes("writer")
    ) {
      return "✍️";
    }

    return "✨";
  };

  if (loading) {
    return (
      <div className="bg-light min-vh-100">
        <nav className="navbar navbar-dark sticky-top">
          <div className="container py-3">
            <a href="/dashboard" className="navbar-brand">
              Creator{" "}
              <span className="gradient-text">
                Market
              </span>
            </a>
          </div>
        </nav>

        <main className="form-page">
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="mt-3 text-muted">
              Loading job details...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="bg-light min-vh-100">
        <nav className="navbar navbar-dark sticky-top">
          <div className="container py-3">
            <a href="/dashboard" className="navbar-brand">
              Creator{" "}
              <span className="gradient-text">
                Market
              </span>
            </a>
          </div>
        </nav>

        <main className="form-page">
          <div className="form-wrapper">
            <div className="form-card text-center">
              <div className="fs-1 mb-3">
                😕
              </div>

              <h3 className="fw-bold">
                Job Not Found
              </h3>

              <p className="text-muted">
                {error}
              </p>

              <button
                className="btn btn-primary mt-2"
                onClick={() => navigate("/jobs")}
              >
                ← Back to Jobs
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100">

      {/* NAVBAR */}
      <nav className="navbar navbar-dark sticky-top">
        <div className="container py-3">

          <a
            href="/dashboard"
            className="navbar-brand"
          >
            Creator{" "}
            <span className="gradient-text">
              Market
            </span>
          </a>

          <div className="d-flex align-items-center gap-2">

            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/jobs")}
            >
              ← Jobs
            </button>

            <button
              className="btn btn-outline-light d-none d-md-block"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="jobs-page">

        <div className="container">

          <div className="mb-4">
            <button
              className="btn btn-link text-muted p-0"
              onClick={() => navigate("/jobs")}
            >
              ← Back to all jobs
            </button>
          </div>

          <div className="row g-4 align-items-start">

            {/* JOB INFORMATION */}
            <div className="col-lg-7">

              <div className="job-card">

                <div className="d-flex justify-content-between align-items-start gap-3">

                  <div className="fs-1">
                    {getJobIcon(job.title)}
                  </div>

                  {job.status && (
                    <span className="badge bg-success">
                      {job.status}
                    </span>
                  )}

                </div>

                <span className="text-primary fw-semibold small d-block mt-4">
                  CREATIVE PROJECT
                </span>

                <h1 className="fw-bold mt-2 mb-3">
                  {job.title}
                </h1>

                <p className="text-muted fs-5">
                  {job.description ||
                    "No description provided."}
                </p>

                {job.creator && (
                  <div className="d-flex align-items-center gap-3 mt-4">

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "48px",
                        height: "48px",
                        background:
                          "rgba(124, 58, 237, 0.15)",
                      }}
                    >
                      👤
                    </div>

                    <div>
                      <small className="text-muted">
                        Posted by
                      </small>

                      <div className="fw-semibold">
                        {job.creator}
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* PROJECT INFORMATION */}
              <div className="card mt-4">

                <div className="card-body p-4">

                  <span className="text-primary fw-semibold">
                    PROJECT INFORMATION
                  </span>

                  <h3 className="fw-bold mt-2 mb-4">
                    Job Details
                  </h3>

                  <div className="row g-4">

                    <div className="col-md-6">
                      <div className="stat-card">

                        <div className="fs-3 mb-2">
                          💰
                        </div>

                        <small className="text-muted">
                          PROJECT BUDGET
                        </small>

                        <div className="stat-number mt-1">
                          ₹{job.budget}
                        </div>

                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="stat-card">

                        <div className="fs-3 mb-2">
                          📅
                        </div>

                        <small className="text-muted">
                          DEADLINE
                        </small>

                        <div className="fw-bold fs-5 mt-2">
                          {job.deadline}
                        </div>

                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="stat-card">

                        <div className="fs-3 mb-2">
                          📊
                        </div>

                        <small className="text-muted">
                          PROJECT STATUS
                        </small>

                        <div className="mt-2">
                          <span className="badge bg-success">
                            {job.status || "Open"}
                          </span>
                        </div>

                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="stat-card">

                        <div className="fs-3 mb-2">
                          🎯
                        </div>

                        <small className="text-muted">
                          PROJECT TYPE
                        </small>

                        <div className="fw-bold mt-2">
                          Creative Project
                        </div>

                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* APPLICATION */}
            <div className="col-lg-5">

              <div className="form-card">

                <span className="text-primary fw-semibold">
                  FREELANCER APPLICATION
                </span>

                <h2 className="fw-bold mt-2 mb-2">
                  Apply for this Job
                </h2>

                <p className="text-muted">
                  Tell the creator why you're the
                  right person for this project.
                </p>

                {message && (
                  <div className="alert alert-success mt-4">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger mt-4">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleApply}
                  className="mt-4"
                >

                  <div className="mb-4">

                    <label
                      htmlFor="proposal"
                      className="form-label fw-semibold"
                    >
                      Your Proposal
                    </label>

                    <textarea
                      id="proposal"
                      name="proposal"
                      className="form-control"
                      rows="9"
                      placeholder="Explain your experience, skills, approach and why you are suitable for this project..."
                      value={proposal}
                      onChange={(e) => {
                        setProposal(e.target.value);
                        setError("");
                      }}
                      required
                    />

                    <small className="text-muted d-block mt-2">
                      Tip: Mention relevant experience,
                      skills and how you would approach
                      the project.
                    </small>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-3"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting Application..."
                      : "Submit Application →"}
                  </button>

                </form>

              </div>

              {/* PROPOSAL TIPS */}
              <div className="card mt-4">

                <div className="card-body p-4">

                  <h5 className="fw-bold">
                    💡 Proposal Tips
                  </h5>

                  <div className="d-flex gap-3 mt-3">
                    <span className="text-primary">
                      ✓
                    </span>

                    <small className="text-muted">
                      Explain your relevant experience.
                    </small>
                  </div>

                  <div className="d-flex gap-3 mt-2">
                    <span className="text-primary">
                      ✓
                    </span>

                    <small className="text-muted">
                      Mention the skills you bring.
                    </small>
                  </div>

                  <div className="d-flex gap-3 mt-2">
                    <span className="text-primary">
                      ✓
                    </span>

                    <small className="text-muted">
                      Describe how you would handle
                      the project.
                    </small>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-5 border-top border-secondary">

        <div className="container text-center">

          <h5 className="fw-bold">
            Creator{" "}
            <span className="gradient-text">
              Market
            </span>
          </h5>

          <p className="text-muted mb-0">
            Connecting creators with creative talent.
          </p>

          <hr className="border-secondary my-4" />

          <small className="text-muted">
            CreatorMarket © 2026. All rights reserved.
          </small>

        </div>

      </footer>

    </div>
  );
}

export default JobDetails;
