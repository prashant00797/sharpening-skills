import React from "react";
import { MessageBubble } from "./MessageBubble";

const PassProps = () => {
  return (
    <>
      <MessageBubble
        id={1}
        role="assistant"
        content="Hello"
        timestamp={new Date()}
      />
      <MessageBubble
        id={2}
        role="user"
        content="How does RAG work?"
        timestamp={new Date()}
        showCopyButton={true}
        onDelete={(id) => console.log("delete", id)}
      />
      <MessageBubble id={3} role="bot" content="hi" timestamp={new Date()} />
    </>
  );
};

export default PassProps;

// ─────────────────────────────────────────────────
// Test your typing — these usages should show errors or be valid:

// Should be VALID:
{
  /* <MessageBubble id={1} role="assistant" content="Hello" timestamp={new Date()} />

 
Should ALSO be valid (with optional props):
<MessageBubble
  id={2}
  role="user"
  content="How does RAG work?"
  timestamp={new Date()}
  showCopyButton={true}
  onDelete={(id) => console.log("delete", id)}
/>
 
Should be an ERROR — wrong role value:
<MessageBubble id={3} role="bot" content="hi" timestamp={new Date()} /> */
}
