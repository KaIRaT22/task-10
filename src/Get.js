import React, { Component } from 'react';
import axios from 'axios';

import TodoList from './Todo/TodoList'
import Context from './context'
import Loader from './Loader'
import Modal from './Modal/Modal'


const API = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

class Get extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            loading: true,
            error: null,
        };
        this.toggleTodo = this.toggleTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
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
        var removed = todos.filter(todo => todo.id !== id);
        this.setState({
            todos: removed
        });
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
        
                {loading && <Loader />}
                {todos.length ? (
                  <TodoList todos={todos} onToggle={ this.toggleTodo } />
                ) : loading ? null : (
                  <p>First post!</p>
                )}
              </div>
            </Context.Provider>
          )
    }
}

export default Get;
