import React, { Component } from 'react';
import axios from 'axios';

import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'

const AddTodo = React.lazy(
  () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(import('./Todo/AddTodo'))
      }, 3000)
    })
)

const API = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            loading: true
        };
        this.toggleTodo = this.toggleTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    componentDidMount() {
        axios.get(API)
            .then(result => {
                setTimeout(() => {
                    this.setState({todos: result.data})
                    this.setState({loading: false})
                }, 2000)
            })
            .catch(error => this.setState({
                error
            }));
    }

    toggleTodo(id) {
        const { todos } = this.state;
        var toggled = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo;
        });
        this.setState({
            todos: toggled
        })
    }

    removeTodo(id) {
        const { todos } = this.state;
        // const API = 'https://jsonplaceholder.typicode.com/todos/';

        // axios.delete(API + id)
        //     .then(res => {
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });


        var removed = todos.filter(todo => todo.id !== id);
        this.setState({
            todos: removed
        });
    }

    addTodo(newTodo) {
        const { todos } = this.state;
        var added = todos.concat([ newTodo ]);
        this.setState({
            todos: added
        })
    }

    render() {
        const { todos } = this.state;
        const { loading } = this.state;
        const removeTodo = this.removeTodo;

        return (
            <Context.Provider value={{ removeTodo }}>
              <div className='wrapper'>
                <h1>React tutorial</h1>
                <Modal />
        
                <React.Suspense fallback={<Loader />}>
                  <AddTodo onCreate={ this.addTodo } />
                </React.Suspense>
        
                {loading && <Loader />}
                {todos.length ? (
                  <TodoList todos={todos} onToggle={ this.toggleTodo } />
                ) : loading ? null : (
                  <p>No todos!</p>
                )}
              </div>
            </Context.Provider>
          );
    }
}

export default Post;
