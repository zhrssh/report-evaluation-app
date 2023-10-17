import React, { useState } from "react";
import { Modal } from "@mui/material";

import EvaluationModal from "../components/modals/EvaluationModal";
import EvaluationTable from "../components/tables/EvaluationTable";
import Header from "../components/Header";
import InstitutionBlock from "../components/InstitutionBlock";
import SearchBar from "../components/SearchBar";

export default function EvaluationList() {
	const [isModalOpen, setIsModalOpen] = useState(true);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Header />
			<InstitutionBlock />
			<SearchBar createCallback={openModal} />
			<EvaluationTable />
			<Modal open={isModalOpen} onClose={closeModal}>
				<EvaluationModal closeModalCallback={closeModal} />
			</Modal>
		</>
	);
}
