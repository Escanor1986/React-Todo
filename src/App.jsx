// import Articles from "./components/Articles";
import { useReducer } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import themeContext from "./context/Theme";
import todoReducer from "./reducers/todoReducer";

function App() {
  const [state, dispatch] = useReducer(todoReducer, {
    theme: "primary",
    todoList: [],
    todoToDelete: [],
  });

  function addTodo(content) {
    dispatch({
      type: "ADD_TODO",
      content,
    });
  }

  function deleteTodo(id) {
    dispatch({
      type: "DELETE_TODO",
      id,
    });
  }

  function toggleTodo(id) {
    dispatch({
      type: "TOGGLE_TODO",
      id,
    });
  }

  function toggleTodoEdit(id) {
    dispatch({
      type: "TOGGLE_EDIT_TODO",
      id,
    });
  }

  function editTodo(id, content) {
    dispatch({
      type: "EDIT_TODO",
      id,
      content,
    });
  }

  function toggleSelectedTodo(id) {
    dispatch({
      type: "TOGGLE_SELECTED_TODO",
      id,
    });
  }

  function deleteAllSelectedTodo() {
    dispatch({
      type: "DELETE_ALL_SELECTED_TODO",
    });
  }

  function handleChange(e) {
    dispatch({
      type: "SET_THEME",
      name: e.target.value,
    });
  }

  return (
    <themeContext.Provider value={state.theme}>
      <div
        className={`d-flex flex-row justify-content-center align-items-center p-20`}
      >
        <div className="flex flex-fill card p-20">
          <h1 className="mb-20 d-flex flex-row justify-content-center align-items-center">
            <span className="flex-fill">Todo list</span>
            <select
              value={state.theme}
              onChange={handleChange}
              className="select-style"
            >
              <option value="primary" className="option-style">
                Mauve
              </option>
              <option value="secondary" className="option-style">
                Bleu
              </option>
            </select>
          </h1>
          <AddTodo addTodo={addTodo} />
          <TodoList
            todoList={state.todoList}
            todoToDelete={state.todoToDelete}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            toggleTodoEdit={toggleTodoEdit}
            editTodo={editTodo}
            toggleSelectedTodo={toggleSelectedTodo}
          />
          {state.todoToDelete.length > 0 ? (
            <div className="d-flex flex-fill justify-content-center align-items-center">
              <button
                className={`delete-all-todo selectedTodo-${state.theme} p-20 m-15`}
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
