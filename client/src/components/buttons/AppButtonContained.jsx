import React from "react";
import { Button, Typography } from "@mui/material";

/**
 * Returns a contained button component.
 * @param {{startIcon, label:String}} props
 * @returns
 */
export default function AppButtonContained({ props }) {
	return (
		<>
			<Button
				variant="contained"
				startIcon={props.startIcon}
				className="rounded-full bg-accent"
				onClick={function () {
					if (props.callback) props.callback();
				}}>
				<Typography variant="button">{props.label}</Typography>
			</Button>
		</>
	);
}
