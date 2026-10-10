import { useState } from "react";
import { logout } from "../api";

function Dashboard() {
const [user, setUser] = useState(() => {
  const storedUser = localStorage.getItem("creatorMarketUser");
  if (!storedUser) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedUser);
    return parsed.data || parsed;
  } catch {
    return null;
  }
});
const [logoutError, setLogoutError] = useState("");
const [loggingOut, setLoggingOut] = useState(false);

if (!user) {
return ( <div className="bg-light min-vh-100"> <nav className="navbar navbar-dark sticky-top"> <div className="container py-3"> <a href="/" className="navbar-brand">
Creator<span className="gradient-text">Market</span> </a> </div> </nav>

    <main className="form-page">
      <div className="form-wrapper text-center">
        <div className="form-card">
          <div className="fs-1 mb-3">🔐</div>

          <h2 className="fw-bold">
            Please Login First
          </h2>

          <p className="text-muted mt-2 mb-4">
            Sign in to access your CreatorMarket
            dashboard.
          </p>

          <a
            href="/login"
            className="btn btn-primary px-5"
          >
            Go to Login →
          </a>
        </div>
      </div>
    </main>
  </div>
);

}

const isCreator = user.role === "creator";
const isFreelancer = user.role === "freelancer";

const handleLogout = async () => {
setLoggingOut(true);
setLogoutError("");

try {
  await logout();
  setUser(null);
  window.location.href = "/login";
} catch {
  setLogoutError("Unable to log out. Please try again.");
  setLoggingOut(false);
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
          Jobs
        </a>

        <button
          className="btn btn-outline-light"
          onClick={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>

    </div>
  </nav>

  {logoutError && (
    <div className="container pt-3">
      <div className="alert alert-danger" role="alert">
        {logoutError}
      </div>
    </div>
  )}

  {/* DASHBOARD */}
  <main className="dashboard-page">
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="dashboard-header">

        <span className="badge bg-dark border border-secondary">
          {isCreator
            ? "CREATOR WORKSPACE"
            : "FREELANCER WORKSPACE"}
        </span>

        <h1 className="mt-3 mb-2">
          Welcome,{" "}
          <span className="gradient-text">
            {user.name}
          </span>{" "}
          👋
        </h1>

        <p className="text-muted mb-3">
          {isCreator
            ? "Manage your creative projects and find the right talent."
            : "Discover creative opportunities and showcase your skills."}
        </p>

        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
          <span className="badge bg-primary text-uppercase">
            {user.role}
          </span>

          <span className="text-muted">
            {user.email}
          </span>
        </div>

      </div>

      {/* QUICK STATS */}
      <div className="row g-4 mb-5">

        <div className="col-md-4">
          <div className="stat-card text-center">
            <div className="fs-2 mb-2">
              {isCreator ? "📋" : "🔎"}
            </div>

            <div className="stat-number">
              {isCreator ? "Jobs" : "Explore"}
            </div>

            <div className="text-muted">
              {isCreator
                ? "Create and manage projects"
                : "Find creative opportunities"}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card text-center">
            <div className="fs-2 mb-2">
              💬
            </div>

            <div className="stat-number">
              Proposals
            </div>

            <div className="text-muted">
              {isCreator
                ? "Review freelancer applications"
                : "Track your applications"}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="stat-card text-center">
            <div className="fs-2 mb-2">
              {isCreator ? "🚀" : "🎨"}
            </div>

            <div className="stat-number">
              {isCreator ? "Projects" : "Portfolio"}
            </div>

            <div className="text-muted">
              {isCreator
                ? "Grow your creative projects"
                : "Showcase your creative work"}
            </div>
          </div>
        </div>

      </div>

      {/* CREATOR DASHBOARD */}
      {isCreator && (
        <section>

          <div className="section-header mb-5">
            <span className="text-primary fw-semibold">
              CREATOR TOOLS
            </span>

            <h2 className="mt-2">
              Manage Your Creative Projects
            </h2>

            <p>
              Everything you need to post jobs and
              connect with talented freelancers.
            </p>
          </div>

          <div className="row g-4">

            {/* CREATE JOB */}
            <div className="col-md-4">
              <div className="feature-box text-start">

                <div className="fs-1">
                  📝
                </div>

                <h4 className="fw-bold mt-3">
                  Post a Job
                </h4>

                <p className="text-muted">
                  Create a project with your
                  requirements, budget and deadline.
                </p>

                <a
                  href="/create-job"
                  className="btn btn-primary mt-2"
                >
                  Create Job →
                </a>

              </div>
            </div>

            {/* MANAGE JOBS */}
            <div className="col-md-4">
              <div className="feature-box text-start">

                <div className="fs-1">
                  📂
                </div>

                <h4 className="fw-bold mt-3">
                  Manage Jobs
                </h4>

                <p className="text-muted">
                  Browse your posted jobs and
                  manage your creative projects.
                </p>

                <a
                  href="/jobs"
                  className="btn btn-outline-light mt-2"
                >
                  View Jobs →
                </a>

              </div>
            </div>

            {/* APPLICATIONS */}
            <div className="col-md-4">
              <div className="feature-box text-start">

                <div className="fs-1">
                  💬
                </div>

                <h4 className="fw-bold mt-3">
                  Applications
                </h4>

                <p className="text-muted">
                  Review freelancer proposals and
                  find the right talent.
                </p>

                <a
                  href="/applications"
                  className="btn btn-outline-light mt-2"
                >
                  View Applications →
                </a>

              </div>
            </div>

          </div>

        </section>
      )}

      {/* FREELANCER DASHBOARD */}
      {isFreelancer && (
        <section>

          <div className="section-header mb-5">
            <span className="text-primary fw-semibold">
              FREELANCER TOOLS
            </span>

            <h2 className="mt-2">
              Find Your Next Creative Project
            </h2>

            <p>
              Discover jobs, submit proposals and
              build your creative portfolio.
            </p>
          </div>

          <div className="row g-4">

            {/* BROWSE JOBS */}
            <div className="col-md-4">
              <div className="feature-box text-start">

                <div className="fs-1">
                  🔎
                </div>

                <h4 className="fw-bold mt-3">
                  Browse Jobs
                </h4>

                <p className="text-muted">
                  Discover creative projects that
                  match your skills and interests.
                </p>

                <a
                  href="/jobs"
                  className="btn btn-primary mt-2"
                >
                  Browse Jobs →
                </a>

              </div>
            </div>

            {/* APPLICATIONS */}
            <div className="col-md-4">
              <div className="feature-box text-start">

                <div className="fs-1">
                  📩
                </div>

                <h4 className="fw-bold mt-3">
                  My Applications
                </h4>

                <p className="text-muted">
                  Track the projects you have applied
                  for and monitor your proposals.
                </p>

                <a
                  href="/applications"
                  className="btn btn-outline-light mt-2"
                >
                  My Applications →
                </a>

              </div>
            </div>

            {/* PORTFOLIO */}
            <div className="col-md-4">
              <div className="feature-box text-start">

                <div className="fs-1">
                  🎨
                </div>

                <h4 className="fw-bold mt-3">
                  My Portfolio
                </h4>

                <p className="text-muted">
                  Showcase your previous creative work
                  to potential clients.
                </p>

                <a
                  href="/portfolio"
                  className="btn btn-outline-light mt-2"
                >
                  View Portfolio →
                </a>

              </div>
            </div>

          </div>

        </section>
      )}

      {/* ACCOUNT INFO */}
      <section className="section pb-0">

        <div className="card">
          <div className="card-body p-4">

            <div className="row align-items-center g-4">

              <div className="col-md-8">

                <span className="text-primary fw-semibold">
                  ACCOUNT
                </span>

                <h4 className="fw-bold mt-2 mb-1">
                  {user.name}
                </h4>

                <p className="text-muted mb-0">
                  {user.email}
                </p>

              </div>

              <div className="col-md-4 text-md-end">

                <span className="badge bg-primary text-uppercase">
                  {user.role}
                </span>

              </div>

            </div>

          </div>
        </div>

      </section>

    </div>
  </main>

</div>

);
}

export default Dashboard;
