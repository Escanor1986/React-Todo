import { useReducer } from "react";
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
  });

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
