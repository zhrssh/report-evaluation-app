import React from "react";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Logout() {
	return (
		<>
			<Button
				variant="contained"
				startIcon={<LogoutIcon />}
				className="rounded-full bg-accent">
				<Typography variant="button">Log Out</Typography>
			</Button>
		</>
	);
}
