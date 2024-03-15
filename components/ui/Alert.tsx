import { Alert as AlertComp } from "@mui/material";

type VariantProps = "filled" | "outlined" | "standard" | undefined;

type SeverityProps = "error" | "info" | "success" | "warning" | undefined;

interface AlertProps {
  children: React.ReactNode;
  variant?: VariantProps;
  severity?: SeverityProps;
  className?: any;
  action: React.ReactNode;
}

import React from "react";

const Alert: React.FC<AlertProps> = ({
  children,
  variant = "standard",
  severity,
  className,
  action,
}) => {
  return (
    <AlertComp
      variant={variant}
      severity={severity}
      className={className}
      action={action}
    >
      {children}
    </AlertComp>
  );
};

export default Alert;
