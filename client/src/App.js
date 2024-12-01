import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AdminDashboard from "./components/AdminDashboard.js";
import UserDashboard from "./components/UserDashboard.js";
import AdminDashboard from "./components/adminDashboard.js";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
