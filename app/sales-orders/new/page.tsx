import type { Metadata } from "next";
import { connection } from "next/server";
import SalesOrderForm from "@/components/SalesOrderForm";

export const metadata: Metadata = { title: "Enter Sales Order | ROMTech" };

export default async function NewSalesOrderPage() {
  await connection(); // work out "today" on each visit, not once at build time
  const d = new Date();
  const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  return (
    <section className="record">
      <h1>Enter Sales Order</h1>
      <p className="hint">All fields except Memo are required.</p>
      <SalesOrderForm today={today} />
    </section>
  );
}