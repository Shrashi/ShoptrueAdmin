"use client";
import { useEffect } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import React, { useState } from "react";

const SetupPage = () => {
  const open = useStoreModal((state) => state.open);
  const handleRightBtn = useStoreModal((state) => state.handleRightBtn);

  useEffect(() => {
    if (!open) {
      handleRightBtn();
    }
  }, [handleRightBtn, open]);
};

export default SetupPage;
