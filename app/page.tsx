import { redirect } from "next/navigation";

// The home page just sends you to the Sales Orders list
export default function Home() {
  redirect("/sales-orders");
}