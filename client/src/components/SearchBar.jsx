import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import AppButtonContained from "./buttons/AppButtonContained";
import AppButtonOutlined from "./buttons/AppButtonOutlined";

export default function SearchBar({ createCallback }) {
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
					<AppButtonContained
						props={{
							startIcon: null,
							label: "Search",
							callback: () => console.log("Not yet implemented."),
						}}
					/>
					<AppButtonOutlined
						props={{
							startIcon: null,
							label: "Sort by",
							callback: () => console.log("Not yet implemented."),
						}}
					/>
					<AppButtonOutlined
						props={{
							startIcon: null,
							label: "Filters",
							callback: () => console.log("Not yet implemented."),
						}}
					/>
					<AppButtonContained
						props={{
							startIcon: null,
							label: "Create",
							callback: createCallback,
						}}
					/>
				</Box>
			</Box>
		</>
	);
}
