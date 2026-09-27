import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import CreateJob from "./pages/CreateJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetails />} />
        <Route path="/create-job" element={<CreateJob />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
