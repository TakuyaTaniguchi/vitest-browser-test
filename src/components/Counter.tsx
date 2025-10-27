import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)
  const setCustomValue = () => {
    const value = parseInt(inputValue, 10)
    if (!isNaN(value)) {
      setCount(value)
      setInputValue('')
    }
  }

  return (
    <div>
      <h1>Counter Example</h1>
      <div>
        <p data-testid="count-display">Count: {count}</p>
      </div>
      <div>
        <button onClick={increment} data-testid="increment-btn">
          Increment
        </button>
        <button onClick={decrement} data-testid="decrement-btn">
          Decrement
        </button>
        <button onClick={reset} data-testid="reset-btn">
          Reset
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
          data-testid="custom-input"
        />
        <button onClick={setCustomValue} data-testid="set-custom-btn">
          Set Custom Value
        </button>
      </div>
    </div>
  )
}
