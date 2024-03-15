"use client";
import Alert from "./Alert";
import { AlertTitle } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";
import Badge from "./Badge";
import NewButton from "./NewButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], string> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("api route copied with clipboard");
  };

  return (
    <Alert
      className="w-full"
      action={
        <div className="flex items-end justify-end">
          <NewButton variant="outline" size="icon" onClick={onCopy}>
            <ContentCopyIcon />
          </NewButton>
        </div>
      }
    >
      <div className="flex flex-row justify-start">
        <StorageIcon className="h-4 w-4 mr-2 mb-3" />
        <AlertTitle className="flex items-center gap-x-2">{title}</AlertTitle>
        <Badge customVariant={variantMap[variant]}>{textMap[variant]}</Badge>
      </div>
      <p className="flex items-center mt-4 justify-between w-full">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font mono text-sm font-semibold">
          {description}
        </code>
      </p>
    </Alert>
  );
};

export default ApiAlert;
