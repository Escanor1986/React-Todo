import { useContext } from "react";
import {
  todoDispatcherContext,
  todoStateContext,
} from "../context/todoContext";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

function TodoFeature() {
  const dispatch = useContext(todoDispatcherContext);
  const state = useContext(todoStateContext);

  // Fonction pour supprimer tous les todos sélectionnés via l'API
  async function deleteAllSelectedTodo() {
    try {
      // Récupère les IDs des todos sélectionnés
      const selectedTodoIds = state.todoToDelete.map(todo => todo._id);
      // Envoie une requête DELETE à l'API pour supprimer les todos sélectionnés
      const response = await fetch(
        "https://restapi.fr/api/todo/deleteSelected",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedTodoIds }), // Envoie les IDs des todos sélectionnés dans le corps de la requête
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression des todos sélectionnés");
      }
      // Met à jour l'état global pour supprimer les todos sélectionnés
      dispatch({ type: "DELETE_ALL_SELECTED_TODO" });
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des todos sélectionnés :",
        error
      );
    }
  }

  function handleChange(e) {
    dispatch({
      type: "SET_THEME",
      name: e.target.value,
    });
  }

  return (
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
        {state.loading ? (
          <p>Chargement en cours</p>
        ) : (
          <TodoList todoToDelete={state.todoToDelete} />
        )}

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
  );
}

export default TodoFeature;
