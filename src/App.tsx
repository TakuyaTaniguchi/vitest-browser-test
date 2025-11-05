import { Counter } from './components/Counter'
import { Toggle } from './components/Toggle'

function App() {
  return (
    <div className="App">
      <Counter />

      <div style={{ marginTop: '40px' }}>
        <Toggle title="Section 1">
          <p>This is the content of Section 1</p>
          <p>You can put any content here!</p>
        </Toggle>

        <div style={{ marginTop: '20px' }}>
          <Toggle title="Section 2" defaultOpen={true}>
            <p>This section is open by default</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </Toggle>
        </div>

        <div style={{ marginTop: '20px' }}>
          <Toggle title="Nested Example">
            <p>You can even nest toggles!</p>
            <Toggle title="Nested Toggle">
              <p>This is a nested toggle component</p>
            </Toggle>
          </Toggle>
        </div>
      </div>
    </div>
  )
}

export default App
