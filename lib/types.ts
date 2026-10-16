// The three products ROMTech sells in this app
export const ITEMS = ["Portable Connect", "Tablet Arm", "Samsung Tablets"] as const;
export type ItemName = (typeof ITEMS)[number];

// The only statuses an order can have
export type OrderStatus = "Pending Approval" | "Pending Fulfillment" | "Billed";

// The shape of one sales order
export interface SalesOrder {
  id: string;            // e.g. "SO1001"
  customer: string;
  email: string;
  subsidiary: string;
  poNumber: string;
  items: ItemName[];
  quantity: number;
  shipDate: string;      // YYYY-MM-DD
  shipFrom: string;
  memo?: string;         // "?" means optional
  status: OrderStatus;
}

// What the server sends back to the form after saving
export interface FormState {
  message?: string;
  errors?: Partial<Record<keyof SalesOrder, string>>;
}