import React, { useRef, useState } from "react";
import { Dialog } from "@mui/material";

import EvaluationModal from "../components/modals/EvaluationModal";
import EvaluationTable from "../components/tables/EvaluationTable";
import Header from "../components/Header";
import InstitutionBlock from "../components/InstitutionBlock";
import SearchBar from "../components/SearchBar";

export default function EvaluationList() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpen = () => {
		setIsModalOpen(true);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Header />
			<InstitutionBlock />
			<SearchBar createButtonCallback={handleOpen} />
			<EvaluationTable />
			<Dialog open={isModalOpen} onClose={handleClose}>
				<EvaluationModal closeModalCallback={handleClose} />
			</Dialog>
		</>
	);
}
