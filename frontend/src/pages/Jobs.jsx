import { useEffect, useState } from "react";
import api from "../api";

function Jobs() {
const [jobs, setJobs] = useState([]);
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");

useEffect(() => {
fetchJobs();
}, []);

const fetchJobs = async () => {
try {
const response = await api.get(
"/api/jobs/"
);


  console.log("Jobs response:", response.data);

  if (Array.isArray(response.data)) {
    setJobs(response.data);
  } else if (Array.isArray(response.data?.data)) {
    setJobs(response.data.data);
  } else {
    setJobs([]);
  }
} catch (error) {
  console.error("Jobs error:", error);

  if (error.response) {
    setMessage(
      error.response.data?.message ||
        "Unable to load jobs."
    );
  } else {
    setMessage(
      "Unable to connect to the Django server."
    );
  }
} finally {
  setLoading(false);
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

return ( <div className="bg-light min-vh-100">

  {/* NAVBAR */}
  <nav className="navbar navbar-dark sticky-top">
    <div className="container py-3">

      <a
        href="/dashboard"
        className="navbar-brand"
      >
        Creator<span className="gradient-text">
          Market
        </span>
      </a>

      <div className="d-flex align-items-center gap-2">

        <a
          href="/dashboard"
          className="btn btn-outline-light"
        >
          Dashboard
        </a>

        <button
          className="btn btn-outline-light d-none d-md-block"
          onClick={() => {
            localStorage.removeItem(
              "creatorMarketUser"
            );

            window.location.href = "/login";
          }}
        >
          Logout
        </button>

      </div>

    </div>
  </nav>

  {/* JOBS PAGE */}
  <main className="jobs-page">

    <div className="container">

      {/* HEADER */}
      <div className="jobs-header">

        <span className="badge bg-dark border border-secondary">
          CREATIVE MARKETPLACE
        </span>

        <h1 className="mt-3 mb-2">
          Discover{" "}
          <span className="gradient-text">
            Creative Jobs
          </span>
        </h1>

        <p>
          Explore projects from creators looking for
          talented video editors, designers and writers.
        </p>

      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-5">

          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-3 text-muted">
            Finding creative projects...
          </p>

        </div>
      )}

      {/* ERROR */}
      {!loading && message && (
        <div className="form-wrapper">

          <div className="alert alert-danger text-center">
            {message}
          </div>

        </div>
      )}

      {/* NO JOBS */}
      {!loading &&
        !message &&
        jobs.length === 0 && (
          <div className="form-wrapper">

            <div className="form-card text-center">

              <div className="fs-1 mb-3">
                🔎
              </div>

              <h3 className="fw-bold">
                No Jobs Available
              </h3>

              <p className="text-muted">
                There are currently no creative
                projects posted. Check back soon.
              </p>

              <a
                href="/dashboard"
                className="btn btn-primary mt-2"
              >
                Back to Dashboard
              </a>

            </div>

          </div>
        )}

      {/* JOB COUNT */}
      {!loading &&
        !message &&
        jobs.length > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <span className="text-muted">
                Showing{" "}
              </span>

              <strong>
                {jobs.length}
              </strong>

              <span className="text-muted">
                {" "}
                creative{" "}
                {jobs.length === 1
                  ? "project"
                  : "projects"}
              </span>
            </div>

            <span className="badge bg-dark border border-secondary">
              Latest Jobs
            </span>

          </div>
        )}

      {/* JOBS */}
      {!loading &&
        jobs.length > 0 && (
          <div className="jobs-grid">

            {jobs.map((job) => (
              <div
                className="job-card"
                key={job.id}
              >

                {/* TOP */}
                <div className="d-flex justify-content-between align-items-start gap-3 mb-4">

                  <div
                    className="fs-1"
                    style={{
                      lineHeight: "1",
                    }}
                  >
                    {getJobIcon(job.title)}
                  </div>

                  {job.status && (
                    <span className="badge bg-success">
                      {job.status}
                    </span>
                  )}

                </div>

                {/* TITLE */}
                <span className="text-primary fw-semibold small">
                  CREATIVE PROJECT
                </span>

                <h3 className="fw-bold mt-2 mb-3">
                  {job.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-muted">
                  {job.description ||
                    "No description provided."}
                </p>

                {/* CREATOR */}
                {job.creator && (
                  <div className="d-flex align-items-center gap-2 mt-3 mb-4">

                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "36px",
                        height: "36px",
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

                {/* DETAILS */}
                <div className="row g-3 mt-auto">

                  {job.budget !== undefined &&
                    job.budget !== null && (
                      <div className="col-6">

                        <div className="stat-card p-3">

                          <small className="text-muted">
                            BUDGET
                          </small>

                          <div className="fw-bold mt-1">
                            ₹{job.budget}
                          </div>

                        </div>

                      </div>
                    )}

                  {job.deadline && (
                    <div className="col-6">

                      <div className="stat-card p-3">

                        <small className="text-muted">
                          DEADLINE
                        </small>

                        <div className="fw-bold mt-1">
                          {job.deadline}
                        </div>

                      </div>

                    </div>
                  )}

                </div>

                {/* ACTION */}
                <a
                  href={`/jobs/${job.id}`}
                  className="btn btn-primary w-100 mt-4 py-3"
                >
                  View Job Details →
                </a>

              </div>
            ))}

          </div>
        )}

    </div>

  </main>

  {/* FOOTER */}
  <footer className="py-5 border-top border-secondary">

    <div className="container">

      <div className="text-center">

        <h5 className="fw-bold">
          Creator<span className="gradient-text">
            Market
          </span>
        </h5>

        <p className="text-muted mb-0">
          Connecting creators with creative talent.
        </p>

      </div>

      <hr className="border-secondary my-4" />

      <div className="text-center">

        <small className="text-muted">
          CreatorMarket © 2026. All rights reserved.
        </small>

      </div>

    </div>

  </footer>

</div>

);
}

export default Jobs;