import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout";
import LandingPage from "./views/LandingPage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import RegistrationPage from "./views/RegistrationPage.jsx";
import InstitutionPage from "./views/institutions/InstitutionPage.jsx";
import NewInstitution from "./views/institutions/NewInstitution.jsx";
import EvaluationPage from "./views/evaluations/EvaluationPage.jsx";
import NewEvaluation from "./views/evaluations/NewEvaluation.jsx";
import EvaluationView from "./views/evaluations/EvaluationView.jsx";

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
					element={<Layout withHeader={<InstitutionPage />} />}
				/>
				<Route
					path="/evaluations"
					element={<Layout withHeader={<EvaluationPage />} />}
				/>
				<Route
					path="/add-institution"
					element={<Layout withHeader={<NewInstitution />} />}
				/>
				<Route
					path="/add-evaluation"
					element={<Layout withHeader={<NewEvaluation />} />}
				/>
				<Route
					path="/view-evaluation"
					element={<Layout withHeader={<EvaluationView />} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
