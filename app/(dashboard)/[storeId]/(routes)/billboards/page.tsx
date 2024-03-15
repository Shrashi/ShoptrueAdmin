import React from "react";
import BillBoardClient from "./components/client";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { BillboardColumn } from "./components/columns";
const Billboards = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillBoards: BillboardColumn[] = billboards.map((board) => ({
    id: board.id,
    label: board.label,
    createdAt: format(board.createdAt, "MMMM do, yyyy"),
  }));

  console.log("boards", billboards, params.storeId);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillBoards} />
      </div>
    </div>
  );
};

export default Billboards;
