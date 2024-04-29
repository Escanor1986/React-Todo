import { useContext, useState } from "react";
import { todoDispatcherContext } from "../context/todoContext";

function AddTodo() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useContext(todoDispatcherContext);

  function handleChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
  }

  async function createTodo() {
    const actualDate = new Date();
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formatedDate = actualDate.toLocaleDateString("fr-FR", options);

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://restapi.fr/api/todo", {
        method: "POST",
        body: JSON.stringify({
          content: value,
          edit: false,
          done: false,
          selected: false,
          date: formatedDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const todo = await response.json();
        dispatch({
          type: "ADD_TODO",
          content: todo.content,
          _id: todo._id,
          date: todo.date,
        });
        console.log(todo);
        setValue("");
      } else {
        setError("Erreur lors de la requête à l'API");
      }
    } catch (e) {
      setError("Erreur lors de la requête à l'API");
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && value.length) {
      createTodo();
    }
  }

  function handleClick() {
    if (value.length) {
      createTodo();
    }
  }

  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <input
        type="text"
        minLength={2}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={value}
        placeholder={"Ajouter une todo"}
        className="mr-15 flex-fill"
      />
      <button onClick={handleClick} className="btn btn-primary">
        {isLoading ? "Chargement" : "Ajouter"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default AddTodo;
