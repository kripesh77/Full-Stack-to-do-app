import { useEffect, useState } from "react";
import Toaster from "../Toaster/Toaster";
import { useAuth } from "../../context/AuthContext";
import TodoItem from "../TodoItem/TodoItem";
import Loader from "../Loader/Loader";

function Todo() {
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  useEffect(
    function () {
      async function dataFetch() {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const res = await fetch(`https://to-do-app-sxge.onrender.com/todos`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token,
            },
          });
          if (!res.ok) {
            if (res.status === 401) {
              throw new Error("Unauthorized, please login");
            }
            throw new Error("Unexpected Error, please login");
          }
          const data = await res.json();
          setTodos(data.todos);
        } catch (error) {
          setError("Error occured, please login again to continue!");
          localStorage.removeItem("token");
          setTimeout(() => {
            setIsAuthenticated(false);
          }, 1000);
        } finally {
          setIsLoading(true);
        }
      }
      dataFetch();
    },
    [setIsAuthenticated]
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const id = Date.now();
    try {
      setError("");

      const res = await fetch(`https://to-do-app-sxge.onrender.com/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: JSON.parse(localStorage.getItem("token")),
        },
        body: JSON.stringify({ description, id }),
      });

      if (!res.ok) throw new Error("Something went wrong !");

      const data = await res.json();
      if (data.userId) {
        setTodos((todos) => [...todos, { description, done: false, id }]);
        return;
      }
      throw new Error("Something went wrong !");
    } catch (error) {
      setError("Failed to add, try again later!");
    } finally {
      setDescription("");
    }
  }

  async function handleToggle(id) {
    try {
      const res = await fetch(
        `https://to-do-app-sxge.onrender.com/todo/${id}/toggle`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to toggle todo");

      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    } catch (error) {
      setError("Failed to mark as done/undone");
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(
        `https://to-do-app-sxge.onrender.com/todo/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token")),
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete todo");

      setTodos((todos) => todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  }

  async function handleUpdate(id, newDescription) {
    try {
      const res = await fetch(
        `https://to-do-app-sxge.onrender.com/todo/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: JSON.parse(localStorage.getItem("token")),
          },
          body: JSON.stringify({ description: newDescription }),
        }
      );

      if (!res.ok) throw new Error("Failed to update todo");

      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, description: newDescription } : todo
        )
      );
    } catch (error) {
      setError("Failed to update todo");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start pt-10 px-4 sm:px-6 md:px-8 overflow-x-hidden">
      <form
        className="w-full max-w-xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="todo"
          placeholder="Enter your todo"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="flex-grow w-full sm:w-auto px-4 py-2 h-[2.75rem] rounded-xl bg-[#dce4ef] text-[#333]
      shadow-[inset_4px_4px_10px_#c8d0e7,inset_-4px_-4px_10px_#ffffff]
      placeholder:text-gray-500 focus:outline-none focus:shadow-[inset_2px_2px_8px_#c8d0e7,inset_-2px_-2px_8px_#ffffff]
      transition-shadow duration-300"
        />

        <button
          type="submit"
          className="px-6 sm:px-8 py-2 h-[2.75rem] flex-shrink-0 rounded-full bg-[#dce4ef] text-[#333] font-semibold text-sm
      shadow-[4px_4px_10px_#c8d0e7,-4px_-4px_10px_#ffffff]
      hover:shadow-[inset_4px_4px_8px_#c8d0e7,inset_-4px_-4px_8px_#ffffff]
      active:shadow-[inset_2px_2px_6px_#c8d0e7,inset_-2px_-2px_6px_#ffffff]
      transition-all duration-200"
        >
          <span className="text-sky-600">Add</span>
        </button>
      </form>

      <div className="w-full max-w-5xl flex flex-col items-center gap-6 px-2 sm:px-4">
        {!isLoading ? (
          <Loader />
        ) : todos.length > 0 ? (
          todos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        ) : (
          <div
            className="text-[#dce4ef] font-extrabold text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-center
          [text-shadow:_2px_2px_4px_rgba(0,0,0,0.3),_-1px_-1px_4px_rgba(255,255,255,1)]
          mt-10 mb-16 px-4"
          >
            No Todos Yet. Start adding some!
          </div>
        )}
        {error && <Toaster message={error} borderColor="red" />}
      </div>
    </div>
  );
}

export default Todo;
