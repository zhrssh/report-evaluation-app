import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

import AppButtonContained from "../buttons/AppButtonContained";

export default function EvaluationModal({ closeModalCallback }) {
	return (
		<>
			f
			<Box className="flex items-center justify-center self-center">
				<Box className="bg-primary rounded-xl p-8">
					<Typography variant="h4" className="font-bold text-center mb-8">
						Add New Evaluation
					</Typography>
					<Box className="flex flex-col min-w-[560px] gap-4 mx-8">
						<Typography variant="caption" className="flex-1 font-bold">
							Evaluation Details
						</Typography>
						<TextField
							className="rounded-xl"
							id="program"
							variant="filled"
							label="Program"
							helperText="Enter the institution's applied program."
							fullWidth
							required
						/>
						<TextField
							className="rounded-xl"
							id="governmentAuthority"
							variant="filled"
							label="Government Applied Form"
							helperText="Enter the institution's applied government authority."
							fullWidth
							required
						/>
						<TextField
							className="rounded-xl"
							id="kindOfDegree"
							variant="filled"
							label="Kind of Degree"
							helperText="E.g. Baccalaureate, Masteral, or Doctorate"
							fullWidth
							required
						/>
						<Typography variant="caption" className=" font-bold">
							Date of Evaluation
						</Typography>
						<Box className="flex flex-row gap-2">
							<TextField
								className="flex-1 rounded-xl"
								id="month"
								variant="filled"
								label="Month"
								fullWidth
								required
							/>
							<TextField
								className="flex-1 rounded-xl"
								id="day"
								variant="filled"
								label="Day"
								fullWidth
								required
							/>
							<TextField
								className="flex-1 rounded-xl"
								id="year"
								variant="filled"
								label="Year"
								fullWidth
								required
							/>
						</Box>
						<Typography variant="caption" className=" font-bold">
							File Attachments
						</Typography>
						<input
							id="fileUpload"
							type="file"
							accept="image/*, application/msword, application/pdf"
							multiple
						/>
						<Box className="flex flex-row gap-4 justify-end ">
							<Button
								variant="outlined"
								startIcon={null}
								className="rounded-full border-red-700 text-red-700"
								onClick={() => closeModalCallback()}>
								<Typography variant="button">Cancel</Typography>
							</Button>
							<AppButtonContained
								props={{
									startIcon: null,
									label: "Create",
									callback: closeModalCallback,
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	);
}
