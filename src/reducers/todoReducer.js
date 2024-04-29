export default function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            _id: action._id, // ID fourni par l'API
            content: action.content,
            edit: false,
            done: false,
            selected: false,
            date: action.date, // Date fournie par l'API
          },
        ],
      };
    }

    case "DELETE_TODO": {
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo._id !== action._id),
      };
    }
    case "TOGGLE_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo._id === action._id ? { ...todo, done: !todo.done } : todo
        ),
      };
    }
    case "TOGGLE_EDIT_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo._id === action._id ? { ...todo, edit: !todo.edit } : todo
        ),
      };
    }
    case "EDIT_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo._id === action._id
            ? { ...todo, edit: false, content: action.content }
            : todo
        ),
      };
    }
    case "TOGGLE_SELECTED_TODO": {
      return {
        ...state,
        todoList: state.todoList.map(todo =>
          todo._id === action._id ? { ...todo, selected: !todo.selected } : todo
        ),
        todoToDelete: state.todoList.filter(todo =>
          todo._id === action._id && !todo.selected
            ? [...state.todoToDelete, todo]
            : state.todoToDelete.filter(todo => todo._id !== action._id)
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
    case "FETCH_TODOS_REQUEST": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "FETCH_TODOS_SUCCESS": {
      return {
        ...state,
        loading: false,
        todoList: action.todos,
        error: null,
      };
    }
    case "FETCH_TODOS_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      throw new Error("action inconnue");
    }
  }
}
