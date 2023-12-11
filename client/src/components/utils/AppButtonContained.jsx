import React from "react";
import { Button, Typography } from "@mui/material";

/**
 * Returns a contained button component.
 * @param {{startIcon, label:String}} props
 * @returns
 */
function AppButtonContained(props, ref) {
  return (
    <>
      <Button {...props} variant="contained" className="rounded-sm bg-accent">
        <Typography variant="button">{props.label}</Typography>
      </Button>
    </>
  );
}

export default React.forwardRef(AppButtonContained);
