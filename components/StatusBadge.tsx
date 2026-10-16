import type { OrderStatus } from "@/lib/types";

// Shows a coloured label like "Billed" or "Pending Approval".
// The status prop is typed, so passing a status that doesn't exist is an error.
export default function StatusBadge({ status }: { status: OrderStatus }) {
  const className = status.toLowerCase().replaceAll(" ", "-");
  return <span className={`badge ${className}`}>{status}</span>;
}