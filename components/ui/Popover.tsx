import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { ButtonComp as Button } from "./Button";

interface PopoverProps {
  children: React.ReactNode;
  handleClose?: () => void;
  open: boolean;
  anchorEl: any;
}
export default function BasicPopover({
  children,
  handleClose,
  open,
  anchorEl,
}: PopoverProps) {
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
      >
        {children}
      </Popover>
    </div>
  );
}
