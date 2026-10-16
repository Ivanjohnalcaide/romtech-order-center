"use server"; // Everything in this file runs only on the server

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addOrder } from "@/lib/data";
import { ITEMS, type FormState, type ItemName } from "@/lib/types";

export async function createOrder(_prev: FormState, formData: FormData): Promise<FormState> {
  // Read each field from the submitted form
  const customer = String(formData.get("customer") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subsidiary = String(formData.get("subsidiary") ?? "");
  const poNumber = String(formData.get("poNumber") ?? "").trim();
  const items = formData.getAll("items").map(String); // multi-select gives several values
  const quantity = Number(formData.get("quantity"));
  const shipDate = String(formData.get("shipDate") ?? "");
  const shipFrom = String(formData.get("shipFrom") ?? "").trim() || "Brookfield, CT";
  const memo = String(formData.get("memo") ?? "").trim();

  // Server-side validation: never trust the browser alone
  const errors: FormState["errors"] = {};
  if (customer.length < 3) errors.customer = "Enter at least 3 characters.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (!subsidiary) errors.subsidiary = "Select a subsidiary.";
  if (!/^PO-\d{5}$/.test(poNumber)) errors.poNumber = "Use the format PO-12345.";
  if (items.length === 0) errors.items = "Select at least one item.";
  if (!items.every((i) => (ITEMS as readonly string[]).includes(i))) errors.items = "Unknown item selected.";
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 500) errors.quantity = "Quantity must be 1 – 500.";
  if (!shipDate) errors.shipDate = "Pick a ship date.";

  if (Object.keys(errors).length > 0) {
    return { errors, message: "The sales order wasn't saved. Fix the highlighted fields." };
  }

  let id: string;
  try {
    const order = await addOrder({
      customer, email, subsidiary, poNumber,
      items: items as ItemName[], quantity, shipDate, shipFrom, memo,
    });
    id = order.id;
  } catch (err) {
    console.error(err);
    return { message: "Something went wrong while saving. Try again." };
  }

  revalidatePath("/sales-orders");   // refresh the list page
  redirect(`/sales-orders/${id}`);   // go to the new order's record page
}