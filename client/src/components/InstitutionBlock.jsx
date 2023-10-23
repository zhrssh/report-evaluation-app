import { Box, Paper, Typography } from "@mui/material";
import React from "react";

import tipLogo from "../assets/tip.png";

export default function InstitutionBlock() {
	return (
		<>
			<Paper
				variant="outlined"
				className="border-2 border-gray-500 rounded-xl flex p-4 mx-16 my-4 gap-4 justify-between items-center shadow-lg">
				<Box className="flex-2 flex-row items-center gap-4">
					<img src={tipLogo} alt="institution logo" className="w-28" />
					<Typography className="font-bold text-3xl text-accent underline">
						Technological Institute of the Philippines
					</Typography>
				</Box>
				<Box className="flex-1 flex-col items-center gap-4 text-accent text-right">
					<Typography className="font-bold">
						938 Aurora Boulevard, Cubao, Quezon City
					</Typography>
					<Typography>Tel. No: (+632) 8911-0964</Typography>
					<Typography>Email: info@tip.edu.ph</Typography>
				</Box>
			</Paper>
		</>
	);
}
