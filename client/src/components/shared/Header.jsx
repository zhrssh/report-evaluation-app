import React from "react";
import { logo } from "../../assets";

function Header() {
  return (
    <div className="items-center h-20 px-5 py-5 flex flex-row pt-2 shadow-md border-primary">
      <div className="flex flex-col justify-center items-center">
        <img src={logo} width={250} alt={"Unable to load logo."} />
        <div className="font-medium">Developed for CHED-TC CpE</div>
      </div>
    </div>
  );
}

export default Header;
