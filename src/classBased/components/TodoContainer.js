import React from "react";
import { v4 as uuidv4 } from "uuid";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo"

class TodoContainer extends React.Component {
  //only an object called state reacts with setState() and is managed by React
    // state = {
    //     todos: [
    //       {
    //         id: uuidv4(),
    //         title: "Setup development environment",
    //         completed: true
    //       },
    //       {
    //         id: uuidv4(),
    //         title: "Develop website and add content",
    //         completed: false
    //       },
    //       {
    //         id: uuidv4(),
    //         title: "Deploy to live server",
    //         completed: false
    //       }
    //     ]
    // };

  state = {
    todos: [],
  }
  //Note that despite the method being named json(), 
  //the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.
  // componentDidMount() {
  //   fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
  //   .then(response => response.json())
  //   .then(data => this.setState({todos: data}));
  // }

  //React runs the code once it detects an update
  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }

  componentDidMount() {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }
  
    // handleChange = id => {
    //   //Note how we are wrapping the object in the setState callback with a parenthesis, (). 
    //   //An alternative is to use the return statement to explicitly return the object
    //   this.setState(prevState => ({
    //     todos: prevState.todos.map(todo => {
    //       if (todo.id === id) {
    //         return {
    //           //...todo spreads all elements within one todo except completed in this case:
    //           ...todo,
    //           completed: !todo.completed
    //         }
    //       }
    //       return todo;
    //     })
    //   }))
    // };

    handleChange = (id) => {
      const newTodos = this.state.todos.map((todo) => {
       if (todo.id === id) {
        todo.completed = !todo.completed;
       }
       return todo;
      });
      this.setState({ todos: newTodos })
     };

    delTodo = id => {
      const delTodos = this.state.todos.filter((todo) => {
        //return all elements, where the following condition is satisfied:
          return todo.id !== id;
      });
      this.setState({ todos: delTodos});
    };

    addTodoItem = title => {
      const newTodo = {
        id: uuidv4(),
        title: title,
        completed: false
      };
      this.setState({
        todos: [...this.state.todos, newTodo]
      });
    };

    setUpdate = (updatedTitle, id) => {
      const newTodos = this.state.todos.map((todo) => {
          if (todo.id === id) {
            todo.title = updatedTitle
          }
          return todo
      });
      this.setState({todos: newTodos})
    };

    render() {
        return (
          <div className="container">
            <div className="inner">
                <Header />
                <InputTodo addTodoProps={this.addTodoItem} />
                <TodosList 
                  todos={this.state.todos} 
                  handleChangeProps={this.handleChange} 
                  deleteTodoProps={this.delTodo}
                  setUpdate={this.setUpdate}
                />
            </div>
          </div>
        );
    }
}
export default TodoContainer