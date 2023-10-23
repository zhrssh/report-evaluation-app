import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "@mui/material";

import EvaluationModal from "../components/modals/EvaluationModal";
import EvaluationTable from "../components/tables/EvaluationTable";
import { getEvaluationsList } from "../modules/evaluationsList.js";
import Header from "../components/Header";
import InstitutionBlock from "../components/InstitutionBlock";
import SearchBar from "../components/SearchBar";

export default function EvaluationList() {
	const [rows, setRows] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);

	/**
	 * Fetches data from the backend by using the evaluations list module
	 */
	async function fetchData() {
		const data = await getEvaluationsList();
		if (data) setRows(data);
	}

	useEffect(function () {
		// Fetches data from the backend
		fetchData();
	});

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
			<EvaluationTable rows={rows} />
			<Dialog open={isModalOpen} onClose={handleClose}>
				<EvaluationModal closeModalCallback={handleClose} />
			</Dialog>
		</>
	);
}
