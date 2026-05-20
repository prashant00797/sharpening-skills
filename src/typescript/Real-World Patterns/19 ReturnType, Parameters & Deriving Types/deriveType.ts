// derive-types.ts
 
// These functions already exist in your codebase.
// DERIVE types from them — do not write them manually.
 
async function getSessionById(id: string, includeMessages: boolean) {
  return {
    id,
    title: "My Chat",
    model: "gpt-4o" as const,
    createdAt: new Date(),

    messages: includeMessages ? [{ role: "user", content: "hi" }] : []
  }
}
 
function applySettings(model: string, temperature: number, maxTokens: number) {
  return { model, temperature, maxTokens, updatedAt: new Date() }
}
 
// 1. Derive the resolved return type of getSessionById
type Session = Awaited<ReturnType<typeof getSessionById>>
 
// 2. Derive the return type of applySettings (sync, no Awaited needed)
type AppliedSettings = ReturnType<typeof applySettings>
 
// 3. Derive the parameter types of applySettings as a tuple
type ApplySettingsParams = Parameters<typeof applySettings>
 
// 4. Use keyof on AppliedSettings to get all its keys as a union
type SettingsKey = keyof AppliedSettings
 
// 5. Build a typed settings updater
//    Takes a key (must be a key of AppliedSettings)
//    and a value (must match the type of that key)
//    Uses keyof and index access
function updateSetting<K extends SettingsKey>(key: K, value: AppliedSettings[K]): void {
  console.log(`Updating ${String(key)} to`, value)
}

// Test — these should work:
updateSetting("temperature", 0.8)   // OK
updateSetting("model", "gpt-4o")    // OK
 
// These should give errors:
updateSetting("temperature", "hot") // Error — string not number
updateSetting("unknown", 5)         // Error — not a key

