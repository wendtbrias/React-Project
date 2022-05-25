//Todo-List
import { useState, useRef, useEffect } from "react";
import { Form, Todos } from "./components";
import useLocalStorage from "./Hooks/useLocalStorage";

function App() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [todoForm, setTodoForm] = useState({
    todo: "",
    finish: false,
    type: "add",
  });
  //filter-result;
  const [todoResultFilter, setTodoResultFilter] = useState([]);
  const buttonRef = useRef();

  useEffect(
    function () {
      if (todoForm.type === "add") {
        return localStorage.setItem("todos", JSON.stringify(todos));
      }
    },
    [todos]
  );

  const AddTodoHandler = () => {
    if (buttonRef.current.dataset.id === "add") {
      const id = Math.floor(Math.random() * 1000000) + 1;
      const schema = {
        id,
        todo: todoForm.todo,
        finish: todoForm.finish,
        createdAt: new Date().toDateString(),
      };
      setTodos([...todos, schema]);
    } else {
      const mapResult = todos.map((todo) =>
        todo.id == todoForm.id ? { ...todoForm, todo: todoForm.todo } : todo
      );
      setTodos(mapResult);
      buttonRef.current.dataset.id = "add";
    }

    clearForm();
  };

  const clearForm = () => {
    setTodoForm({ todo: "", finish: false, type: "add" });
  };

  const DeleteTodoHandler = (id) => {
    const filter = todos.filter((todo) => (todo.id != id ? todo : ""));
    setTodos(filter);
  };

  const finishTodo = (id) => {
    const mapResult = todos.map((todo) =>
      todo.id == id ? { ...todo, finish: !todo.finish } : todo
    );
    setTodos(mapResult);
  };

  const UpdateTodoDisplay = (id) => {
    const singleValue = todos.find((todo) => todo.id == Number(id));
    setTodoForm(singleValue);
    buttonRef.current.dataset.id = "update";
  };

  const filterTodos = (e) => {
    setTodoForm({ ...todoForm, type: "filter" });
    if (e.target.value === "All") {
      setTodoForm({ type: "add" });
    } else if (e.target.value === "Finish") {
      const filterResult = todos.filter((todo) =>
        todo.finish === true ? todo : ""
      );
      setTodoResultFilter(filterResult);
    } else {
      const filterResult = todos.filter((todo) =>
        todo.finish === false ? todo : ""
      );
      setTodoResultFilter(filterResult);
    }
  };

  const formHandleChange = (e) => {
    setTodoForm({ ...todoForm, [e.target.name]: e.target.value });
    if (e.keycode == 13) {
      const id = Math.floor(Math.random() * 1000000) + 1;
      const schema = {
        id,
        todo: todoForm.todo,
        finish: todoForm.finish,
        createdAt: new Date().toDateString(),
      };
      setTodos([...todos, schema]);
    }
  };

  return (
    <div className="App">
      <div className="todo-container">
        <h1 className="title">Wen Todo</h1>
        <Form
          onFilter={filterTodos}
          btnRef={buttonRef}
          todoForm={todoForm}
          changeHandler={formHandleChange}
          addHandler={AddTodoHandler}
        />
        <Todos
          onFinish={finishTodo}
          onUpdate={UpdateTodoDisplay}
          onDelete={DeleteTodoHandler}
          todo={todoForm.type === "filter" ? todoResultFilter : todos}
        />
      </div>
    </div>
  );
}

export default App;
