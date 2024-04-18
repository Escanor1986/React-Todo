// import Articles from "./components/Articles";
import { useReducer } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import themeContext from "./context/Theme";
import { todoStateContext } from "./context/todoContext";
import { todoDispatcherContext } from "./context/todoContext";
import todoReducer from "./reducers/todoReducer";

function App() {
  const [state, dispatch] = useReducer(todoReducer, {
    theme: "primary",
    todoList: [],
    todoToDelete: [],
  });

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
    <todoStateContext.Provider value={state}>
      <todoDispatcherContext.Provider value={dispatch}>
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
              <AddTodo />
              <TodoList
                todoList={state.todoList}
                todoToDelete={state.todoToDelete}
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
      </todoDispatcherContext.Provider>
    </todoStateContext.Provider>
  );
}

export default App;
