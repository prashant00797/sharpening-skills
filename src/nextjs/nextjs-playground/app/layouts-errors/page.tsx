import Link from "next/link";

export default function LayoutsErrorsPage() {
  return (
    <main>
      <Link href="/" className="pg-back">
        ← Playground home
      </Link>
      <h1>Block 7 — Layouts / Error / Loading</h1>
      <div className="pg-panel">
        <p>
          Playground task — build this block here as you work through the
          Next.js learning document.
        </p>
      </div>
    </main>
  );
}
