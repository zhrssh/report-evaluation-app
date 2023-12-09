import React, { useState } from "react";
import { chedbg, teamLogo } from "../assets";
import { TextField, Link } from "@mui/material";
import AppButtonContained from "../components/utils/AppButtonContained";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = () => {
        console.log("Email:", email);
        console.log("Password:", password);

        setEmail("");
        setPassword("");
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
                        <TextField
                            id="standard-basic"
                            label="Email address"
                            variant="standard"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            variant="standard"
                            autoComplete="current-password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
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
