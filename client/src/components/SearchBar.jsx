import React from "react";
import { Button, Stack } from "@mui/material";

export default function SearchBar() {
	function foo(name) {
		console.log(`${name} clicked`);
	}

	return (
		<div className="search-bar">
			{/* Search bar content */}
			<input type="text" placeholder="Search..." />
			<Stack direction="row" spacing={2}>
				<Button variant="contained" onClick={() => foo("Search button")}>
					Search
				</Button>
				<Button
					variant="outlined"
					disableElevation
					onClick={() => foo("Sort By button")}>
					Sort By
				</Button>
				<Button variant="outlined" onClick={() => foo("Filters button")}>
					Filters
				</Button>
				<Button variant="contained" onClick={() => foo("Create button")}>
					Create
				</Button>
			</Stack>
		</div>
	);
}
