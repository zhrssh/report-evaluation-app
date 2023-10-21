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

	async function handleSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
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
						id="evaluator"
						variant="filled"
						label="Evaluator"
						helperText="Enter the institution's evaluator."
						fullWidth
						required
					/>
					<TextField
						id="program"
						variant="filled"
						label="Program"
						helperText="Enter the institution's applied program."
						fullWidth
						required
					/>
					<TextField
						id="governmentAuthority"
						variant="filled"
						label="Government Applied Form"
						helperText="Enter the institution's applied government authority."
						fullWidth
						required
					/>
					<TextField
						id="kindOfVisit"
						variant="filled"
						label="Kind of Visit"
						helperText="E.g. Evaluation, etc."
						fullWidth
						required
					/>
					<DialogContentText className="mt-4 mb-2">
						Date of Evaluation
					</DialogContentText>
					<DatePicker value={date} onChange={(value) => setDate(value)} />
					<DialogContentText className="mt-4 mb-2">
						File Attachments
					</DialogContentText>
					<input
						id="fileUpload"
						type="file"
						accept="image/*, application/msword, application/pdf"
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
						<AppButtonContained
							startIcon={null}
							label="Create"
							onClick={() => console.log("Not yet implemented")}
						/>
					</DialogActions>
				</DialogContent>
			</Box>
		</>
	);
}

export default React.forwardRef(EvaluationModal);
