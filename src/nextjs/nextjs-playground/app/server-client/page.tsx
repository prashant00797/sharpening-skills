import Link from "next/link";

export default function ServerClientPage() {
  return (
    <main>
      <Link href="/" className="pg-back">
        ← Playground home
      </Link>
      <h1>Block 2 — Server vs Client</h1>
      <div className="pg-panel">
        <p>
          Playground task — build this block here as you work through the
          Next.js learning document.
        </p>
      </div>
    </main>
  );
}
