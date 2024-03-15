import { create } from "zustand";

interface useStoreModalStore {
  open: boolean;
  handleRightBtn: () => void;
  handleClose: () => void;
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
  open: false,
  handleRightBtn: () => set({ open: true }),
  handleClose: () => set({ open: false }),
}));
