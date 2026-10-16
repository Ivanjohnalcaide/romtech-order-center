import Link from "next/link";
import type { SalesOrder } from "@/lib/types";
import StatusBadge from "./StatusBadge";

// Receives the list of orders as a prop and draws the table
export default function OrdersTable({ orders }: { orders: SalesOrder[] }) {
  if (orders.length === 0) {
    return <p className="empty">No sales orders yet.</p>;
  }
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>SO #</th><th>Customer</th><th>Items</th><th>Qty</th>
            <th>Ship date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td><Link href={`/sales-orders/${o.id}`}>{o.id}</Link></td>
              <td>{o.customer}</td>
              <td>{o.items.join(", ")}</td>
              <td>{o.quantity}</td>
              <td>{o.shipDate}</td>
              <td><StatusBadge status={o.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}