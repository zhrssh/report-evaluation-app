import React from "react";
import InstitutionTable from "../components/utils/InstitutionTable.jsx";
import institutionsData from "../components/data/dummy.js";

import { SERVER_URL } from "../../Globals.js";

function HomePage() {
	const [rows, setRows] = React.useState([]);

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		// Gets access token from session storage
		const accessToken = sessionStorage.getItem("accessToken");

		// Sends request to the server
		const response = await fetch(SERVER_URL + "/v1/institutions", {
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		setRows(response.json());
	};

	return (
		<div className="p-5">
			<h1>List of Institutions</h1>
			<InstitutionTable rows={rows} />
		</div>
	);
}

export default HomePage;
