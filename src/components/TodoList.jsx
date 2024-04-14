import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList({ todoList, deleteTodo }) {
  return todoList.length ? (
    <ul>
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo.id)}
        />
      ))}
    </ul>
  ) : (
    <p>Aucune todo pour le moment</p>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  deleteTodo: PropTypes.func,
};

export default TodoList;
