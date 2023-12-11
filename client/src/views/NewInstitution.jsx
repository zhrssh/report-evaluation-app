import { TextField } from "@mui/material";
import React from "react";
import AppButtonContained from "../components/utils/AppButtonContained";
import AppButtonOutlined from "../components/utils/AppButtonOutlined";

function NewInstitution() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col p-10 w-1/2 justify-center rounded-lg shadow-lg bg-white">
        <h2 className="text-accent">Add new institution</h2>
        <span>Kindly fill up the form below with institution's details.</span>

        <div className="flex flex-col mt-8 gap-5">
          <TextField fullWidth label={"Institution Name"} />
          <TextField fullWidth label={"Complete Address"} />
          <div className="flex flex-row gap-3">
            <TextField fullWidth label={"City"} />
            <TextField fullWidth label={"Region"} />
          </div>
        </div>
        <div className="flex flex-row mt-5 justify-end gap-2">
          <AppButtonContained label="Submit" />
          <AppButtonOutlined label="Cancel" />
        </div>
      </div>
    </div>
  );
}

export default NewInstitution;
