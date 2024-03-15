"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import NewButton from "@/components/ui/NewButton";
import AddIcon from "@mui/icons-material/Add";
import Separator from "@/components/ui/Separator";
import { useParams, useRouter } from "next/navigation";
import DataTable from "@/components/ui/DataTable";
import { columns, ProductColumn } from "./columns";
import CellAction from "./CellAction";
import { ApiList } from "@/components/ui/ApiList";

interface ProductClientProps {
  data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  console.log("table data", data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Products for your store"
        />
        <NewButton
          variant="default"
          size="default"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <AddIcon />
          Add New
        </NewButton>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        hasActions={true}
        renderAction={(row) => <CellAction data={row} />}
      />
      <Heading title="API" description="API Calls for Products" />
      <Separator />
      <ApiList entityIdName="productId" entityName="products" />
    </>
  );
};

export default ProductClient;
