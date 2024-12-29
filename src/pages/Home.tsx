import { useState, useEffect } from "react";
import Todo from "../types/todo";
import TodoTile from "../components/TodoTile";
import axios from "axios";

const HomePage = () => {
  const API_URL = "http://localhost:8080";

  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  async function fetchTodos() {
    const result = await axios.get(`${API_URL}/api/todo`);

    const newTodos = result.data.data.map(
      (e: { text: string; done: boolean; _id: string }) => {
        return {
          text: e.text,
          done: e.done,
          id: e._id,
        };
      }
    );

    setTodos(newTodos);
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo() {
    const result = await axios.post(`${API_URL}/api/todo`, {
      text: text,
    });
    console.log(result.data);
    setText("");

    await fetchTodos();
  }

  async function onCompleted(id: number) {
    const result = await axios.put(`${API_URL}/api/todo/${id}`);

    console.log(result.data);

    await fetchTodos();
  }

  async function onDeleted(id: number) {
    const result = await axios.delete(`${API_URL}/api/todo/${id}`);

    console.log(result.data);

    await fetchTodos();
  }

  return (
    <div>
      <h1>Home Page</h1>
      {todos.map((element) => {
        return (
          <TodoTile
            key={element.id}
            todo={element}
            onCompleted={onCompleted}
            onDeleted={onDeleted}
          />
        );
      })}
      <div>
        <input
          type="text"
          placeholder="Enter todo here"
          className="inputField"
          value={text}
          onChange={(e) => {
            e.preventDefault();
            setText(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default HomePage;
