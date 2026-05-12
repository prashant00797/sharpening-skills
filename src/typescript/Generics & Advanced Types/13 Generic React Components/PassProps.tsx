import { ReactNode } from "react";
import {GenericTable} from "./GenericTable"

type Message = { id: number; role: string; content: string; timestamp: Date };
type Column<T> = {

  key: keyof T      // key must be an actual key of T
  header: string
  render: (item: T) => ReactNode
}

const messages: Message[] = [
  { id: 1, role: "user", content: "hi", timestamp: new Date() },
  { id: 2, role: "assistant", content: "hello", timestamp: new Date() },
]

const columns: Column<Message>[] = [
  { key: "role", header: "Role", render: (m) => <strong>{m.role}</strong> },
  { key: "content", header: "Content", render: (m) => <p>{m.content}</p> },
  {
    key: "timestamp",
    header: "Time",
    render: (m) => m.timestamp.toLocaleTimeString(),
  },
];

const PassProps = () => {
  return (
    <GenericTable
      data={messages}
      columns={columns}
      keyExtractor={(m) => m.id}
    />
  );
};

export default PassProps;
