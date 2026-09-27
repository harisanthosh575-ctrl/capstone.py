import { useState } from "react";
import axios from "axios";

function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/jobs/create/",
        {
          title: formData.title.trim(),
          description: formData.description.trim(),
          budget: formData.budget,
          deadline: formData.deadline,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Create Job Response:", response.data);

      if (response.data?.success) {
        setMessage("Job created successfully!");

        setFormData({
          title: "",
          description: "",
          budget: "",
          deadline: "",
        });
      } else {
        setMessage(
          response.data?.message || "Unable to create job."
        );
      }
    } catch (error) {
      console.error("Create Job Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Server Response:", error.response.data);

        setMessage(
          error.response.data?.message ||
            "Unable to create job."
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

  return (
    <div className="min-vh-100 bg-light">

      <nav className="navbar navbar-dark bg-dark">
        <div className="container">

          <a
            href="/dashboard"
            className="navbar-brand fw-bold"
          >
            CreatorMarket
          </a>

          <div className="d-flex gap-2">

            <a
              href="/dashboard"
              className="btn btn-outline-light"
            >
              Dashboard
            </a>

            <a
              href="/jobs"
              className="btn btn-outline-light"
            >
              Jobs
            </a>

          </div>

        </div>
      </nav>

      <main className="container py-5">

        <div className="row justify-content-center">

          <div className="col-md-8 col-lg-7">

            <div className="card shadow-sm border-0">

              <div className="card-body p-4 p-md-5">

                <h2 className="fw-bold mb-2">
                  Create a New Job
                </h2>

                <p className="text-muted mb-4">
                  Post your project and find the right
                  creative professional.
                </p>

                {message && (
                  <div className="alert alert-info">
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">

                    <label
                      htmlFor="title"
                      className="form-label fw-semibold"
                    >
                      Job Title
                    </label>

                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="form-control"
                      placeholder="Example: YouTube Video Editing"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label
                      htmlFor="description"
                      className="form-label fw-semibold"
                    >
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      rows="5"
                      placeholder="Describe your project requirements..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-3">

                    <label
                      htmlFor="budget"
                      className="form-label fw-semibold"
                    >
                      Budget
                    </label>

                    <input
                      id="budget"
                      name="budget"
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      placeholder="Example: 5000"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label
                      htmlFor="deadline"
                      className="form-label fw-semibold"
                    >
                      Deadline
                    </label>

                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      className="form-control"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading
                      ? "Creating Job..."
                      : "Create Job"}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default CreateJob;
