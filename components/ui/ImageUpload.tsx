"use client";
import { useEffect, useState } from "react";
import NewButton from "./NewButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/image";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled: any;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="z-10 absolute top-2 right-2">
              <NewButton
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
              >
                <DeleteOutlineIcon />
              </NewButton>
            </div>
            <Image fill className="object-cover" alt="image" src={url} />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="athuckrk">
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <NewButton
              type="button"
              variant="default"
              disabled={disabled}
              size="default"
              onClick={onClick}
            >
              <AddPhotoAlternateIcon className="h-4 w-4 mr-2" />
              Upload Image
            </NewButton>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
