import React from "react";
import OrderClient from "./components/client";
import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
const Orders = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((ord) => ({
    id: ord.id,
    phone: ord.phone,
    address: ord.address,
    isPaid: ord.isPaid,
    products: ord.orderItems.map((pro) => pro.product.name).join(", "),
    totalPrice: formatter.format(
      ord.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(ord.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default Orders;
