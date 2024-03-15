"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import Separator from "@/components/ui/Separator";
import DataTable from "@/components/ui/DataTable";
import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders(${data.length})`}
        description="Manage Orders for your store"
      />
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="label"
        hasActions={true}
      />
    </>
  );
};

export default OrderClient;
