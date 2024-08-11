import React from "react";

const Todo = (props) => {
  const styles = {
    textDecoration: props.todo.complete ? "line-through" : "",
    textDecorationColor: props.todo.complete ? "red" : "",
    opacity: props.todo.complete ? "0.2" : "1",
  };

  return (
    <div className="todo d-flex">
      <div
        className="todo-text"
        style={styles}
        onClick={props.toggleComplete}
        aria-label={`Todo item: ${props.todo.text}. ${
          props.todo.complete ? "Marked as complete" : "Marked as incomplete"
        }`}
      >
        {props.todo.text}
      </div>
      {!props.todo.complete && (
        <button
          className="update-btn btn-55"
          onClick={() => props.handleUpdate(props.id)}
          aria-label="Update this todo item"
        >
          update
        </button>
      )}

      <button
        className="delete-btn btn-55"
        onClick={() => props.handleDelete(props.id)}
        aria-label="Delete this todo item"
      >
        X
      </button>
    </div>
  );
};

export default Todo;
