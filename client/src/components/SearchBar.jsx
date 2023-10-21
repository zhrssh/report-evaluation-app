import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

import AppButtonContained from "./buttons/AppButtonContained";
import AppButtonOutlined from "./buttons/AppButtonOutlined";

function SearchBar(props, ref) {
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
						startIcon={null}
						label="Search"
						onClick={() => console.log("Not yet implemented.")}
					/>
					<AppButtonOutlined
						startIcon={null}
						label="Sort by"
						onClick={() => console.log("Not yet implemented.")}
					/>
					<AppButtonOutlined
						startIcon={null}
						label="Filters"
						onClick={() => console.log("Not yet implemented.")}
					/>
					<AppButtonContained
						startIcon={null}
						label="Create"
						onClick={props.createButtonCallback}
					/>
				</Box>
			</Box>
		</>
	);
}

export default React.forwardRef(SearchBar);
