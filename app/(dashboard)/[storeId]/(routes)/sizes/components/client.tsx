"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import NewButton from "@/components/ui/NewButton";
import AddIcon from "@mui/icons-material/Add";
import Separator from "@/components/ui/Separator";
import { useParams, useRouter } from "next/navigation";
import DataTable from "@/components/ui/DataTable";
import { columns, SizeColumn } from "./columns";
import CellAction from "./CellAction";
import { ApiList } from "@/components/ui/ApiList";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  console.log("table data", data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes(${data.length})`}
          description="Manage sizes for your store"
        />
        <NewButton
          variant="default"
          size="default"
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
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
      <Heading title="API" description="API Calls for Sizes" />
      <Separator />
      <ApiList entityIdName="sizeId" entityName="sizes" />
    </>
  );
};

export default SizeClient;
