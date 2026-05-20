// When a subclass overrides a parent method, TypeScript now requires
// the "override" keyword — prevents silent bugs when parent changes
 
class BaseLogger {
  log(message: string): void {
    console.log(message)
  }
}
 
class ChatLogger extends BaseLogger {
  override log(message: string): void {  // "override" makes intent explicit
    console.log(`[CHAT] ${message}`)
  }
}
 
// If BaseLogger renames log() to record(), TypeScript shows an error on
// the override — without this, the subclass method silently becomes a new method

