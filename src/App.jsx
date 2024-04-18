// import Articles from "./components/Articles";
import { useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import themeContext from "./context/Theme";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState([]);

  function addTodo(content) {
    const actualDate = new Date();

    const options = {
      // weekday: "short",
      year: "numeric",
      month: "numeric",
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
      selected: false,
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

  function toggleSelectedTodo(id) {
    const updatedTodoList = todoList.map(todo =>
      todo.id === id ? { ...todo, selected: !todo.selected } : todo
    );
    setTodoList(updatedTodoList);

    const updatedTodo = updatedTodoList.find(todo => todo.id === id);
    if (updatedTodo && updatedTodo.selected) {
      // Si la todo est sélectionnée, l'ajouter à todoToDelete
      setTodoToDelete([...todoToDelete, updatedTodo]);
    } else {
      // Sinon, la retirer de todoToDelete si elle y est déjà
      setTodoToDelete(todoToDelete.filter(todo => todo.id !== id));
    }
  }

  function deleteAllSelectedTodo() {
    const updatedTodoList = todoList.filter(
      todo => !todoToDelete.includes(todo)
    );
    setTodoList(updatedTodoList);

    setTodoToDelete([]);
  }

  const [theme, setTheme] = useState("primary");

  function handleChange(e) {
    setTheme(e.target.value);
  }

  return (
    <themeContext.Provider value={theme}>
      <div
        className={`d-flex flex-row justify-content-center align-items-center p-20`}
      >
        {/* <Articles displayArticle={true} /> */}
        <div className="flex flex-fill card p-20">
          <h1 className="mb-20 d-flex flex-row justify-content-center align-items-center">
            <span className="flex-fill">Todo list</span>
            <select
              value={theme}
              onChange={handleChange}
              className="select-style"
            >
              <option value="primary" className="option-style">
                Vert
              </option>
              <option value="secondary" className="option-style">
                Bleu
              </option>
            </select>
          </h1>
          <AddTodo addTodo={addTodo} />
          <TodoList
            todoList={todoList}
            todoToDelete={todoToDelete}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            toggleTodoEdit={toggleTodoEdit}
            editTodo={editTodo}
            toggleSelectedTodo={toggleSelectedTodo}
          />
          {todoToDelete.length > 0 ? (
            <div className="d-flex flex-fill justify-content-center align-items-center">
              <button
                className={`delete-all-todo selectedTodo-${theme} p-20 m-15`}
                onClick={deleteAllSelectedTodo}
              >
                Supprimer les todos sélectionnées
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </themeContext.Provider>
  );
}

export default App;
