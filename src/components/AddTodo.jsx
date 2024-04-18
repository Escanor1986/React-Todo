import { useContext, useState } from "react";
import Button from "./Button";
import { todoDispatcherContext } from "../context/todoContext";

function AddTodo() {
  const [value, setValue] = useState("");
  const dispatch = useContext(todoDispatcherContext);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      dispatch({
        type: "ADD_TODO",
        content: value,
      });
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      dispatch({
        type: "ADD_TODO",
        content: value,
      });
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
        placeholder={"Ajouter une todo"}
        className="mr-15 flex-fill"
      />
      <Button text={`Ajouter`} onClick={handleClick} />
    </div>
  );
}

export default AddTodo;
