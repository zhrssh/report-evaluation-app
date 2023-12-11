import React from "react";

const InstitutionBlock = ({
    logoSrc,
    institutionName,
    completeAddress,
    city,
    region,
}) => {
    return (
        <div className="flex flex-row items-center">
            {/* <img src={logoSrc} width={200} alt={"Unable to load logo."} /> */}
            <div className="flex flex-col">
                <h1>{institutionName}</h1>
                {completeAddress}, {city}, {region}
            </div>
        </div>
    );
};

export default InstitutionBlock;
