import React, { useState } from "react";
import { chedbg, teamLogo } from "../assets";
import { TextField, Link } from "@mui/material";
import AppButtonContained from "../components/utils/AppButtonContained";

function LoginPage() {
    const [credentialsFormData, setCredentialsFormData] = useState({
        email: "",
        password: "",
    });

    const handleCredentialsChange = (event) => {
        const { name, value } = event.target;
        setCredentialsFormData({
            ...credentialsFormData,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        console.log("Credentials Data:", credentialsFormData);
        setCredentialsFormData({
            email: "",
            password: "",
        });
    };

    return (
        <div className="flex flex-col justify-center mt-28 items-center font-inter">
            <div className="flex flex-row shadow-lg w-2/3 rounded-lg bg-accent">
                <img
                    src={chedbg}
                    width={700}
                    alt="Unable to load logo."
                    className="opacity-60 rounded-l-lg"
                    // style={{ backgroundColor: "rgba(59, 130, 246, 0.6)" }}
                />
                <div className="flex flex-1 flex-col px-10 justify-center rounded-lg bg-white">
                    <h1 className="text-accent">Login</h1>
                    <span>Welcome back! Please login to continue.</span>
                    <div className="flex flex-col mt-5 gap-3">
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
                                type={
                                    key.includes("password") ? "password" : ""
                                }
                                autoComplete={
                                    key.includes("password")
                                        ? "current-password"
                                        : ""
                                }
                                name={key}
                            />
                        ))}
                        <AppButtonContained
                            label="Login"
                            onClick={() => handleSubmit()}
                        />
                        <span className="mt-5">
                            Don't have an account?{" "}
                            <Link
                                href="/register"
                                underline="hover"
                                className="text-accent font-bold"
                            >
                                Register
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-center items-center font-medium mt-5 text-black pt-6">
                Developed by{" "}
                <img
                    src={teamLogo}
                    width={100}
                    alt="Unable to load team logo."
                />
            </div>
        </div>
    );
}

export default LoginPage;
