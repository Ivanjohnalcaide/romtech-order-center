import type { SalesOrder } from "./types";

// A simple pretend "database" kept in memory.
// The orders reset when you stop and restart the server. That's fine for this assignment.
// (Stored on globalThis so editing files during development doesn't wipe it.)
const store = globalThis as unknown as { orders?: SalesOrder[] };

store.orders ??= [
  {
    id: "SO1001",
    customer: "Brookfield, CT",
    email: "test@romtech.com",
    subsidiary: "ROM Technologies INC.",
    poNumber: "PO-10001",
    items: ["Portable Connect", "Tablet Arm"],
    quantity: 2,
    shipDate: "2026-10-20",
    shipFrom: "Brookfield, CT",
    status: "Pending Fulfillment",
  },
  {
    id: "SO1002",
    customer: "Brookfield, CT",
    email: "test@romtech.com",
    subsidiary: "ROM Technologies INC.",
    poNumber: "PO-10002",
    items: ["Samsung Tablets"],
    quantity: 5,
    shipDate: "2026-10-22",
    shipFrom: "Brookfield, CT",
    status: "Billed",
  },
];

// Get every order
export async function getOrders(): Promise<SalesOrder[]> {
  return store.orders!;
}

// Get one order by its SO number, or undefined if it doesn't exist
export async function getOrder(id: string): Promise<SalesOrder | undefined> {
  return store.orders!.find((o) => o.id === id);
}

// Save a new order. The id and status are filled in automatically.
export async function addOrder(order: Omit<SalesOrder, "id" | "status">): Promise<SalesOrder> {
  const newOrder: SalesOrder = {
    ...order,
    id: "SO" + (1001 + store.orders!.length),
    status: "Pending Approval",
  };
  store.orders!.push(newOrder);
  return newOrder;
}