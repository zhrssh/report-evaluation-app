import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import AppButtonContained from "../utils/AppButtonContained";
import AppButtonOutlined from "../utils/AppButtonOutlined";

import { faker } from "@faker-js/faker";

/**
 * Gets the internal row ID of a row.
 * @param {number} row
 * @returns
 */
function _getRowId(row) {
    return row._id ? row._id : row.internalId;
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
                            startIcon={null}
                            label="View"
                            onClick={() => console.log("Not yet implemented.")}
                        />
                        <AppButtonOutlined
                            startIcon={null}
                            label="Edit"
                            onClick={() => console.log("Not yet implemented.")}
                        />
                        <AppButtonContained
                            label="Delete"
                            color="bg-red-700"
                            onClick={() => console.log("Not yet implemented.")}
                        />
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
function EvaluationTable(props, ref) {
    return (
        <>
            <Box className="my-4 border-2 border-text rounded-xl overflow-auto">
                <DataGrid
                    getRowId={_getRowId}
                    rows={props.rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    checkboxSelection
                    disableRowSelectionOnClick
                ></DataGrid>
            </Box>
        </>
    );
}

export default React.forwardRef(EvaluationTable);
