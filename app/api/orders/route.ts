import { connection } from "next/server";
import { getOrders } from "@/lib/data";

// API route: GET http://localhost:3000/api/orders returns all orders as JSON
export async function GET() {
  await connection();
  try {
    const orders = await getOrders();
    return Response.json(orders);
  } catch {
    return Response.json({ error: "Could not load orders." }, { status: 500 });
  }
}