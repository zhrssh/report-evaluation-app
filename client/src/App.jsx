import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import LandingPage from "./views/LandingPage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import RegistrationPage from "./views/RegistrationPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route
                    path="/login"
                    element={<Layout withHeader={<LoginPage />} />}
                />
                <Route
                    path="/register"
                    element={<Layout withHeader={<RegistrationPage />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
