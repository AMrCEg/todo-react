import React from "react";

const Todo = (props) => {
  const styles = {
    textDecoration: props.todo.complete ? "line-through" : "",
    textDecorationColor: props.todo.complete ? "red" : "",
    opacity: props.todo.complete ? "0.2" : "1",
  };

  return (
    <div className="d-f">
      <div className="todo" style={styles} onClick={props.toggleComplete}>
        {props.todo.text}
      </div>
      {!props.todo.complete && (
        <button
          className="update-btn btn-55"
          onClick={() => props.handleUpdate(props.id)}
        >
          update
        </button>
      )}

      <button
        className="delete-btn btn-55"
        onClick={() => props.handleDelete(props.id)}
      >
        X
      </button>
    </div>
  );
};

export default Todo;
