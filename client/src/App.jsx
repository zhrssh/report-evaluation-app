import "./App.css";
import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import NavBar from "./components/NavBar";
import EvaluationModal from "./components/modals/EvaluationModal";
import EvaluationTable from "./components/tables/EvaluationTable";
import SearchBar from "./components/SearchBar";
import InstitutionBlock from "./components/InstitutionBlock";

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="app-container">
			<NavBar />
			<InstitutionBlock />
			<SearchBar />
			<EvaluationTable />
			<Modal open={isModalOpen} onClose={closeModal}>
				<EvaluationModal />
			</Modal>
		</div>
	);
}

export default App;
