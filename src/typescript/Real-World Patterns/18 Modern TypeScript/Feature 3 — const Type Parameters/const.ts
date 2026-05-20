// Problem: TypeScript widens string literal types inside generics
function createTuple<T>(arr: T[]) {
  return arr;
}

const result = createTuple(["a", "b", "c"]);
// TypeScript infers: string[] — not ["a", "b", "c"]

// WITH const modifier — preserves literal types
function _createTuple<const T>(arr: T[]) {
  return arr;
}

const result2 = createTuple(["a", "b", "c"]);
// TypeScript infers: readonly ["a", "b", "c"] — exact values!

type _RouteConfig = {
  path: string;
  label: string;
  requiresAuth: boolean;
};
// Real use case: building typed route arrays, config builders
function defineRoutes<const T extends _RouteConfig[]>(routes: T) {
  return routes;
}

const routes = defineRoutes([
  { path: "/", label: "Home", requiresAuth: false },
]);
routes[0].path; //→ TypeScript knows it is exactly "/" not just string
