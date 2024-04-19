import PropTypes from "prop-types";
import Button from "./Button";
import { useContext } from "react";
import themeContext from "../context/Theme";
import { todoDispatcherContext } from "../context/todoContext";

function TodoItem({ todo }) {
  const dispatch = useContext(todoDispatcherContext);
  const theme = useContext(themeContext);

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
            dispatch({
              type: "TOGGLE_TODO",
              id: todo.id,
            });
          }}
          text={!todo.done ? "A Valider" : "Validée"}
          className={"mr-15"}
        />
        <Button
          onClick={e => {
            e.stopPropagation();
            dispatch({
              type: "TOGGLE_EDIT_TODO",
              id: todo.id,
            });
          }}
          text={`Modifier`}
          className={"mr-15"}
        />
        <Button
          onClick={e => {
            e.stopPropagation();
            dispatch({
              type: "DELETE_TODO",
              id: todo.id,
            });
          }}
          text={`Supprimer`}
          className={"mr-15"}
        />
      </div>
      <div className="d-flex flex-fill justify-content-center">
        <label>{!todo.selected ? "Select Todo" : "Todo Selected"}</label>
        <input
          onInput={e => {
            e.stopPropagation();
            dispatch({
              type: "TOGGLE_SELECTED_TODO",
              id: todo.id,
            });
          }}
          type="checkbox"
          name="selected"
        />
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
};

export default TodoItem;
