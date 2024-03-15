"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import NewButton from "@/components/ui/NewButton";
import AddIcon from "@mui/icons-material/Add";
import Separator from "@/components/ui/Separator";
import { useParams, useRouter } from "next/navigation";
import DataTable from "@/components/ui/DataTable";
import { columns, BillboardColumn } from "./columns";
import CellAction from "./CellAction";
import { ApiList } from "@/components/ui/ApiList";

interface BillBoardClientProps {
  data: BillboardColumn[];
}

const BillBoardClient: React.FC<BillBoardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  console.log("table data", data);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards(${data.length})`}
          description="Manage Billboards for your store"
        />
        <NewButton
          variant="default"
          size="default"
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <AddIcon />
          Add New
        </NewButton>
      </div>
      <Separator />
      <DataTable
        columns={columns}
        data={data}
        searchKey="label"
        hasActions={true}
        renderAction={(row) => <CellAction data={row} />}
      />
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityIdName="billboardId" entityName="billboards" />
    </>
  );
};

export default BillBoardClient;
