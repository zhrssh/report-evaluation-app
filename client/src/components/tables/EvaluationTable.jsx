import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import AppButtonContained from "../buttons/AppButtonContained";
import AppButtonOutlined from "../buttons/AppButtonOutlined";
import { getEvaluationsList } from "../../services/evaluationsList";

import { faker } from "@faker-js/faker";

/**
 * Gets the internal row ID of a row.
 * @param {number} row
 * @returns
 */
function _getRowId(row) {
	return row.internalId;
}

/**
 * Provides sample data using Faker-js.
 * @param {number} count
 * @returns {Array<Object>}
 */
function _getSampleData(count = 100) {
	let rows = [];
	for (let i = 0; i < count; i++) {
		rows.push({
			internalId: i,
			dateOfEvaluation: faker.date.anytime(),
			kindOfVisit: faker.lorem.words(),
			evaluator: faker.person.fullName(),
			remarks: faker.lorem.words(),
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
		renderCell: function () {
			return (
				<>
					<Box className="flex gap-2 items-center justify-center">
						<AppButtonContained
							props={{
								startIcon: null,
								label: "View",
								callback: () => console.log("Not yet implemented."),
							}}
						/>
						<AppButtonOutlined
							props={{
								startIcon: null,
								label: "Edit",
								callback: () => console.log("Not yet implemented."),
							}}
						/>
						<Button
							variant="contained"
							startIcon={null}
							className="rounded-full bg-red-700"
							onClick={() => console.log("Not yet implemented.")}>
							<Typography variant="button">Delete</Typography>
						</Button>
					</Box>
				</>
			);
		},
	},
];

/**
 * A React component that displays the list of evaluations of the selected institution.
 * @returns {React.Component}
 */
export default function EvaluationTable() {
	return (
		<>
			<Box className="mx-16 my-4 border-2 border-text rounded-xl">
				<DataGrid
					getRowId={_getRowId}
					rows={getEvaluationsList() || _getSampleData()}
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
