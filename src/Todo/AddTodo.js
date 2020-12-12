import React, { useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios';

function useInputValue(defaultValue = '') {
  const [value, setValue] = useState(defaultValue)

  return {
    bind: {
      value,
      onChange: event => setValue(event.target.value)
    },
    clear: () => setValue(''),
    value: () => value
  }
}

const API = 'https://jsonplaceholder.typicode.com/todos';

function AddTodo({ onCreate }) {
  const input = useInputValue('');

  function submitHandler(event) {
    event.preventDefault();

    if (input.value().trim()) {
      axios.post(API, {
        userId: 2,
        title: input.value(),
        completed: false
      })
      .then((response) => {
        onCreate(response.data)
      }, (error) => {
        console.log(error);
      });
      input.clear()
    }
  }

  return (
    <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
      <input {...input.bind} />
      <button type='submit'>POST NEW TODO</button>
    </form>
  )
}

AddTodo.propTypes = {
  onCreate: PropTypes.func.isRequired
}

export default AddTodo;