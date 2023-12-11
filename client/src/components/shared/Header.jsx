import React from "react";
import { logo } from "../../assets";
import useRouting from "../routes";

function Header() {
    const { navigateToHome } = useRouting();

    return (
        <div className="items-center h-20 px-5 py-5 flex flex-row pt-2 shadow-md border-primary">
            <a onClick={() => navigateToHome()} style={{ cursor: "pointer" }}>
                <div className="flex flex-col justify-center items-center">
                    <img src={logo} width={250} alt={"Unable to load logo."} />
                    <div className="font-medium">Developed for CHED-TC CpE</div>
                </div>
            </a>
        </div>
    );
}

export default Header;
