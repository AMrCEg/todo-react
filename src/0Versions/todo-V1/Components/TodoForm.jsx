import React, { useState } from "react";

const TodoForm = (props) => {
  return (
    <form className="d-f" onSubmit={props.handleSubmit}>
      <input
        className="input-filed"
        type="text"
        placeholder=" Type Todo"
        onChange={(e) => props.setInputValue(e.target.value)}
        name="text"
        value={props.inputValue}
      />
      <button
        className="add-btn btn-89"
        role="button "
        onClick={props.handleSubmit}
      >
        {props.mode === "add" ? "Add Todo" : "Update Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
