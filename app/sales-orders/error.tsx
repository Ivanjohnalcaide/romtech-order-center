"use client"; // Error screens must be Client Components

// Shown automatically if a page in /sales-orders throws an error
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <section className="record">
      <h1>Something went wrong</h1>
      <p className="status err">{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </section>
  );
}