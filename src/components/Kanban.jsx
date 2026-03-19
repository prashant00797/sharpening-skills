import { useState } from "react";
import { kanbanData } from "../data/kanbanData";

const Task = ({ dragStart, task, id, handleDelete, handleUpdate }) => {
  const columnStyles = {
    todo: "bg-blue-500 text-white cursor-pointer",
    inProgress: "bg-yellow-500 text-white cursor-pointer",
    done: "bg-gray-200 cursor-no-drop text-black opacity-60",
  };
  const statusStyles = {
    todo: "bg-green-100 text-green-500",
    inProgress: "bg-yellow-100 text-yellow-500",
    done: "bg-red-100 text-red-500",
  };
  return task?.map(
    (item) =>
      item.coloumn === id && (
        <div
          draggable={id !== "done"}
          onDragStart={dragStart}
          key={item.id}
          id={item.id}
          className={`shadow-md rounded-sm  text-center  flex-col items-center  pt-2 my-4 ${columnStyles[item.coloumn]}`}
        >
          <h1>{item.task}</h1>
          <span>{item.id}</span>
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs ${statusStyles[item.coloumn]}`}
          >
            {item.coloumn}
          </span>
          {id !== "done" && (
            <button
              type="button"
              onClick={(e) => handleDelete(e)}
              id={item.id}
              className="align-bottom mx-1 text-red-500 cursor-pointer"
            >
              delete
            </button>
          )}
        </div>
      ),
  );
};

const AddTask = ({ setTask, task }) => {
  const [toggleFormAdd, setToggleFormAdd] = useState(false);
  const [toggleFormUpdate, setToggleFormUpdate] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    task: "",
    coloumn: "todo",
  });
  const handleFormChangeAdd = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const updateFormData = { ...formData, id: crypto.randomUUID() };
    setTask((prev) => [...prev, updateFormData]);
    setFormData((prev) => ({
      ...prev,
      task: "",
    }));
  };
  const handleFormChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    const updateFormData = { ...formData };
    setTask((prev) => [...prev, updateFormData]);
    setFormData((prev) => ({
      ...prev,
      task: "",
    }));
  };

  return (
    <>
      <div className="pl-10 my-5">
        <div id="add">
          <button
            className="px-3 py-2 text-sm rounded-md cursor-pointer bg-blue-400 hover:brightness-110"
            onClick={() => setToggleFormAdd(!toggleFormAdd)}
          >
            AddTask
          </button>
        </div>
        {toggleFormAdd && (
          <div className="pl-10">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Enter your task"
                autoComplete="off"
                type="text"
                name="task"
                id="task"
                value={formData.task}
                onChange={(e) => handleFormChangeAdd(e)}
                className="p-3 shadow-sm roudner-sm w-100 border border-gray-300 "
              />
              <button
                className="px-3 py-2 text-sm rounded-md cursor-pointer bg-blue-400 hover:brightness-110"
                onClick={handleSubmitAdd}
              >
                Done
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

/// dom results like e.target.id all are string values so better watch while comparing

const Kanban = () => {
  const [draggingTask, setDraggingTask] = useState(null);
  const [task, setTask] = useState(kanbanData);

  const handleDragStartChange = (e) => {
    // const _itemDone = task.find((item) => item.id === e.target.id);
    // console.log(_itemDone.coloumn);

    setDraggingTask(e.target.id);
  };
  const handleDragEndChange = (e) => {
    e.preventDefault();
    setDraggingTask(null);
  };

  const handleDragging = (e) => {
    e.preventDefault();
  };
  const handleOnDropChange = (e) => {
    if (!draggingTask) return;
    const doneObj = task.find((item) => item.id === draggingTask);
    if (doneObj.coloumn === "done") return;

    const update = task.map((item) => {
      return item.id === draggingTask
        ? { ...item, coloumn: e.currentTarget.id }
        : item;
    });

    setTask(update);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const update = task.filter((item) => item.id !== e.target.id);
    setTask(update);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const update = task.filter((item) => item.id !== e.target.id);
    setTask(update);
  };

  return (
    <>
      <div className="mb-10">
        <div className="grid grid-cols-3 justify-center p-4 max-w-6xl mx-auto divide-x-4 divide-gray-900">
          <div
            id="todo"
            className="pl-4 transition-all duration-150"
            onDragEnd={handleDragEndChange}
            onDragOver={handleDragging}
            onDrop={handleOnDropChange}
          >
            <h1>Todo</h1>
            <Task
              dragStart={handleDragStartChange}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              task={task}
              id="todo"
            />
          </div>
          <div
            id="inProgress"
            className="pl-4"
            onDragEnd={handleDragEndChange}
            onDrop={handleOnDropChange}
            onDragOver={handleDragging}
          >
            <h1>In-progress</h1>
            <Task
              dragStart={handleDragStartChange}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              task={task}
              id="inProgress"
            />
          </div>
          <div
            id="done"
            className="pl-4"
            onDragOver={handleDragging}
            onDrop={handleOnDropChange}
            onDragEnd={handleDragEndChange}
          >
            <h1>Done</h1>
            <Task task={task} id="done" />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <AddTask task={task} setTask={setTask} />
      </div>
    </>
  );
};

export default Kanban;
