import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
// import { Routes, Route} from "react-router-dom"
// import About from "../pages/About"
// import NotMatch from "../pages/NotMatch"
// import Navbar from "./Navbar"

const TodoContainer = () => {

  //starting with an empty list
  const [todos, setTodos] = useState(getInitialTodos);

    const handleChange = id => {
      const newTodos = todos.map((todo) => {
       if (todo.id === id) {
        todo.completed = !todo.completed;
       }
       return todo;
      });
      setTodos(newTodos)
     };

    const delTodo = id => {
      const newTodos = todos.filter((todo) => {
        //return all elements, where the following condition is satisfied:
          return todo.id !== id;
      });
      setTodos(newTodos);
    };

    const addTodoItem = title => {
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false
      };
      setTodos([...todos, newTodo]);
    };

    const setUpdate = (updatedTitle, id) => {
      const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            todo.title = updatedTitle
          }
          return todo
      });
      setTodos(newTodos)
    };


    function getInitialTodos() {
      // getting stored items
      const temp = localStorage.getItem("todos")
      const savedTodos = JSON.parse(temp)
      return savedTodos || []
    }


    useEffect(() => {
      // storing todos items
      const temp = JSON.stringify(todos)
      localStorage.setItem("todos", temp)
    }, [todos])


    return(
        <div className="container">
          <div className="inner">
            <Header />
            <InputTodo addTodoProps={addTodoItem} />
            <TodosList 
              todos={todos} 
              handleChangeProps={handleChange} 
              deleteTodoProps={delTodo}
              setUpdate={setUpdate}
            />
          </div>
        </div>
    );
}
export default TodoContainer