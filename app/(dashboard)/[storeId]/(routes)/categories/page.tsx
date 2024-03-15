import React from "react";
import CategoryClient from "./components/client";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { CategoryColumn } from "./components/columns";
const Categories = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    billboardLabel: cat.billboard.label,
    createdAt: format(cat.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default Categories;
