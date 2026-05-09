/**
 Scenario
You are building a reusable message bubble component for the AI chat app. 
It displays a message with role styling, a timestamp, an optional copy button, 
and accepts an optional delete handler. 
You need to type all props correctly.

 */

// MessageBubble.tsx

// You have these from previous days:
type MessageRole = "user" | "assistant" | "system";

// Define the props type for MessageBubble
// Required: id (number), role, content (string), timestamp (Date)
// Optional: onDelete — a function that receives the message id (number) and returns nothing
// Optional: showCopyButton — boolean, default false

type MessageBubbleProps = {
  id: number;
  content: string;
  role: MessageRole;
  timestamp: Date;
  onDelete?: (msg_id: number) => void;
  showCopyButton?: boolean;
};

// Build the component
export function MessageBubble({
  id,
  content,
  role,
  timestamp,
  onDelete,
  showCopyButton = false,
}: MessageBubbleProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className={`bubble bubble--${role}`}>
      <p>{content}</p>
      <span>{timestamp.toLocaleTimeString()}</span>
      {showCopyButton && <button onClick={handleCopy}>Copy</button>}
      {onDelete && <button onClick={() => onDelete(id)}>Delete</button>}
    </div>
  );
}
