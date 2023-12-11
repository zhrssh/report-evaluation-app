import React from "react";
import { Button, Typography } from "@mui/material";

/**
 * Returns an outlined button component.
 * @param {{startIcon, label: String}} props
 * @returns
 */
function AppButtonOutlined(props, ref) {
  return (
    <>
      <Button
        {...props}
        variant="outlined"
        className="rounded-sm text-accent border-accent"
      >
        <Typography variant="button">{props.label}</Typography>
      </Button>
    </>
  );
}

export default React.forwardRef(AppButtonOutlined);
