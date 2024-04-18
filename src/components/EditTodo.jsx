import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Button from "./Button";
import { todoDispatcherContext } from "../context/todoContext";

export default function EditTodo({ todo, cancelEditTodo }) {
  const [value, setValue] = useState(todo.content);
  const dispatch = useContext(todoDispatcherContext);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      dispatch({
        type: "EDIT_TODO",
        id: todo.id,
        content: value,
      });
      setValue("");
    }
  }

  function handleClick() {
    if (value.length) {
      dispatch({
        type: "EDIT_TODO",
        id: todo.id,
        content: value,
      });
      setValue("");
    }
  }

  return (
    <div className="edit-todo d-flex justify-content-center align-items-center mb-10">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        className="mr-15"
        placeholder="Ajouter une tâche"
      />
      <Button
        onClick={e => {
          e.stopPropagation();
          handleClick();
        }}
        text={`Sauvegarder`}
        className={`mr-15`}
      />
      <Button
        onClick={e => {
          e.stopPropagation();
          cancelEditTodo()();
        }}
        text={`Annuler`}
        className={`mr-15`}
      />
    </div>
  );
}

EditTodo.propTypes = {
  todo: PropTypes.object,
  cancelEditTodo: PropTypes.func,
};
