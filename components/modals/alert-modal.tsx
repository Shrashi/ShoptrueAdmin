"use client";
import { useState, useEffect } from "react";
import Dialog from "../ui/Dialog";
import NewButton from "../ui/NewButton";
interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Dialog
      open={isOpen}
      width="w-2/5"
      handleClose={onClose}
      title="Do you surely want to delete this??"
      description="This action cannot be undone."
    >
      <div className="pt-6 space-x-2 flex items-center justify-end">
        <NewButton
          disabled={loading}
          variant="outline"
          size="sm"
          onClick={onClose}
        >
          Cancel
        </NewButton>
        <NewButton
          variant="destructive"
          size="sm"
          disabled={loading}
          onClick={onConfirm}
        >
          Continue
        </NewButton>
      </div>
    </Dialog>
  );
};

export default AlertModal;
