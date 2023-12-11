import React from "react";

const InstitutionBlock = ({
    logoSrc,
    institutionName,
    address,
    contactNumber,
    email,
}) => {
    return (
        <div className="flex flex-row items-center gap-3">
            <img src={logoSrc} width={200} alt={"Unable to load logo."} />
            <div className="flex flex-col">
                <h1>{institutionName}</h1>
                <span>{address}</span>
                <span>Contact No.: {contactNumber}</span>
                <span>Email: {email}</span>
            </div>
        </div>
    );
};

export default InstitutionBlock;
