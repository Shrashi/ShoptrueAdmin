"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import NewButton from "@/components/ui/NewButton";
import AddIcon from "@mui/icons-material/Add";
import Separator from "@/components/ui/Separator";
import { useParams, useRouter } from "next/navigation";
import DataTable from "@/components/ui/DataTable";
import { columns, CategoryColumn } from "./columns";
import CellAction from "./CellAction";
import { ApiList } from "@/components/ui/ApiList";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  console.log("table data", data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories(${data.length})`}
          description="Manage Categories for your store"
        />
        <NewButton
          variant="default"
          size="default"
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
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
      <Heading title="API" description="API Calls for Categories" />
      <Separator />
      <ApiList entityIdName="categoryId" entityName="categories" />
    </>
  );
};

export default CategoryClient;
