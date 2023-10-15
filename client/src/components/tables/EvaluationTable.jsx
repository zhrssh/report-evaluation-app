import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import AppButtonContained from "../buttons/AppButtonContained";
import AppButtonOutlined from "../buttons/AppButtonOutlined";

import { faker } from "@faker-js/faker";

function _getRowId(row) {
	return row.internalId;
}

function _getSampleData(count) {
	let rows = [];
	for (let i = 0; i < count; i++) {
		rows.push({
			internalId: i,
			dateOfEvaluation: faker.date.anytime(),
			kindOfVisit: faker.lorem.words(),
			evaluator: faker.person.fullName(),
			remarks: faker.lorem.words(),
			action: <AppButtonContained props={{ startIcon: null, label: "View" }} />,
		});
	}

	return rows;
}

// Defines the column of the table
const columns = [
	{ field: "dateOfEvaluation", headerName: "Date of Evaluation", flex: 2 },
	{ field: "kindOfVisit", headerName: "Kind of Visit", flex: 2 },
	{ field: "evaluator", headerName: "Evaluator", flex: 2 },
	{ field: "remarks", headerName: "Remarks", flex: 2 },
	{
		field: "action",
		headerName: "Action",
		flex: 2,
		sortable: false,
		renderCell: function (params) {
			return (
				<>
					<Box className="flex gap-2 items-center justify-center">
						<AppButtonContained props={{ startIcon: null, label: "View" }} />
						<AppButtonOutlined props={{ startIcon: null, label: "Edit" }} />
						<Button
							variant="contained"
							startIcon={null}
							className="rounded-full bg-red-700">
							<Typography variant="button">Delete</Typography>
						</Button>
					</Box>
				</>
			);
		},
	},
];

export default function EvaluationTable() {
	return (
		<>
			<Box className="mx-16 my-4 border-2 border-text rounded-xl">
				<DataGrid
					getRowId={_getRowId}
					rows={_getSampleData(100)}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 10 },
						},
					}}
					pageSizeOptions={[10, 25, 50, 100]}
					checkboxSelection
					disableRowSelectionOnClick></DataGrid>
			</Box>
		</>
	);
}
