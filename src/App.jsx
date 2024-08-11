import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import TodoForm from "./Components/TodoForm";
import Todo from "./Components/Todo";

import "./App.css";

const App = () => {
  const [todos, setTodos] = useState(() =>
    localStorage.todos ? JSON.parse(localStorage.todos) : []
  );
  const [inputValue, setInputValue] = useState("");

  const [mode, setMode] = useState("add");
  const [updatedTodoId, setUpdatedTodoId] = useState();

  const [toggleAllComplete, setToggleAllComplete] = useState(true);

  const [todoShow, setTodoShow] = useState("all");

  ////refactor function to handleSubmit add or update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      alert("Empty input not allowed");
      return;
    }

    if (mode === "add") {
      setTodos([...todos, { id: nanoid(), text: inputValue, complete: false }]);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === updatedTodoId ? { ...todo, text: inputValue } : todo
        )
      );
      setMode("add");
    }

    setInputValue("");
  };

  // console.log(todos);

  ////useEffect for store todos in localStorage
  useEffect(() => {
    localStorage.todos = JSON.stringify(todos);
  }, [todos]);

  ////function to handle Delete
  const handleDelete = (id) => {
    // console.log(id);
    const filterdTodos = todos.filter((todo) => todo.id !== id);
    // console.log(filterdTodos);
    setTodos(filterdTodos);
  };

  ////function to handle Update
  const handleUpdate = (id) => {
    // console.log(id);
    const todo = todos.find((todo) => todo.id == id);
    setInputValue(todo.text);
    setUpdatedTodoId(id);
    setMode("update");
  };

  ////function toggle Todo between Complete and unComplete when click on Todo
  // const toggleComplete = (id) => {
  //   setTodos(
  //     todos.map((todo) => {
  //       if (todo.id === id) {
  //         return {
  //           ...todo,
  //           complete: !todo.complete,
  //         };
  //       } else {
  //         return todo;
  //       }
  //     })
  //   );
  // };

  ////refactor function toggle Todo between Complete and unComplete when click on Todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      )
    );
  };

  /* problem in show buttons
  //function update Todo Show  
  // const updateTodoShow = (s) => {
  //   setTodoShow(s);
  // };

  // if (todoShow === "uncomplete") {
  //   return todos.filter((todo) => !todo.complete);
  
  // } else if (todoShow === "complete") {
  //   return todos.filter((todo) => todo.complete);
  // }
*/

  // Function to filter todos based on their completion status
  const filterTodos = () => {
    if (todoShow === "uncomplete") {
      return todos.filter((todo) => !todo.complete);
    } else if (todoShow === "complete") {
      return todos.filter((todo) => todo.complete);
    }
    return todos;
  };

  //function toggle all todo between Complete and unComplete
  const toggleAll = () => {
    if (todos.length) {
      setTodos(
        todos.map((todo) => {
          return {
            ...todo,
            complete: toggleAllComplete,
          };
        })
      );
      setToggleAllComplete(!toggleAllComplete);
    } else {
      alert("No Tasks");
    }
  };

  //// refactor function deleteAllCompleted todos

  const deleteAllCompleted = () => {
    const filteredTodos = todos.filter((todo) => !todo.complete);

    if (filteredTodos.length === todos.length) {
      alert("No completed tasks to delete.");
    } else {
      setTodos(filteredTodos);
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">Todo App</h1>
      <TodoForm
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        setInputValue={setInputValue}
        mode={mode}
        setMode={setMode}
      />
      <div className="todos">
        {filterTodos().map((todo, index) => (
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            toggleComplete={() => toggleComplete(todo.id)}
          />
        ))}
      </div>

      {todos.length > 0 && (
        <div className="show-btns">
          <button
            className={`btn-55 ${todoShow === "all" && "active"}`}
            onClick={() => setTodoShow("all")}
          >
            <span>Show All</span>
          </button>
          <button
            className={`btn-55 ${todoShow === "uncomplete" && "active"}`}
            onClick={() => setTodoShow("uncomplete")}
          >
            <span>Show unCompleted</span>
          </button>
          <button
            className={`btn-55 ${todoShow === "complete" && "active"}`}
            onClick={() => setTodoShow("complete")}
          >
            <span>Show Completed</span>
          </button>
        </div>
      )}

      <div className="all-btns">
        {todos.length > 0 && (
          <button
            className="all-btn btn-55"
            onClick={() => toggleAll()}
            aria-label={`Toggle all todos to ${
              toggleAllComplete ? "completed" : "incomplete"
            }`}
          >
            <span>{`Toggle All To: ${
              toggleAllComplete ? "Completed" : "UnCompleted"
            } `}</span>
          </button>
        )}
        {/* Currently, you check todos.length before showing the "Toggle All" and "Delete All Completed" buttons.
        This is good, but you can further refine the logic to only show the "Delete All Completed" button if there
        are actually any completed todos. */}
        {/* todos.length > 0 && (*/}
        {todos.some((todo) => todo.complete === true) && (
          <button className=" btn-55" onClick={() => deleteAllCompleted()}>
            <span>Delete All Completed</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
