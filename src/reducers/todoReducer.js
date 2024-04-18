export default function todoReducer(state, action) {
  const actualDate = new Date();
  console.log(action);

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

  switch (action.type) {
    case "ADD_TODO": {
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: crypto.randomUUID(),
            content: action.content,
            edit: false,
            done: false,
            selected: false,
            date: formatedDate,
          },
        ],
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.id),
      };
    }
    case "TOGGLE_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    }
    case "TOGGLE_EDIT_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.id ? { ...todo, edit: !todo.edit } : todo
        ),
      };
    }
    case "EDIT_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.id
            ? { ...todo, edit: false, content: action.content }
            : todo
        ),
      };
    }
    case "TOGGLE_SELECTED_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo.id === action.id ? { ...todo, selected: !todo.selected } : todo
        ),
        todoToDelete: state.todoList.filter(todo =>
          todo.id === action.id && !todo.selected
            ? [...state.todoToDelete, todo]
            : state.todoToDelete.filter(todo => todo.id !== action.id)
        ),
      };
    }
    case "DELETE_ALL_SELECTED_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter(todo => !todo.selected),
        todoToDelete: [],
      };
    }
    case "SET_THEME": {
      return {
        ...state,
        theme: action.name,
      };
    }
    default: {
      throw new Error("action inconnue");
    }
  }
}
