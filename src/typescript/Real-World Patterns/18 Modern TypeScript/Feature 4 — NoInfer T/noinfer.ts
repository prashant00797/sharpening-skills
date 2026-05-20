// Problem: TypeScript infers T from ALL usages and picks the widest type
function createState<T>(initial: T, fallback: T): T {
  return initial ?? fallback;
}

// You want T = "idle" (from initial)
// But "active" in fallback makes T = "idle" | "active"
const s = createState("idle", "active"); // T becomes: string

// WITH NoInfer — tells TS: infer T from initial only, not from fallback
function createState2<T>(initial: T, fallback: NoInfer<T>): T {
  return initial ?? fallback;
}

// Now T = "idle", and fallback must MATCH that — not widen it
const s2 = createState2("idle", "idle"); // OK
const s3 = createState2("idle", "active"); // Error — "active" not assignable to "idle"

// Use case: generic functions where one param defines T
// and another param should just CONFIRM to that type
