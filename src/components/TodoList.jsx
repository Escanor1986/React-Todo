import { useContext } from "react";
import TodoItem from "./TodoItem";
import EditTodo from "./EditTodo";
import { todoStateContext } from "../context/todoContext";

export default function TodoList() {
  const state = useContext(todoStateContext);

  return state.todoList.length ? (
    <ul>
      {state.todoList.map(todo =>
        todo.edit ? (
          <EditTodo key={todo._id} todo={todo} />
        ) : (
          <TodoItem key={todo._id} todo={todo} />
        )
      )}
    </ul>
  ) : (
    <p>Aucune tâche en cours </p>
  );
}
