import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";

import React, { useEffect, useState } from "react";

import {
  scanItems,
  addItem,
  updateItem,
  deleteItem,
} from "./components/dynamo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const items = await scanItems();

    setTodos(items);
  };

  const handleAdd = async () => {
    await addItem({ id: Date.now().toString(), task: "New Task" });

    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);

    fetchTodos();
  };

  return (
    <div>
      <h1>Todo List</h1>

      <button onClick={handleAdd}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task} <button onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
