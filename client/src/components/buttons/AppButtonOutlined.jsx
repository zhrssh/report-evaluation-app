import React from "react";
import { Button, Typography } from "@mui/material";

/**
 * Returns an outlined button component.
 * @param {{startIcon, label: String}} props
 * @returns
 */
export default function AppButtonOutlined({ props }) {
	return (
		<>
			<Button
				variant="outlined"
				startIcon={props.startIcon}
				className="rounded-full text-accent border-accent">
				<Typography variant="button">{props.label}</Typography>
			</Button>
		</>
	);
}
