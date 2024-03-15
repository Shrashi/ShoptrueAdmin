"use client";
import React, { useState } from "react";
import axios from "axios";
import { ProductColumn } from "./columns";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AlertModal from "@/components/modals/alert-modal";
import toast from "react-hot-toast";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useParams, useRouter } from "next/navigation";

interface CellActionProps {
  data: ProductColumn;
}
const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${data.id}`);
      toast.success("Product deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to clipboard.");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex flex-row justify-center">
        <div className="mr-2" onClick={() => onCopy(data.id)}>
          <ContentCopyIcon />
        </div>
        <div
          className="mr-2"
          onClick={() => router.push(`/${params.storeId}/products/${data.id}`)}
        >
          <EditNoteIcon />
        </div>
        <div className="mr-2">
          <DeleteOutlineIcon onClick={() => setOpen(true)} />
        </div>
      </div>
    </>
  );
};

export default CellAction;
