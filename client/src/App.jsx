import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import LandingPage from "./views/LandingPage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import RegistrationPage from "./views/RegistrationPage.jsx";
import HomePage from "./views/HomePage.jsx";
import EvaluationPage from "./views/EvaluationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Layout withHeader={<LoginPage />} />} />
        <Route
          path="/registration"
          element={<Layout withHeader={<RegistrationPage />} />}
        />
        <Route
          path="/home"
          index
          element={<Layout withHeader={<HomePage />} />}
        />
        <Route
          path="/evaluations"
          element={<Layout withHeader={<EvaluationPage />} />}
        />
        <Route path="/add-institution" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
