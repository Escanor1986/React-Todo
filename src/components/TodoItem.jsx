import PropTypes from "prop-types";

function TodoItem({ todo, deleteTodo, toggleTodo, toggleTodoEdit }) {
  return (
    <li className="mb-10 d-flex flex-row justify-content-center align-items-center p-10">
      <div className="d-flex flex-fill justify-around">
        {todo.content} {todo.done && "✅"}
        <span>
          <i className="fa-regular fa-calendar mr-15"></i>
          {`Tâche créé le : ${todo.date} hrs`}
        </span>
      </div>
      <button onClick={toggleTodo} className="btn btn-primary mr-15">
        {!todo.done ? "A Valider" : "Validée"}
      </button>
      <button onClick={toggleTodoEdit} className="btn btn-primary mr-15">
        Modifier
      </button>
      <button onClick={deleteTodo} className="btn btn-reverse-primary mr-15">
        Supprimer
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object,
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  toggleTodoEdit: PropTypes.func,
};

export default TodoItem;
