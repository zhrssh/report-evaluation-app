import { useNavigate } from "react-router-dom";

const useRouting = () => {
	const navigate = useNavigate();

	// Function to route to LoginPage
	const navigateToLogin = (opts) => {
		navigate("/login", { state: { ...opts } });
	};

	// Function to route to RegistrationPage
	const navigateToRegistration = (opts) => {
		navigate("/registration", { state: { ...opts } });
	};

	// Function to route to Home
	const navigateToHome = (opts) => {
		navigate("/home", { state: { ...opts } });
	};

	// Function to route to Home
	const navigateToEvaluation = (opts) => {
		navigate("/evaluations", { state: { ...opts } });
	};

	const navigateToCreateInstitution = (opts) => {
		navigate("/add-institution", { state: { ...opts } });
	};

	const navigateToCreateEvaluation = (opts) => {
		navigate("/add-evaluation", { state: { ...opts } });
	};

	return {
		navigateToLogin,
		navigateToRegistration,
		navigateToHome,
		navigateToEvaluation,
		navigateToCreateInstitution,
		navigateToCreateEvaluation,
	};
};

export default useRouting;
