import React from "react";
import EvaluationTable from "../components/utils/EvaluationTable";
import AppButtonContained from "../components/utils/AppButtonContained";
import { TextField } from "@mui/material";
import InstitutionBlock from "../components/utils/InstitutionBlock";
import { tipLogo } from "../assets";
import useRouting from "../components/routes";

function EvaluationPage() {
    const [rows, setRows] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState("");

    const { navigateToCreateEvaluation } = useRouting();

    const singleInstitution = {
        logoSrc: tipLogo,
        institutionName: "Technological Institute of the Philippines",
        address: "938 Aurora Boulevard, Cubao, Quezon City",
        contactNumber: "(+632) 8911-0964",
        email: "info@tip.edu.ph",
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Gets access token from session storage
        const accessToken = sessionStorage.getItem("accessToken");

        // Sends request to the server
        const response = await fetch(SERVER_URL + "/v1/evaluations", {
            method: "GET",
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();
        setRows(data);
    };

    // Function to handle search input change
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to filter rows based on search query
    const filteredRows = rows.filter((row) => {
        // Customize this filtering logic according to your data structure
        return (
            row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.id.toLowerCase().includes(searchQuery.toLowerCase())
            // Add more conditions based on the fields you want to filter by
        );
    });

    return (
        <div className="p-5">
            {/*Pass currently viewing institution*/}
            <InstitutionBlock
                logoSrc={singleInstitution.logoSrc}
                institutionName={singleInstitution.institutionName}
                address={singleInstitution.address}
                contactNumber={singleInstitution.contactNumber}
                email={singleInstitution.email}
            />

            <div className="flex flex-row justify-between mt-2 items-center md:shrink-0">
                <TextField
                    className="w-5/6 md:4/5"
                    label="Search"
                    id="search"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <div className="flex justify-end gap-2 md:w-full">
                    <AppButtonContained label="Sort By" />
                    <AppButtonContained label="Filters" />
                    <AppButtonContained
                        label="Create"
                        onClick={navigateToCreateEvaluation}
                    />
                </div>
            </div>

            <EvaluationTable rows={filteredRows} />
        </div>
    );
}

export default EvaluationPage;
