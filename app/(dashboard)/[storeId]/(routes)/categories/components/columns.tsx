"use client";

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

type AlignProps = "center" | "inherit" | "justify" | "left" | "right";

interface HeadCell {
  id: string;
  label: string;
  minWidth: number;
  align: AlignProps;
}

export const columns: HeadCell[] = [
  { id: "name", label: "name", minWidth: 150, align: "center" },
  { id: "createdAt", label: "createdAt", minWidth: 150, align: "center" },
  {
    id: "billboardLabel",
    label: "billboardLabel",
    minWidth: 150,
    align: "center",
  },
  { id: "action", label: "Action", minWidth: 150, align: "center" },
];
