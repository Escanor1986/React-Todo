import PropTypes from "prop-types";
import Button from "./Button";
import { useContext } from "react";
import themeContext from "../context/Theme";

function TodoItem({
  todo,
  deleteTodo,
  toggleTodo,
  toggleTodoEdit,
  toggleSelectedTodo,
}) {
  const theme = useContext(themeContext);
  function handleInput(e) {
    console.log(e.target.checked);
    toggleSelectedTodo();
  }

  return (
    <li
      className={`main d-flex flex-row justify-content-center align-items-center p-20 ${
        todo.selected ? `selectedTodo-${theme}` : ""
      }`}
    >
      <div className="left d-flex flex-fill justify-around">
        <span className="span-style">{todo.content}</span>
        <span className="span-style">{todo.done && "✅"}</span>
        <span className="span-style">
          <i className="fa-regular fa-calendar mr-15"></i>
          {`Tâche créée le : ${todo.date} hrs`}
        </span>
      </div>
      <div className="right d-flex flex-fill justify-content-end">
        <Button
          onClick={e => {
            e.stopPropagation();
            toggleTodo();
          }}
          text={!todo.done ? "A Valider" : "Validée"}
          className={"mr-15"}
        />
        <Button
          onClick={e => {
            e.stopPropagation();
            toggleTodoEdit();
          }}
          text={`Modifier`}
          className={"mr-15"}
        />
        <Button
          onClick={e => {
            e.stopPropagation();
            deleteTodo();
          }}
          text={`Supprimer`}
          className={"mr-15"}
        />
      </div>
      <div className="d-flex flex-fill justify-content-center">
        <label>{!todo.selected ? "Select Todo" : "Todo Selected"}</label>
        <input onInput={handleInput} type="checkbox" name="selected" />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  toggleTodoEdit: PropTypes.func,
  toggleSelectedTodo: PropTypes.func,
};

export default TodoItem;
