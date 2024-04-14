import { useState } from "react";
// import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";

function AddTodo({ addTodo }) {
  const [value, setValue] = useState("");

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      addTodo(value);
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      addTodo(value);
      setValue("");
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <input
        type="text"
        minLength={2}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={"Ajouter une todo ->"}
        className="mr-15 flex-fill"
      />

      <button onClick={handleClick} className="btn btn-primary">
        Ajouter
      </button>
    </div>
  );
}

AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddTodo;
