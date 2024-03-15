import { Badge as BadgeComp } from "@mui/material";
import React from "react";
import clsx from "clsx";

type AnchorType = { horizontal: "left" | "right"; vertical: "bottom" | "top" };

type ColorTypes =
  | "default"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "success"
  | "warning"
  | undefined;

type variantType = "dot" | "standard" | undefined;

type CustomVariantProps = "secondary" | "destructive" | string;

interface BadgeProps {
  anchorOrigin?: AnchorType;
  children: React.ReactNode;
  badgeContent?: React.ReactNode;
  color?: ColorTypes;
  variant?: variantType;
  customVariant: CustomVariantProps;
}

const badgeStyle: { [key in CustomVariantProps]: string } = {
  destructive: "bg-rose-400",
  secondary: "bg-sky-400",
};

const Badge: React.FC<BadgeProps> = ({
  anchorOrigin = { horizontal: "left", vertical: "top" },
  children,
  badgeContent,
  color = "default",
  variant = "standard",
  customVariant,
}) => {
  console.log("cusom", customVariant);

  return (
    <BadgeComp
      anchorOrigin={anchorOrigin}
      color={color}
      variant={variant}
      className={clsx(
        "rounded-2xl h-6 w-14 justify-center items-center ml-2",
        badgeStyle[customVariant]
      )}
    >
      {badgeContent}
      {children}
    </BadgeComp>
  );
};

export default Badge;
