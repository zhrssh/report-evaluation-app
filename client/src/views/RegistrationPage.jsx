import React, { useState } from "react";
import { TextField, Link, Alert, AlertTitle } from "@mui/material";
import AppButtonContained from "../components/utils/AppButtonContained";

function RegistrationPage() {
    const [infoFormData, setInfoFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        suffix: "",
    });

    const [credentialsFormData, setCredentialsFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordsMatchError, setPasswordsMatchError] = useState(false);

    const handleInfoChange = (event) => {
        const { name, value } = event.target;
        setInfoFormData({
            ...infoFormData,
            [name]: value,
        });
    };

    const handleCredentialsChange = (event) => {
        const { name, value } = event.target;
        setCredentialsFormData({
            ...credentialsFormData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        const { password, confirmPassword } = credentialsFormData;
        if (password !== confirmPassword) {
            setPasswordsMatchError(true);
            return; // Prevent further execution
        } else {
            setPasswordsMatchError(false);
        }

        console.log("Info Form Data:", infoFormData);
        console.log("Credentials Form Data:", credentialsFormData);

        setInfoFormData({
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
        });

        setCredentialsFormData({
            email: "",
            password: "",
            confirmPassword: "",
        });
    };

    return (
        <div className="flex justify-center mt-24 items-center font-inter">
            <div className="flex flex-col p-10 w-1/2 justify-center rounded-lg shadow-lg bg-white">
                <h1 className="text-accent">Register</h1>
                <span>Welcome! Create a new account.</span>
                <div className="flex flex-row mt-5 gap-3">
                    {Object.keys(infoFormData).map((key) => (
                        <TextField
                            key={key}
                            fullWidth={key.includes("suffix") ? false : true}
                            id={`standard-basic-${key}`}
                            label={
                                key.charAt(0).toUpperCase() +
                                key.slice(1).replace(/([A-Z])/g, " $1")
                            }
                            variant="standard"
                            value={infoFormData[key]}
                            onChange={handleInfoChange}
                            name={key}
                        />
                    ))}
                </div>
                <div className="flex flex-col mt-3 gap-3">
                    {Object.keys(credentialsFormData).map((key) => (
                        <TextField
                            key={key}
                            fullWidth
                            id={`standard-basic-${key}`}
                            label={
                                key.charAt(0).toUpperCase() +
                                key.slice(1).replace(/([A-Z])/g, " $1")
                            }
                            variant="standard"
                            value={credentialsFormData[key]}
                            onChange={handleCredentialsChange}
                            type={key.includes("password") ? "password" : ""}
                            autoComplete={
                                key.includes("password")
                                    ? "current-password"
                                    : ""
                            }
                            name={key}
                        />
                    ))}
                    {passwordsMatchError && (
                        <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            Mismatched passwords!
                        </Alert>
                    )}
                    <AppButtonContained
                        label="Register"
                        onClick={handleSubmit}
                    />
                    <span className="mt-5">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            underline="hover"
                            className="text-accent font-bold"
                        >
                            Login
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default RegistrationPage;
