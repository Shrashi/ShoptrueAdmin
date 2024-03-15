"use client";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  products: string;
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
  { id: "products", label: "Products", minWidth: 50, align: "center" },
  { id: "phone", label: "Phone", minWidth: 50, align: "center" },
  { id: "address", label: "Address", minWidth: 50, align: "center" },
  { id: "totalPrice", label: "Total Price", minWidth: 50, align: "center" },
  { id: "isPaid", label: "Paid", minWidth: 50, align: "center" },
];
