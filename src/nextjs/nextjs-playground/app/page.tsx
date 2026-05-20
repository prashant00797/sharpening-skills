import Link from "next/link";

const blocks = [
  { href: "/routing", label: "Block 1 — Routing" },
  { href: "/server-client", label: "Block 2 — Server vs Client" },
  { href: "/data-fetching", label: "Block 3 — Data Fetching" },
  { href: "/rendering", label: "Block 4 — Rendering Strategies" },
  { href: "/server-actions", label: "Block 5 — Server Actions" },
  { href: "/route-handlers", label: "Block 6 — Route Handlers" },
  { href: "/layouts-errors", label: "Block 7 — Layouts / Error / Loading" },
  { href: "/optimisations", label: "Block 8 — Optimisations" },
  { href: "/genai", label: "Block 9 — GenAI Patterns" },
];

export default function Home() {
  return (
    <main>
      <header className="pg-header">
        <span className="pg-eyebrow">Next.js Learning System</span>
        <h1>Next.js Playground</h1>
        <p className="pg-lead">
          Build first. Question second. Answer last. Pick a block to start.
        </p>
      </header>

      <ul className="pg-grid">
        {blocks.map((b) => (
          <li key={b.href}>
            <Link href={b.href} className="pg-card">
              {b.label}
              <span className="pg-card-arrow" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
