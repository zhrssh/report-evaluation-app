import { Box, IconButton, Paper, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";

import logo from "../logo.png";
import AppButtonContained from "./buttons/AppButtonContained";

export default function Header() {
	return (
		<>
			<Paper
				elevation={2}
				className="flex-row m-auto p-4 gap-4 justify-between items-center">
				<Box className="flex-col">
					<img src={logo} alt="logo" className="h-10" />
					<Box className="w-full h-0.5 bg-text" />
					<Typography variant="caption" className="text-text">
						For use by CHED-TCCpE
					</Typography>
				</Box>
				<Box className="flex gap-4">
					<Box className="flex gap-1">
						<IconButton>
							<HelpIcon />
						</IconButton>
						<IconButton>
							<InfoIcon />
						</IconButton>
						<IconButton>
							<SettingsIcon />
						</IconButton>
					</Box>
					<AppButtonContained
						props={{ startIcon: <LogoutIcon />, label: "Log out" }}
					/>
				</Box>
			</Paper>
		</>
	);
}
