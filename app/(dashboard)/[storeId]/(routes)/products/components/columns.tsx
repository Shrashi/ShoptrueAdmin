"use client";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  category: string;
  color: string;
  isFeatured: boolean;
  isArchived: boolean;
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
  { id: "name", label: "Name", minWidth: 60, align: "center" },
  { id: "size", label: "Size", minWidth: 60, align: "center" },
  { id: "category", label: "Category", minWidth: 60, align: "center" },
  { id: "color", label: "Color", minWidth: 60, align: "center" },
  { id: "price", label: "Price", minWidth: 60, align: "center" },
  { id: "isArchived", label: "Archived", minWidth: 60, align: "center" },
  { id: "isFeatured", label: "Featured", minWidth: 60, align: "center" },
  { id: "createdAt", label: "Date", minWidth: 60, align: "center" },
  { id: "action", label: "Action", minWidth: 60, align: "center" },
];
