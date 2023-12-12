import { TextField } from "@mui/material";
import React from "react";

function EvaluationView() {
    const singleEvaluation = {
        ownedBy: "A2EF34BF",
        dateOfEvaluation: "12/04/2023",
        evaluator: "Dr. Cecilia Venal",
        governmentAuthority: "All",
        program: "Computer Engineering",
    };

    // Filter out ownedBy and dateOfEvaluation keys
    const filteredKeys = Object.keys(singleEvaluation).filter(
        (key) => key !== "ownedBy" && key !== "dateOfEvaluation"
    );

    return (
        <div className="flex justify-center items-center">
            <div className="flex flex-col p-10 w-1/2 justify-center rounded-lg shadow-lg bg-white">
                <h1>Technological Institute of the Philippines</h1>
                <span>Evaluation ID: {singleEvaluation.ownedBy}</span>
                <span>
                    Date of Evaluation: {singleEvaluation.dateOfEvaluation}
                </span>
                <div className="flex flex-1 flex-row gap-10 justify-center items-cente">
                    <div className="flex flex-col w-1/2 mt-10 gap-5">
                        {filteredKeys.map((key, index) => (
                            <TextField
                                key={index}
                                fullWidth
                                label={
                                    key.charAt(0).toUpperCase() +
                                    key.slice(1).replace(/([A-Z])/g, " $1")
                                }
                                value={singleEvaluation[key]}
                            />
                        ))}
                    </div>
                    <div className="flex flex-1 justify-center">
                        No Files Uploaded
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EvaluationView;
