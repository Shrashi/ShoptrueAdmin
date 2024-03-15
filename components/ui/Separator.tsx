import { Divider } from "@mui/material";
import { ElementType } from "react";

type VariantProps = "inset" | "fullWidth" | "middle" | undefined;
type OrientationProps = "vertical" | "horizontal" | undefined;

interface DividerProps {
  variant?: VariantProps;
  orientation?: OrientationProps;
  component?: ElementType<any, keyof JSX.IntrinsicElements>;
  role?: string;
  children?: React.ReactNode;
}

const Separator: React.FC<DividerProps> = ({
  variant = "fullWidth",
  orientation = "horizontal",
  component = "div",
  role,
  children,
}) => {
  return (
    <Divider
      variant={variant}
      orientation={orientation}
      component={component}
      role={role}
    >
      {children}
    </Divider>
  );
};

export default Separator;
