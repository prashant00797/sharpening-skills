// satisfies-practice.ts
 
type RouteConfig = {
  path: string
  label: string
  requiresAuth: boolean
}
 
// Define this navigation config using satisfies
// It should validate against RouteConfig[] but keep specific string types
const navRoutes = [
  { path: "/", label: "Home", requiresAuth: false },
  { path: "/chat", label: "Chat", requiresAuth: true },
  { path: "/history", label: "History", requiresAuth: true },
] satisfies RouteConfig[]
 
// This should give an error — "settings" is missing requiresAuth
const badRoutes = [
  { path: "/settings", label: "Settings" },  // missing requiresAuth
] satisfies RouteConfig[]

