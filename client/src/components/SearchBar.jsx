import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import AppButtonContained from "./buttons/AppButtonContained";
import AppButtonOutlined from "./buttons/AppButtonOutlined";

export default function SearchBar() {
	return (
		<>
			<Box className="flex mx-16 gap-8 items-center">
				<TextField
					label="Search"
					variant="outlined"
					className="flex-1"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
				<Box className="flex flex-2 gap-4">
					<AppButtonContained props={{ startIcon: null, label: "Search" }} />
					<AppButtonOutlined props={{ startIcon: null, label: "Sort by" }} />
					<AppButtonOutlined props={{ startIcon: null, label: "Filters" }} />
					<AppButtonContained props={{ startIcon: null, label: "Create" }} />
				</Box>
			</Box>
		</>
	);
}
