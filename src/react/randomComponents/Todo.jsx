import { useState } from "react";

// Asked in EY got from linkedin
const List = ({ todos, handleDelete }) => {
  return todos?.map((item) => (
    <div key={item.id} className="flex items-center gap-8">
      <ul className="list-disc">
        {!isNaN(item.todo) ? (
          <li>{Number(item.todo) * 5}</li>
        ) : (
          <li>{item.todo}</li>
        )}
      </ul>
      <button
        type="button"
        onClick={() => handleDelete(item.id)}
        className="p-1 rounded-sm bg-red-400 "
      >
        deleteTodo
      </button>
    </div>
  ));
};
const Todo = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      todo: "create repo",
    },
    {
      id: 2,
      todo: "10",
    },
  ]);
  const [addTodo, setAddTodo] = useState({
    id: null,
    todo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    if (addTodo.todo.trim() === "") return;
    setTodos((prev) => [...prev, { ...addTodo, id: crypto.randomUUID() }]);
    setAddTodo((prev) => ({
      ...prev,
      todo: "",
    }));
  };

  const handleDelete = (id) => {
    const updateTodo = todos.filter((item) => item.id != id);
    setTodos(updateTodo);
  };

  return (
    <div className="max-w-6xl shadown-sm p-4 mx-auto flex flex-col items-center gap-7">
      <div className="flex items-center gap-4">
        <input
          type="text"
          name="todo"
          id="todo"
          autoComplete="off"
          value={addTodo.todo}
          onChange={handleChange}
          className="rounded-xs p-2 border border-gray-300"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={addTodo.todo.trim() === ""}
          className="p-2 rounded-sm bg-blue-500 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          addTodo
        </button>
      </div>
      <List todos={todos} handleDelete={handleDelete} />
    </div>
  );
};

export default Todo;
