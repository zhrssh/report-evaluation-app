import React from "react";
import InstitutionTable from "../../components/utils/InstitutionTable.jsx";
import institutionsData from "../../components/data/dummy.js";
import AppButtonContained from "../../components/utils/AppButtonContained.jsx";
import { TextField } from "@mui/material";
import useRouting from "../../components/routes.jsx";

import { SERVER_URL } from "../../../Globals.js";

function HomePage() {
	const [rows, setRows] = React.useState([]);
	const [searchQuery, setSearchQuery] = React.useState("");

	const { navigateToCreateInstitution } = useRouting();

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// Gets access token from local storage
		const accessToken = localStorage.getItem("accessToken");

		// Sends request to the server
		const response = await fetch(SERVER_URL + "/v1/institutions/", {
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		setRows(await response.json());
	};

	// Function to handle search input change
	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// Function to filter rows based on search query
	const filteredRows = rows.filter((row) => {
		// Customize this filtering logic according to your data structure
		const isIncluded =
			row.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			row.completeAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
			row.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
			row.region.toLowerCase().includes(searchQuery.toLowerCase());

		if (isIncluded) return row;
	});

	return (
		<div className="p-5">
			<h2>List of Institutions</h2>
			<div className="flex flex-row justify-between mt-2 items-center md:shrink-0">
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
						onClick={() => navigateToCreateInstitution()}
					/>
				</div>
			</div>
			<InstitutionTable rows={filteredRows} />
		</div>
	);
}

export default HomePage;
