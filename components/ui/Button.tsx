import * as React from "react";
import Button from "@mui/material/Button";
import clsx from "clsx";

type Variants =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type Sizes = "default" | "sm" | "lg" | "icon";

type ButtonProps = {
  children: any;
  disabled?: boolean;
  variant: Variants;
  type?: string;
  size: Sizes;
  onClickBtn?: any;
};

const variantStyle: { [key in Variants]: string } = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeStyle: { [key in Sizes]: string } = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};
const baseClass =
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

export const ButtonComp: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  variant = "default",
  size = "default",
  onClickBtn,
}) => {
  return (
    <Button
      className={clsx(baseClass, variantStyle[variant], sizeStyle[size])}
      disabled={disabled}
      onClick={onClickBtn}
    >
      {children}
    </Button>
  );
};
