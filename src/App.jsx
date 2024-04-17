import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import JobDetails from "./Pages/jobDetails/JobDetails";
import Errors from "./Pages/error/Errors";
import JobPost from "./Pages/JobPost/JobPost";
import ProtectedRoute from "./components/AuthWrapper/ProtectedRoute";
import { useState } from "react";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobDetails/:jobId" element={<JobDetails />} />
        <Route
          path="/create"
          element={
            <ProtectedRoute
              Component={JobPost}
            />
          }
        />

        <Route path="*" element={<Errors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
