function Home() {
return ( <div className="bg-light min-vh-100">

  {/* ================= NAVBAR ================= */}
  <nav className="navbar navbar-dark sticky-top">
    <div className="container py-3">

      <a
        href="/"
        className="navbar-brand"
      >
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

        <a
          href="/signup"
          className="btn btn-primary"
        >
          Get Started
        </a>

      </div>

    </div>
  </nav>


  {/* ================= HERO ================= */}
  <section className="hero-section">

    <div className="container">

      <div className="text-center">

        <div className="mb-4">

          <span className="badge bg-dark border border-secondary px-3 py-2">
            ✦ THE CREATIVE TALENT MARKETPLACE
          </span>

        </div>

        <h1 className="fw-bold mb-4">

          Turn Your{" "}

          <span className="gradient-text">
            Creative Ideas
          </span>

          <br />

          Into Reality.

        </h1>

        <p className="lead text-muted mx-auto mb-4">

          Connect with talented video editors, designers,
          and scriptwriters who can bring your next project
          to life.

        </p>

        <div className="d-flex justify-content-center flex-wrap gap-3">

          <a
            href="/jobs"
            className="btn btn-primary btn-lg px-4"
          >
            Explore Jobs →
          </a>

          <a
            href="/signup"
            className="btn btn-outline-light btn-lg px-4"
          >
            Start Creating
          </a>

        </div>


        {/* HERO STATS */}

        <div className="row justify-content-center g-4 mt-5">

          <div className="col-6 col-md-3">

            <div className="text-center">

              <div className="stat-number">
                100+
              </div>

              <div className="text-muted">
                Creative Jobs
              </div>

            </div>

          </div>


          <div className="col-6 col-md-3">

            <div className="text-center">

              <div className="stat-number">
                50+
              </div>

              <div className="text-muted">
                Freelancers
              </div>

            </div>

          </div>


          <div className="col-6 col-md-3">

            <div className="text-center">

              <div className="stat-number">
                3
              </div>

              <div className="text-muted">
                Creative Fields
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>


  {/* ================= CREATIVE CATEGORIES ================= */}

  <section className="section">

    <div className="container">

      <div className="section-header">

        <span className="text-primary fw-semibold">
          CREATIVE TALENT
        </span>

        <h2 className="mt-2">
          Find the Right Creative Professional
        </h2>

        <p>
          Hire skilled professionals for every stage
          of your creative project.
        </p>

      </div>


      <div className="row g-4">


        {/* VIDEO EDITORS */}

        <div className="col-md-4">

          <div className="feature-box">

            <div className="fs-1">
              🎬
            </div>

            <h4 className="fw-bold mt-3">
              Video Editors
            </h4>

            <p className="text-muted">

              Create professional YouTube videos,
              Instagram reels, advertisements,
              documentaries and more.

            </p>

            <a
              href="/jobs"
              className="text-primary fw-semibold"
            >
              Find Video Editors →
            </a>

          </div>

        </div>


        {/* DESIGNERS */}

        <div className="col-md-4">

          <div className="feature-box">

            <div className="fs-1">
              🎨
            </div>

            <h4 className="fw-bold mt-3">
              Designers
            </h4>

            <p className="text-muted">

              Work with creative designers for
              branding, posters, social media,
              UI designs and visual content.

            </p>

            <a
              href="/jobs"
              className="text-primary fw-semibold"
            >
              Find Designers →
            </a>

          </div>

        </div>


        {/* SCRIPTWRITERS */}

        <div className="col-md-4">

          <div className="feature-box">

            <div className="fs-1">
              ✍️
            </div>

            <h4 className="fw-bold mt-3">
              Scriptwriters
            </h4>

            <p className="text-muted">

              Find writers for video scripts,
              advertisements, storytelling,
              social media and content creation.

            </p>

            <a
              href="/jobs"
              className="text-primary fw-semibold"
            >
              Find Writers →
            </a>

          </div>

        </div>

      </div>

    </div>

  </section>


  {/* ================= PLATFORM PREVIEW ================= */}

  <section className="section">

    <div className="container">

      <div className="row align-items-center g-5">


        <div className="col-lg-6">

          <span className="text-primary fw-semibold">
            BUILT FOR CREATORS
          </span>

          <h2 className="fw-bold display-6 mt-2">
            One place to manage
            your creative projects.
          </h2>

          <p className="text-muted mt-3">

            CreatorMarket makes it simple for creators
            to post projects, receive proposals and
            connect with skilled freelancers.

          </p>


          <div className="mt-4">

            <div className="d-flex gap-3 mb-4">

              <div className="fs-4">
                ✓
              </div>

              <div>

                <h6 className="fw-bold mb-1">
                  Simple Job Posting
                </h6>

                <p className="text-muted mb-0">
                  Describe your project and publish it
                  in just a few minutes.
                </p>

              </div>

            </div>


            <div className="d-flex gap-3 mb-4">

              <div className="fs-4">
                ✓
              </div>

              <div>

                <h6 className="fw-bold mb-1">
                  Receive Proposals
                </h6>

                <p className="text-muted mb-0">
                  Freelancers can discover your project
                  and submit applications.
                </p>

              </div>

            </div>


            <div className="d-flex gap-3">

              <div className="fs-4">
                ✓
              </div>

              <div>

                <h6 className="fw-bold mb-1">
                  Choose Your Talent
                </h6>

                <p className="text-muted mb-0">
                  Review applications and select the
                  right professional for your project.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* PREVIEW CARD */}

        <div className="col-lg-6">

          <div className="card p-3">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <small className="text-muted">
                    CREATIVE PROJECT
                  </small>

                  <h5 className="fw-bold mb-0">
                    YouTube Video Editing
                  </h5>

                </div>

                <span className="badge bg-success">
                  Open
                </span>

              </div>


              <div className="feature-box text-start mb-3">

                <div className="d-flex align-items-center gap-3">

                  <div className="fs-2">
                    🎬
                  </div>

                  <div>

                    <h6 className="fw-bold mb-1">
                      Video Editor Needed
                    </h6>

                    <small className="text-muted">
                      YouTube • Editing • Motion Graphics
                    </small>

                  </div>

                </div>

              </div>


              <div className="row g-3">

                <div className="col-6">

                  <div className="stat-card">

                    <small className="text-muted">
                      BUDGET
                    </small>

                    <div className="fw-bold mt-1">
                      ₹5,000
                    </div>

                  </div>

                </div>


                <div className="col-6">

                  <div className="stat-card">

                    <small className="text-muted">
                      PROPOSALS
                    </small>

                    <div className="fw-bold mt-1">
                      12
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </section>


  {/* ================= HOW IT WORKS ================= */}

  <section className="section">

    <div className="container">

      <div className="section-header">

        <span className="text-primary fw-semibold">
          SIMPLE PROCESS
        </span>

        <h2 className="mt-2">
          How CreatorMarket Works
        </h2>

        <p>
          Get your creative project moving in
          three simple steps.
        </p>

      </div>


      <div className="row g-4">


        <div className="col-md-4">

          <div className="stat-card text-center">

            <span className="badge bg-primary">
              STEP 01
            </span>

            <div className="fs-1 my-3">
              📝
            </div>

            <h4 className="fw-bold">
              Post Your Job
            </h4>

            <p className="text-muted mb-0">

              Tell freelancers about your project,
              requirements, budget and deadline.

            </p>

          </div>

        </div>


        <div className="col-md-4">

          <div className="stat-card text-center">

            <span className="badge bg-primary">
              STEP 02
            </span>

            <div className="fs-1 my-3">
              💬
            </div>

            <h4 className="fw-bold">
              Receive Proposals
            </h4>

            <p className="text-muted mb-0">

              Skilled freelancers discover your job
              and submit their proposals.

            </p>

          </div>

        </div>


        <div className="col-md-4">

          <div className="stat-card text-center">

            <span className="badge bg-primary">
              STEP 03
            </span>

            <div className="fs-1 my-3">
              🚀
            </div>

            <h4 className="fw-bold">
              Start Collaborating
            </h4>

            <p className="text-muted mb-0">

              Select the right freelancer and
              start working on your project.

            </p>

          </div>

        </div>

      </div>

    </div>

  </section>


  {/* ================= CTA ================= */}

  <section className="section">

    <div className="container">

      <div className="card text-center p-5">

        <span className="text-primary fw-semibold">
          READY TO CREATE?
        </span>

        <h2 className="fw-bold mt-2">
          Bring Your Next Idea to Life.
        </h2>

        <p className="text-muted mx-auto mt-3 mb-4">
          Join CreatorMarket and connect with
          talented creative professionals.
        </p>

        <div>

          <a
            href="/signup"
            className="btn btn-primary btn-lg px-5"
          >
            Get Started →
          </a>

        </div>

      </div>

    </div>

  </section>


  {/* ================= FOOTER ================= */}

  <footer className="py-5 border-top border-secondary">

    <div className="container">

      <div className="row g-4 align-items-center">

        <div className="col-md-6">

          <h5 className="fw-bold">
            Creator<span className="gradient-text">
              Market
            </span>
          </h5>

          <p className="text-muted mb-0">
            Connecting creators with creative talent.
          </p>

        </div>


        <div className="col-md-6">

          <div className="d-flex justify-content-md-end justify-content-center gap-4">

            <a
              href="/jobs"
              className="text-muted"
            >
              Jobs
            </a>

            <a
              href="/login"
              className="text-muted"
            >
              Login
            </a>

            <a
              href="/signup"
              className="text-muted"
            >
              Signup
            </a>

          </div>

        </div>

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

export default Home;
