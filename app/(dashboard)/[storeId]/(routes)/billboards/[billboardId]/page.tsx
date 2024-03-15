import prismadb from "@/lib/prismadb";
import BillBoardForm from "./components/billboard-form";
const BillboardsPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  let billboard;
  if (params.billboardId !== "new") {
    billboard = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });
  } else {
    billboard = null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  );
};
export default BillboardsPage;
