 import { useState } from 'react'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const activeTodosCount = todos.filter((todo) => !todo.completed).length
  const completedTodosCount = todos.filter((todo) => todo.completed).length

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          data-testid="todo-input"
        />
        <button onClick={addTodo} data-testid="add-todo-btn">
          Add
        </button>
      </div>

      <div data-testid="todo-stats" style={{ marginTop: '10px' }}>
        <span data-testid="active-count">Active: {activeTodosCount}</span>
        {' | '}
        <span data-testid="completed-count">Completed: {completedTodosCount}</span>
      </div>

      {todos.length > 0 && (
        <ul data-testid="todo-list" style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo.id}
              data-testid={`todo-item-${todo.id}`}
              style={{
                padding: '8px',
                marginTop: '4px',
                backgroundColor: todo.completed ? '#e0e0e0' : '#fff',
                border: '1px solid #ccc',
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`todo-checkbox-${todo.id}`}
              />
              <span
                data-testid={`todo-text-${todo.id}`}
                style={{
                  marginLeft: '8px',
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                data-testid={`delete-todo-${todo.id}`}
                style={{ marginLeft: '8px' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {completedTodosCount > 0 && (
        <button
          onClick={clearCompleted}
          data-testid="clear-completed-btn"
          style={{ marginTop: '10px' }}
        >
          Clear Completed
        </button>
      )}

      {todos.length === 0 && (
        <p data-testid="empty-message">No todos yet. Add one above!</p>
      )}
    </div>
  )
}
