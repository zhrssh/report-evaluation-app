import {
	Box,
	Button,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

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
					<Button variant="contained" className="rounded-full px-8 bg-accent">
						<Typography variant="button">Search</Typography>
					</Button>
					<Button
						variant="outlined"
						className="rounded-full px-8 text-accent border-accent">
						<Typography variant="button">Sort by</Typography>
					</Button>
					<Button
						variant="outlined"
						className="rounded-full px-8 text-accent border-accent">
						<Typography variant="button">Filters</Typography>
					</Button>
					<Button variant="contained" className="rounded-full px-8 bg-accent">
						<Typography variant="button">Create</Typography>
					</Button>
				</Box>
			</Box>
		</>
	);
}
