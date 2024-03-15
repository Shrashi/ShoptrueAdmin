"use client";

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
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
  { id: "name", label: "Name", minWidth: 200, align: "center" },
  { id: "value", label: "Value", minWidth: 200, align: "center" },
  { id: "createdAt", label: "Date", minWidth: 200, align: "center" },
  { id: "action", label: "Action", minWidth: 200, align: "center" },
];
