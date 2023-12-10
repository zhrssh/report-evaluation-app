import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import AppButtonContained from "./AppButtonContained";
import AppButtonOutlined from "./AppButtonOutlined";

import { faker } from "@faker-js/faker"; // Change the import statement

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
            nameOfInstitution: faker.date.anytime(),
            address: faker.lorem.words(),
            city: faker.person.fullName(),
            region: faker.lorem.words(),
        });
    }

    return rows;
}

// Defines the column of the table
const columns = [
    { field: "nameOfInstitution", headerName: "Name of Institution", flex: 3 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "city", headerName: "City", flex: 2 },
    { field: "region", headerName: "Region", flex: 2 },
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
                        <Button
                            variant="contained"
                            startIcon={null}
                            className="rounded-full bg-red-700"
                            onClick={() => console.log("Not yet implemented.")}
                        >
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
function InstitutionTable(props, ref) {
    // const sampleRows = _getSampleData();
    return (
        <>
            <Box className="mx-4 my-4 border-2 border-text rounded-xl overflow-auto">
                <DataGrid
                    getRowId={props.rows.id}
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

export default React.forwardRef(InstitutionTable);
