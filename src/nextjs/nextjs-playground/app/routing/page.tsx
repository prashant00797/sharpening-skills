import Link from "next/link";

export default function RoutingPage() {
  return (
    <main>
      <Link href="/" className="pg-back">
        ← Playground home
      </Link>
      <h1>Block 1 — Routing</h1>
      <div className="pg-panel">
        <p>
          Playground task — build this block here as you work through the
          Next.js learning document.
        </p>
      </div>
    </main>
  );
}
