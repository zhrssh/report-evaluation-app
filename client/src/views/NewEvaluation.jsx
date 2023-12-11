import React from "react";
import { tipLogo } from "../assets";
import { TextField, Input, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useRouting from "../components/routes";
import InstitutionBlock from "../components/utils/InstitutionBlock";

import AppButtonContained from "../components/utils/AppButtonContained";
import AppButtonOutlined from "../components/utils/AppButtonOutlined";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

function NewEvaluation() {
    let label = "";
    const { navigateToEvaluation } = useRouting();
    const [evaluationFormData, setevaluationFormData] = React.useState({
        program: "",
        governmentAuthority: "",
        evaluator: "",
        kindOfVisit: "",
        dateOfEvaluation: null,
    });
    const [uploadedFiles, setUploadedFiles] = React.useState([]);

    const onHandleEvaluationFormChange = (event) => {
        const { name, value } = event.target;
        setevaluationFormData({
            ...evaluationFormData,
            [name]: value,
        });
    };

    const handleDateChange = (data) => {
        onHandleEvaluationFormChange("dateOfEvaluation", data);
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        setUploadedFiles([...uploadedFiles, ...files]);
    };

    // Function to submit entries to backend
    const handleSubmit = async () => {
        navigateToEvaluation();
    };

    const singleInstitution = {
        logoSrc: tipLogo,
        institutionName: "Technological Institute of the Philippines",
        address: "938 Aurora Boulevard, Cubao, Quezon City",
        contactNumber: "(+632) 8911-0964",
        email: "info@tip.edu.ph",
    };

    return (
        <>
            <div className="p-3">
                {/*Pass currently viewing institution*/}
                <InstitutionBlock
                    logoSrc={singleInstitution.logoSrc}
                    institutionName={singleInstitution.institutionName}
                    address={singleInstitution.address}
                    contactNumber={singleInstitution.contactNumber}
                    email={singleInstitution.email}
                />{" "}
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col p-10 w-1/2 justify-center rounded-lg shadow-lg bg-white">
                    <h2 className="text-accent">Add a new evaluation</h2>
                    <span>
                        Kindly fill up the form below for institution
                        evaluation.
                    </span>

                    <div className="flex flex-col mt-5 gap-5">
                        {Object.keys(evaluationFormData).map(
                            (fieldName, index) =>
                                fieldName === "dateOfEvaluation" ? (
                                    <DatePicker
                                        key={index}
                                        label={
                                            fieldName.charAt(0).toUpperCase() +
                                            fieldName
                                                .slice(1)
                                                .replace(/([A-Z])/g, " $1")
                                        }
                                        value={evaluationFormData[fieldName]}
                                        onChange={handleDateChange}
                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth />
                                        )}
                                    />
                                ) : (
                                    <TextField
                                        key={index}
                                        fullWidth
                                        label={
                                            fieldName.charAt(0).toUpperCase() +
                                            fieldName
                                                .slice(1)
                                                .replace(/([A-Z])/g, " $1")
                                        }
                                        value={evaluationFormData[fieldName]}
                                        name={fieldName}
                                        onChange={onHandleEvaluationFormChange}
                                    />
                                )
                        )}
                        <div className="flex flex-row gap-3">
                            <Button
                                component={"label"}
                                className="w-60"
                                variant={"contained"}
                                startIcon={<CloudUpload />}
                                onChange={handleFileChange}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" />
                            </Button>
                            {/* Display uploaded file names */}
                            {uploadedFiles.length === 0 ? (
                                <div className="self-center">
                                    No Files Selected
                                </div>
                            ) : (
                                <div className="w-3/4 overflow-hidden self-center">
                                    <span className="truncate">
                                        {Array.from(uploadedFiles)
                                            .map((file) => file.name)
                                            .join(", ")}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-row mt-5 justify-end gap-2">
                        <AppButtonContained
                            label="Submit"
                            onClick={() => handleSubmit()}
                        />
                        <AppButtonOutlined
                            label="Cancel"
                            onClick={navigateToEvaluation}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewEvaluation;
