import { TextField, IconButton, Card } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { tipLogo } from "../../assets";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import DownloadIcon from "@mui/icons-material/Download";
import useRouting from "../../components/routes";

import { SERVER_URL } from "../../../Globals";
import AppButtonContained from "../../components/utils/AppButtonContained";

function EvaluationView() {
	const { navigateToEvaluationsPage } = useRouting();

	const { state } = useLocation();
	const [institutionData, setInstitutionData] = useState({});
	const [listOfFiles, setListOfFiles] = useState([]);

	const singleEvaluation = {
		id: state._id,
		ownedBy: state.ownedBy,
		dateOfEvaluation: state.dateOfEvaluation,
		evaluator: state.evaluator,
		governmentAuthority: state.governmentAuthority,
		program: state.program,
	};

	// Filter out ownedBy and dateOfEvaluation keys
	const filteredKeys = Object.keys(singleEvaluation).filter(
		(key) => key !== "ownedBy" && key !== "dateOfEvaluation"
	);

	// Used to get institution data that owns this evaluation entry
	const fetchInstitutionData = async () => {
		// Gets access token from local storage
		const accessToken = localStorage.getItem("accessToken");

		// Sends request to the server
		const response = await fetch(
			SERVER_URL + `/v1/institutions/${state.ownedBy}`,
			{
				method: "GET",
				headers: {
					authorization: `Bearer ${accessToken}`,
				},
			}
		);

		const jsonBody = await response.json();
		setInstitutionData(jsonBody[0]);
	};

	const fetchSavedFiles = async () => {
		// Gets access token from local storage
		const accessToken = localStorage.getItem("accessToken");

		const response = await fetch(SERVER_URL + `/v1/files/${state.ownedBy}/`, {
			method: "GET",
			headers: {
				authorization: `Bearer ${accessToken}`,
			},
		});

		// Get a single entry from the list
		const result = await response.json();
		setListOfFiles([...result]);
	};

	useEffect(() => {
		fetchInstitutionData();
		fetchSavedFiles();
	}, []);

	return (
		<div className="flex justify-center items-center">
			<div className="flex flex-col p-10 w-1/2 justify-center rounded-lg shadow-lg bg-white">
				<image src={tipLogo} className="absolute t-200" />
				<h1>{institutionData.institutionName}</h1>
				<span>Institution ID: {singleEvaluation.ownedBy}</span>
				<span>Evaluation ID: {singleEvaluation.id}</span>
				<span>Date of Evaluation: {singleEvaluation.dateOfEvaluation}</span>
				<div className="flex flex-row gap-10 justify-center">
					<div className="flex flex-1">
						<div className="flex flex-col flex-1 w-1/2 mt-10 gap-5">
							{filteredKeys.map((key, index) => (
								<TextField
									key={index}
									fullWidth
									label={
										key.charAt(0).toUpperCase() +
										key.slice(1).replace(/([A-Z])/g, " $1")
									}
									value={singleEvaluation[key]}
								/>
							))}
						</div>
					</div>
					<div className="flex flex-1">
						<div className="flex-col">
							<span>
								<b>Files</b>
							</span>
							{listOfFiles.length > 0 ? (
								<List>
									{listOfFiles.map((value) => (
										<Card className="mt-4 py-2 px-1">
											<ListItem
												key={value._id}
												secondaryAction={
													<IconButton edge="end">
														<DownloadIcon />
													</IconButton>
												}
												onClick={() => console.log("Downloading!")}>
												{value.filename}
												{value.ext}
											</ListItem>
										</Card>
									))}
								</List>
							) : (
								<p>No Files Uploaded.</p>
							)}
						</div>
					</div>
				</div>
				<div className="mt-8 self-end">
					<AppButtonContained
						label="Back"
						onClick={() => navigateToEvaluationsPage(institutionData)}
					/>
				</div>
			</div>
		</div>
	);
}

export default EvaluationView;
