import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/data";
import StatusBadge from "@/components/StatusBadge";

// Dynamic route: the [id] folder means /sales-orders/SO1001 gives id = "SO1001"
export default async function OrderDetailPage({ params }: PageProps<"/sales-orders/[id]">) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound(); // no order with that number → show the 404 page

  return (
    <section className="record">
      <div className="record-head">
        <h1>Sales Order {order.id}</h1>
        <StatusBadge status={order.status} />
      </div>
      <dl className="details">
        <dt>Customer</dt><dd>{order.customer}</dd>
        <dt>Email</dt><dd>{order.email}</dd>
        <dt>Subsidiary</dt><dd>{order.subsidiary}</dd>
        <dt>PO #</dt><dd>{order.poNumber}</dd>
        <dt>Items</dt><dd>{order.items.join(", ")}</dd>
        <dt>Quantity</dt><dd>{order.quantity}</dd>
        <dt>Ship date</dt><dd>{order.shipDate}</dd>
        <dt>Ship from</dt><dd>{order.shipFrom}</dd>
        {order.memo && (<><dt>Memo</dt><dd>{order.memo}</dd></>)}
      </dl>
      <Link href="/sales-orders">← Back to Sales Orders</Link>
    </section>
  );
}