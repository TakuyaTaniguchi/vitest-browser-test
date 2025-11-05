import { render } from 'vitest-browser-react'
import { expect, test, describe } from 'vitest'
import { Toggle } from './Toggle'

describe('Toggle Component', () => {
  test('renders with title and closed by default', async () => {
    const screen = await render(
      <Toggle title="Test Toggle">
        <p>Hidden content</p>
      </Toggle>
    )

    const button = screen.getByTestId('toggle-button')
    await expect.element(button).toBeInTheDocument()
    await expect.element(button).toHaveTextContent('Test Toggle')

    const content = screen.queryByTestId('toggle-content')
    expect(content).toBeNull()
  })

  test('renders with content visible when defaultOpen is true', async () => {
    const screen = await render(
      <Toggle title="Test Toggle" defaultOpen={true}>
        <p>Visible content</p>
      </Toggle>
    )

    const content = screen.getByTestId('toggle-content')
    await expect.element(content).toBeInTheDocument()
    await expect.element(content).toHaveTextContent('Visible content')
  })

  test('shows icon arrow pointing right when closed', async () => {
    const screen = await render(
      <Toggle title="Test Toggle">
        <p>Hidden content</p>
      </Toggle>
    )

    const icon = screen.getByTestId('toggle-icon')
    await expect.element(icon).toHaveTextContent('▶')
  })

  test('shows icon arrow pointing down when open', async () => {
    const screen = await render(
      <Toggle title="Test Toggle" defaultOpen={true}>
        <p>Visible content</p>
      </Toggle>
    )

    const icon = screen.getByTestId('toggle-icon')
    await expect.element(icon).toHaveTextContent('▼')
  })

  test('opens content when toggle button is clicked', async () => {
    const screen = await render(
      <Toggle title="Test Toggle">
        <p>Hidden content</p>
      </Toggle>
    )

    const button = screen.getByTestId('toggle-button')

    // Initially closed
    let content = screen.queryByTestId('toggle-content')
    expect(content).toBeNull()

    // Click to open
    await button.click()
    content = screen.getByTestId('toggle-content')
    await expect.element(content).toBeInTheDocument()
    await expect.element(content).toHaveTextContent('Hidden content')
  })

  test('closes content when toggle button is clicked twice', async () => {
    const screen = await render(
      <Toggle title="Test Toggle">
        <p>Toggle content</p>
      </Toggle>
    )

    const button = screen.getByTestId('toggle-button')

    // Click to open
    await button.click()
    let content = screen.getByTestId('toggle-content')
    await expect.element(content).toBeInTheDocument()

    // Click to close
    await button.click()
    content = screen.queryByTestId('toggle-content')
    expect(content).toBeNull()
  })

  test('toggles multiple times correctly', async () => {
    const screen = await render(
      <Toggle title="Test Toggle">
        <p>Toggle content</p>
      </Toggle>
    )

    const button = screen.getByTestId('toggle-button')
    const icon = screen.getByTestId('toggle-icon')

    // Initially closed
    let content = screen.queryByTestId('toggle-content')
    expect(content).toBeNull()
    await expect.element(icon).toHaveTextContent('▶')

    // Open
    await button.click()
    content = screen.getByTestId('toggle-content')
    await expect.element(content).toBeInTheDocument()
    await expect.element(icon).toHaveTextContent('▼')

    // Close
    await button.click()
    content = screen.queryByTestId('toggle-content')
    expect(content).toBeNull()
    await expect.element(icon).toHaveTextContent('▶')

    // Open again
    await button.click()
    content = screen.getByTestId('toggle-content')
    await expect.element(content).toBeInTheDocument()
    await expect.element(icon).toHaveTextContent('▼')
  })

  test('renders complex children correctly', async () => {
    const screen = await render(
      <Toggle title="Complex Content" defaultOpen={true}>
        <div>
          <h3>Heading</h3>
          <p>Paragraph text</p>
          <button>Action Button</button>
        </div>
      </Toggle>
    )

    const content = screen.getByTestId('toggle-content')
    await expect.element(content).toBeInTheDocument()
    await expect.element(content).toHaveTextContent('Heading')
    await expect.element(content).toHaveTextContent('Paragraph text')
    await expect.element(content).toHaveTextContent('Action Button')
  })
})
