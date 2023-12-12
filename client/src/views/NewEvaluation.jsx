import React, { useState } from "react";
import { tipLogo } from "../assets";
import { TextField, Input, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useRouting from "../components/routes";
import InstitutionBlock from "../components/utils/InstitutionBlock";

import { useLocation } from "react-router-dom";

import { SERVER_URL } from "../../Globals";

import AppButtonContained from "../components/utils/AppButtonContained";
import AppButtonOutlined from "../components/utils/AppButtonOutlined";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

function NewEvaluation() {
	// Used for getting the institution id
	const { state } = useLocation();
	const { navigateToEvaluation } = useRouting();

	const [disabled, setDisabled] = useState(false);
	const [evaluationFormData, setEvaluationFormData] = React.useState({
		program: "",
		governmentAuthority: "",
		evaluator: "",
		kindOfVisit: "",
		dateOfEvaluation: null,
	});
	const [uploadedFiles, setUploadedFiles] = React.useState([]);

	const onHandleEvaluationFormChange = ({ name, value }) => {
		setEvaluationFormData({
			...evaluationFormData,
			[name]: value,
		});
	};

	const handleFileChange = (event) => {
		const files = event.target.files;
		setUploadedFiles((currentValue) => [...currentValue, ...files]);
	};

	// Function to submit entries to backend
	const handleSubmit = async () => {
		const accessToken = localStorage.getItem("accessToken");

		// Prepare payload to send for text data
		const payload = {
			ownedBy: state._id,
			dateOfEvaluation: evaluationFormData.dateOfEvaluation.toString(),
			evaluator: evaluationFormData.evaluator,
			governmentAuthority: evaluationFormData.governmentAuthority,
			kindOfVisit: evaluationFormData.kindOfVisit,
			program: evaluationFormData.program,
		};

		const response = await fetch(SERVER_URL + "/v1/evaluations/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearers ${accessToken}`,
			},
			body: JSON.stringify(payload),
		});

		if (response.ok) {
			const jsonBody = await response.json();

			setEvaluationFormData({
				dateOfEvaluation: null,
				evaluator: "",
				governmentAuthority: "",
				kindOfVisit: "",
				program: "",
			});

			console.log("Response ok!");

			// Implement here file upload to backend
			if (uploadedFiles) {
				// Converts files into blobs
				console.log("Uploading files!");

				for (const file of uploadedFiles) {
					const formData = new FormData();
					formData.append("file", file);

					const response = await fetch(
						SERVER_URL + `/v1/files/${jsonBody.ownedBy}`,
						{
							method: "POST",
							headers: {
								authorization: `Bearer ${accessToken}`,
							},
							body: formData,
						}
					);

					if (response.ok) {
						console.log("File uploaded!");
					} else {
						console.error("Error uploading files.");
					}
				}
			}

			navigateToEvaluation(state);
		} else {
			console.log(response.message);
		}
	};

	const singleInstitution = {
		logoSrc: tipLogo,
		institutionName: state.institutionName,
		completeAddress: state.completeAddress,
		city: state.city,
		region: state.region,
	};

	return (
		<>
			<div className="p-3">
				{/*Pass currently viewing institution*/}
				<InstitutionBlock
					logoSrc={singleInstitution.logoSrc}
					institutionName={singleInstitution.institutionName}
					completeAddress={singleInstitution.completeAddress}
					city={singleInstitution.city}
					region={singleInstitution.region}
				/>{" "}
			</div>
			<div className="flex justify-center items-center">
				<div className="flex flex-col p-10 w-1/2 justify-center rounded-lg shadow-lg bg-white">
					<h2 className="text-accent">Add a new evaluation</h2>
					<span>Kindly fill up the form below for institution evaluation.</span>

					<div className="flex flex-col mt-5 gap-5">
						{Object.keys(evaluationFormData).map((fieldName, index) =>
							fieldName === "dateOfEvaluation" ? (
								<DatePicker
									key={index}
									label={
										fieldName.charAt(0).toUpperCase() +
										fieldName.slice(1).replace(/([A-Z])/g, " $1")
									}
									value={evaluationFormData[fieldName]}
									// onChange={handleDateChange}
									onChange={(value) => {
										if (value) {
											const selectedDate = new Date(value);
											const formattedDate = `${
												selectedDate.getMonth() + 1
											}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
											const target = {
												name: "dateOfEvaluation",
												value: formattedDate,
											};
											onHandleEvaluationFormChange(target);
										} else {
											onHandleEvaluationFormChange({
												name: "dateOfEvaluation",
												value: null,
											});
										}
									}}
									renderInput={(params) => <TextField {...params} fullWidth />}
								/>
							) : (
								<TextField
									key={index}
									fullWidth
									label={
										fieldName.charAt(0).toUpperCase() +
										fieldName.slice(1).replace(/([A-Z])/g, " $1")
									}
									value={evaluationFormData[fieldName]}
									name={fieldName}
									onChange={(event) =>
										onHandleEvaluationFormChange(event.target)
									}
								/>
							)
						)}
						<div className="flex flex-row gap-3">
							<Button
								component={"label"}
								className="w-60"
								variant={"contained"}
								startIcon={<CloudUpload />}
								onChange={handleFileChange}>
								Upload file
								<VisuallyHiddenInput type="file" />
							</Button>
							{/* Display uploaded file names */}
							{uploadedFiles.length === 0 ? (
								<div className="self-center">No Files Selected</div>
							) : (
								<div className="w-3/4 overflow-hidden self-center">
									<span className="truncate">
										{Array.from(uploadedFiles)
											.map((file) => file.name)
											.join(", ")}
									</span>
								</div>
							)}
						</div>
					</div>
					<div className="flex flex-row mt-5 justify-end gap-2">
						<AppButtonContained
							label="Submit"
							onClick={async () => {
								setDisabled(true);
								await handleSubmit();
								setDisabled(false);
							}}
						/>
						<AppButtonOutlined
							label="Cancel"
							onClick={() => navigateToEvaluation(state)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default NewEvaluation;
