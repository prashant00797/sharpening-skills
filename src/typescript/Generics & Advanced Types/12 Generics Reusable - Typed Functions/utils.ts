// utils.ts
 
// 1. Returns the last item of any array
//    getLast([1,2,3]) → 3
//    getLast(["a","b"]) → "b"
function getLast<T>(arr: T[]): T {
  return arr[arr.length - 1]
}
 
// 2. Wraps a value with loading and error state
//    Used everywhere you fetch async data
type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}
 
// Create an initial AsyncState for any type
function createAsyncState<T>(): AsyncState<T> {
  return { data: null, loading: false, error: null }
}

 
// 3. Finds the first item in an array that matches a condition
//    findFirst([1,2,3], n => n > 1) → 2 -->checked solution
//    Works for any array type
function findFirst<T>(arr: T[], predicate: (item:T) => boolean): T |null {
  return arr.find(predicate) ?? null
}
 
// 4. Groups an array of objects by a string key
//    groupBy(messages, "role") → { user: [...], assistant: [...] }
//    T must be an object. K must be a key of T.
function groupBy<T extends object, U extends keyof T>(arr: T[], key: U): Record<string, T[]> {
  return arr.reduce((groups, item) => {
    const groupKey = String(item[key])
    return {
      ...groups,
      [groupKey]: [...(groups[groupKey] ?? []), item]
    }
  }, {} as Record<string, T[]>)
}
 
// ─────────────────────────────────────────────────
// Test your generics:
    
    
type Message = {
    
    id: number;
    role: string;
    content: string
}
 
const last = getLast([10, 20, 30])            // should be: number
const state = createAsyncState<Message>()     // should be: AsyncState<Message>
const found = findFirst([1,2,3], n => n > 1) // should be: number | null
 
const msgs: Message[] = [
  { id: 1, role: "user", content: "hi" },
  { id: 2, role: "assistant", content: "hello" },
]
const grouped = groupBy(msgs, "role")         // should be: Record<string, Message[]>
 

