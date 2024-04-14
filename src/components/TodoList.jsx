import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import PropTypes from "prop-types";

function TodoList({ todoList, deleteTodo, toggleTodo, toggleTodoEdit }) {
  return todoList.length ? (
    <ul>
      {todoList.map(todo =>
        todo.edit ? (
          <EditTodo key={todo.id} todo={todo} />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            toggleTodo={() => toggleTodo(todo.id)}
            toggleTodoEdit={() => toggleTodoEdit(todo.id)}
          />
        )
      )}
    </ul>
  ) : (
    <p>Aucune todo pour le moment</p>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  deleteTodo: PropTypes.func,
  toggleTodo: PropTypes.func,
  toggleTodoEdit: PropTypes.func,
};

export default TodoList;
