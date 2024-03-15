import React from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { ButtonComp as Button } from "./Button";
import clsx from "clsx";

type DialogProps = {
  open: boolean;
  children?: React.ReactNode;
  handleClose?: () => void;
  title: string;
  secBtnTxt?: string;
  rightBtnText?: string;
  handleRightBtn?: () => void;
  width: string;
  showCross?: boolean;
  description?: string;
};

const Dialog: React.FC<DialogProps> = ({
  open,
  children,
  handleClose,
  title,
  secBtnTxt,
  rightBtnText,
  handleRightBtn,
  showCross,
  description,
  width,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <div
        className={clsx(
          "bg-secondary absolute top-1/3 left-1/3 max-h-screen rounded shadow-md overflow-auto outline-none flex flex-col justify-center",
          `width: ${width}`
        )}
      >
        {showCross && (
          <div className="flex justify-end">
            <CloseIcon onClick={handleClose} />{" "}
          </div>
        )}
        <div className="flex justify-center flex-col">
          <h1 className="font-bold self-center mt-2">{title}</h1>
          <div className="pt-4 ml-6">{description}</div>
          <div className="m-6">{children}</div>
          <div className="flex flex-row mt-6 self-center mb-6">
            {handleRightBtn && (
              <div>
                <Button
                  disabled={false}
                  variant="destructive"
                  size="sm"
                  onClickBtn={handleRightBtn}
                >
                  {rightBtnText}
                </Button>
              </div>
            )}
            {!showCross ||
              (secBtnTxt && (
                <div className="ml-6">
                  <Button
                    disabled={false}
                    variant="destructive"
                    size="sm"
                    onClickBtn={handleClose}
                  >
                    {secBtnTxt}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Dialog;
