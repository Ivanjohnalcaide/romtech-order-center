import Link from "next/link";

// A React component for the navy NetSuite bar.
// It's added to layout.tsx, so it shows on every page.
export default function Header() {
  return (
    <header>
      <div className="topbar">
        <span className="brand">NetSuite</span>
        <span className="crumbs">Transactions &gt; Sales</span>
      </div>
      <nav className="tabs">
        <Link href="/sales-orders">Sales Orders</Link>
        <Link href="/sales-orders/new">Enter Sales Order</Link>
      </nav>
    </header>
  );
}