"use client";

import React, { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import ComboBox from "./ui/ComboBox";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BasicPopover from "./ui/Popover";
import { Store } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { ButtonComp as Button } from "./ui/Button";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { TextField } from "@mui/material";

interface StoreSwitcherProps {
  items: Store[];
  className?: string;
}

const StoreSwitcher = ({ className, items = [] }: StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  // const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const formattedItems = items.map((ele) => ({
    label: ele.name,
    value: ele.id,
  }));
  const currentStore = formattedItems.find(
    (ele) => ele.value === params.storeId
  );
  const onStoreSelect = (store: { value: string; label: string }) => {
    setAnchorEl(null);
    router.push(`/${store.value}`);
  };

  const handleChange = (
    e: React.MouseEvent<Element, MouseEvent>,
    val: { value: string; label: string }
  ) => {
    if (val.value === "createStore") {
      setAnchorEl(null);
      storeModal.handleRightBtn();
    } else {
      onStoreSelect(val);
    }
  };

  const handleClickBtn = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <div>
      <Button variant="outline" size="default" onClickBtn={handleClickBtn}>
        <StorefrontIcon className="mr-2 h-4 w-4" />
        {currentStore?.label}
        <UnfoldMoreIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>
      <BasicPopover
        open={Boolean(anchorEl)}
        handleClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        <ComboBox
          id="store-combo-box"
          items={[
            ...formattedItems,
            { value: "createStore", label: "Create Store" },
          ]}
          renderInput={(params) => (
            <TextField {...params} label="search store..." />
          )}
          className="text-sm"
          style={{ width: 300 }}
          onChange={(e, val) => handleChange(e, val)}
        />
      </BasicPopover>
    </div>
  );
};

export default StoreSwitcher;
