import { useEffect, useReducer } from "react";
import themeContext from "../context/Theme";
import { todoStateContext } from "../context/todoContext";
import { todoDispatcherContext } from "../context/todoContext";
import PropTypes from "prop-types";
import todoReducer from "../reducers/todoReducer.js";

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    theme: "primary",
    todoList: [],
    todoToDelete: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    // Variable pour suivre l'état de l'effet
    let shouldCancel = false;

    const fetchTodos = async () => {
      dispatch({ type: "FETCH_TODOS_REQUEST" });

      try {
        const response = await fetch("https://restapi.fr/api/todo");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des todos");
        }
        const todos = await response.json();

        // Vérifie si l'effet est toujours actif avant de dispatcher l'action SUCCESS
        if (!shouldCancel) {
          dispatch({ type: "FETCH_TODOS_SUCCESS", todos });
        }
      } catch (error) {
        dispatch({ type: "FETCH_TODOS_FAILURE", error: error.message });
      }
    };

    fetchTodos();

    // Nettoyage de l'effet lors du démontage du composant
    return () => {
      shouldCancel = true; // Marque shouldCancel à true pour indiquer que l'effet est annulé
    };
  }, []);

  return (
    <todoStateContext.Provider value={state}>
      <todoDispatcherContext.Provider value={dispatch}>
        <themeContext.Provider value={state.theme}>
          {children}
        </themeContext.Provider>
      </todoDispatcherContext.Provider>
    </todoStateContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.node,
};

export default TodoProvider;
