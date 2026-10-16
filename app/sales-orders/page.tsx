import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { getOrders } from "@/lib/data";
import OrdersTable from "@/components/OrdersTable";

export const metadata: Metadata = { title: "Sales Orders | ROMTech" };

// Server Component: the orders are loaded on the server before the page reaches the browser
export default async function SalesOrdersPage() {
  await connection(); 
  const orders = await getOrders();

  return (
    <section className="record">
      <div className="record-head">
        <h1>Sales Orders</h1>
        <Link href="/sales-orders/new" className="button primary">New Sales Order</Link>
      </div>
      <OrdersTable orders={orders} />
    </section>
  );
}