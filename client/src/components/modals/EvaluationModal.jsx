import React from "react";
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import AppButtonContained from "../buttons/AppButtonContained";

function EvaluationModal(props, ref) {
	const [date, setDate] = React.useState(null);
	const [files, setFiles] = React.useState([]);

	// Saves files in an array
	async function handleFiles(e) {
		const newFiles = e.target.files;
		setFiles((current) => [...current, ...newFiles]);
	}

	// Submits the entry to the server
	async function handleSubmit(e) {
		e.preventDefault();

		// Gets the entered data from the form
		let message = {};
		let formData;

		formData = new FormData(e.currentTarget);
		for (const pair of formData.entries()) {
			message[pair[0]] = pair[1];
		}

		// Add date to the message
		message["dateOfEvaluation"] = date.format("MM/DD/YYYY");

		// Send data to backend
		try {
			let response;
			response = await fetch("http://127.0.0.1:3000/v1/eval/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(message),
			});

			// If successful response, check if files were uploaded
			if (response.status == 200 && files.length > 0) {
				const { id } = await response.json();

				// Clear formdata and append new files
				formData = new FormData();
				for (let i = 0; i < files.length; i++) {
					formData.append("files", files[i]);
				}

				response = await fetch(`http://127.0.0.1:3000/v1/eval/upload/${id}`, {
					method: "POST",
					body: formData,
				});
			}
		} catch (err) {
			console.log(err);
		}

		// Closes the form after submitting
		props.closeModalCallback();
	}

	return (
		<>
			<Box component="form" onSubmit={handleSubmit}>
				<DialogTitle>Add New Evaluation</DialogTitle>
				<DialogContent className="gap-2">
					<DialogContentText className="mb-2">
						Fill up the required fields.
					</DialogContentText>
					<TextField
						name="evaluator"
						variant="filled"
						label="Evaluator"
						helperText="Enter the institution's evaluator."
						fullWidth
						required
					/>
					<TextField
						name="program"
						variant="filled"
						label="Program"
						helperText="Enter the institution's applied program."
						fullWidth
						required
					/>
					<TextField
						name="governmentAuthority"
						variant="filled"
						label="Government Applied Form"
						helperText="Enter the institution's applied government authority."
						fullWidth
						required
					/>
					<TextField
						name="kindOfVisit"
						variant="filled"
						label="Kind of Visit"
						helperText="E.g. Evaluation, etc."
						fullWidth
						required
					/>
					<DialogContentText className="mt-4 mb-2">
						Date of Evaluation*
					</DialogContentText>
					<DatePicker
						value={date}
						onChange={(value) => setDate(value)}
						slotProps={{
							textField: {
								required: true,
							},
						}}
					/>
					<DialogContentText className="mt-4 mb-2">
						File Attachments
					</DialogContentText>
					<input
						id="fileUpload"
						type="file"
						accept="image/*, application/msword, application/pdf"
						onChange={handleFiles}
						multiple
					/>
					<DialogActions>
						<Button
							variant="outlined"
							startIcon={null}
							className="rounded-full border-red-700 text-red-700"
							onClick={() => props.closeModalCallback()}>
							<Typography variant="button">Cancel</Typography>
						</Button>
						<AppButtonContained type="submit" startIcon={null} label="Create" />
					</DialogActions>
				</DialogContent>
			</Box>
		</>
	);
}

export default React.forwardRef(EvaluationModal);
