// import Articles from "./components/Articles";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([]);

  function addTodo(content) {
    const actualDate = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      // timeZoneName: "short",
    };

    const formatedDate = actualDate.toLocaleDateString("fr-FR", options);

    const todo = {
      id: crypto.randomUUID(),
      content,
      done: false,
      edit: false,
      date: formatedDate,
    };
    setTodoList([...todoList, todo]);
  }

  function deleteTodo(id) {
    setTodoList(todoList.filter(todo => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function toggleTodoEdit(id) {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  }

  function editTodo(id, content) {
    setTodoList(
      todoList.map(todo =>
        todo.id === id ? { ...todo, edit: false, content } : todo
      )
    );
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      {/* <Articles displayArticle={true} /> */}
      <div className="flex flex-fill card p-20">
        <h1 className="mb-20">Todo list</h1>
        <AddTodo addTodo={addTodo} />
        <TodoList
          todoList={todoList}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
          toggleTodoEdit={toggleTodoEdit}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
