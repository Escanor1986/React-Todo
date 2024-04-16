import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import PropTypes from "prop-types";

function TodoList({
  todoList,
  deleteTodo,
  toggleTodo,
  toggleTodoEdit,
  editTodo,
  toggleSelectedTodo,
}) {
  return todoList.length ? (
    <ul>
      {todoList.map(todo =>
        todo.edit ? (
          <EditTodo
            key={todo.id}
            todo={todo}
            editTodo={content => editTodo(todo.id, content)}
            cancelEditTodo={() => toggleTodoEdit(todo.id)}
          />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            deleteTodo={() => deleteTodo(todo.id)}
            toggleTodo={() => toggleTodo(todo.id)}
            toggleTodoEdit={() => toggleTodoEdit(todo.id)}
            toggleSelectedTodo={() => toggleSelectedTodo(todo.id)}
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
  editTodo: PropTypes.func,
  toggleSelectedTodo: PropTypes.func,
};

export default TodoList;
