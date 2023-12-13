import React from "react";
import EvaluationTable from "../../components/utils/EvaluationTable.jsx";
import AppButtonContained from "../../components/utils/AppButtonContained.jsx";
import { TextField } from "@mui/material";
import InstitutionBlock from "../../components/utils/InstitutionBlock.jsx";
import { tipLogo } from "../../assets/index.js";
import useRouting from "../../components/routes.jsx";

import { useLocation } from "react-router-dom";

import { SERVER_URL } from "../../../Globals.js";

function EvaluationPage() {
	// Used for fetching row data from navigate()
	const { state } = useLocation();

	const [rows, setRows] = React.useState([]);
	const [searchQuery, setSearchQuery] = React.useState("");

	const { navigateToCreateEvaluation } = useRouting();

	const singleInstitution = {
		logoSrc: tipLogo,
		institutionName: state.institutionName,
		completeAddress: state.completeAddress,
		city: state.city,
		region: state.region,
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// Gets access token from session storage
		const accessToken = localStorage.getItem("accessToken");

		// Sends request to the server
		const response = await fetch(SERVER_URL + `/v1/evaluations/${state._id}/`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		const data = await response.json();
		setRows(data);
	};

	// Function to handle search input change
	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// Function to filter rows based on search query
	const filteredRows = rows.filter((row) => {
		// Customize this filtering logic according to your data structure
		const isIncluded =
			row.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
			row.evaluator.toLowerCase().includes(searchQuery.toLowerCase());

		if (isIncluded) return row;
	});

	const refresh = () => {
		fetchData();
	};

	return (
		<div className="p-5">
			{/*Pass currently viewing institution*/}
			<InstitutionBlock
				logoSrc={singleInstitution.logoSrc}
				institutionName={singleInstitution.institutionName}
				completeAddress={singleInstitution.completeAddress}
				city={singleInstitution.city}
				region={singleInstitution.region}
			/>

			<div className="flex flex-row justify-between mt-5 items-center md:shrink-0">
				<TextField
					className="w-5/6 md:4/5"
					label="Search"
					id="search"
					value={searchQuery}
					onChange={handleSearchInputChange}
				/>
				<div className="flex justify-end gap-2 md:w-full">
					<AppButtonContained
						label="Create"
						onClick={() => navigateToCreateEvaluation(state)}
					/>
				</div>
			</div>

			<EvaluationTable rows={filteredRows} refresh={refresh} />
		</div>
	);
}

export default EvaluationPage;
