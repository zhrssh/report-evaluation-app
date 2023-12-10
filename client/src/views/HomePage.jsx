import React from "react";
import InstitutionTable from "../components/utils/InstitutionTable.jsx";
import institutionsData from "../components/data/dummy.js";

function HomePage() {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setRows(institutionsData);
    };

    return (
        <div className="p-5">
            <h1>List of Institutions</h1>
            <InstitutionTable rows={rows} />
        </div>
    );
}

export default HomePage;
