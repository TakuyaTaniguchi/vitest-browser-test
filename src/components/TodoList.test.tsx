import { render } from 'vitest-browser-react'
import { expect, test, describe, beforeEach } from 'vitest'
import { TodoList } from './TodoList'
import { userEvent } from 'vitest/browser'

describe('TodoList Component', () => {
  test('renders with empty state', async () => {
    const screen = await render(<TodoList />)

    await expect.element(screen.getByTestId('empty-message')).toBeInTheDocument()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 0')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 0')
  })

  test('adds a new todo when clicking add button', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('Buy groceries')
    await addBtn.click()

    await expect.element(screen.getByTestId('todo-list')).toBeInTheDocument()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
  })

  test('adds todo when pressing Enter key', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')

    await input.fill('Learn Vitest')
    await userEvent.keyboard('{Enter}')

    await expect.element(screen.getByTestId('todo-list')).toBeInTheDocument()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
  })

  test('does not add empty todos', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('   ')
    await addBtn.click()

    await expect.element(screen.getByTestId('empty-message')).toBeInTheDocument()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 0')
  })

  test('clears input after adding todo', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('Test todo')
    await addBtn.click()

    await expect.element(input).toHaveValue('')
  })

  test('toggles todo completion status', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('Complete me')
    await addBtn.click()

    // Get the checkbox for the first todo
    const todoItems = screen.container.querySelectorAll('[data-testid^="todo-checkbox-"]')
    const checkbox = todoItems[0] as HTMLElement

    // Initially not checked
    await expect.element(checkbox).not.toBeChecked()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 0')

    // Toggle to completed
    await checkbox.click()

    await expect.element(checkbox).toBeChecked()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 0')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 1')

    // Toggle back to active
    await checkbox.click()

    await expect.element(checkbox).not.toBeChecked()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 0')
  })

  test('deletes a todo', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('Delete me')
    await addBtn.click()

    // Verify todo was added
    await expect.element(screen.getByTestId('todo-list')).toBeInTheDocument()

    // Delete the todo
    const deleteBtn = screen.container.querySelector('[data-testid^="delete-todo-"]') as HTMLElement
    await deleteBtn.click()

    // Verify todo was deleted
    await expect.element(screen.getByTestId('empty-message')).toBeInTheDocument()
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 0')
  })

  test('manages multiple todos', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    // Add first todo
    await input.fill('First task')
    await addBtn.click()

    // Add second todo
    await input.fill('Second task')
    await addBtn.click()

    // Add third todo
    await input.fill('Third task')
    await addBtn.click()

    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 3')

    const todoItems = screen.container.querySelectorAll('[data-testid^="todo-item-"]')
    expect(todoItems).toHaveLength(3)
  })

  test('clear completed button appears only when there are completed todos', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('Task to complete')
    await addBtn.click()

    // Clear completed button should not exist yet
    const clearCompletedBtn = screen.container.querySelector('[data-testid="clear-completed-btn"]')
    expect(clearCompletedBtn).toBeNull()

    // Complete the todo
    const checkbox = screen.container.querySelector('[data-testid^="todo-checkbox-"]') as HTMLElement
    await checkbox.click()

    // Now the clear completed button should appear
    await expect.element(screen.getByTestId('clear-completed-btn')).toBeInTheDocument()
  })

  test('clears all completed todos', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    // Add three todos
    await input.fill('Task 1')
    await addBtn.click()
    await input.fill('Task 2')
    await addBtn.click()
    await input.fill('Task 3')
    await addBtn.click()

    // Complete first and third todos
    const checkboxes = screen.container.querySelectorAll('[data-testid^="todo-checkbox-"]')
    await (checkboxes[0] as HTMLElement).click()
    await (checkboxes[2] as HTMLElement).click()

    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 2')

    // Clear completed
    const clearBtn = screen.getByTestId('clear-completed-btn')
    await clearBtn.click()

    // Should only have 1 active todo left
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 0')

    const remainingTodos = screen.container.querySelectorAll('[data-testid^="todo-item-"]')
    expect(remainingTodos).toHaveLength(1)
  })

  test('completed todos have line-through styling', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    await input.fill('Style test')
    await addBtn.click()

    const todoText = screen.container.querySelector('[data-testid^="todo-text-"]') as HTMLElement

    // Initially no line-through
    expect(todoText.style.textDecoration).toBe('none')

    // Complete the todo
    const checkbox = screen.container.querySelector('[data-testid^="todo-checkbox-"]') as HTMLElement
    await checkbox.click()

    // Should now have line-through
    expect(todoText.style.textDecoration).toBe('line-through')
  })

  test('full workflow: add, complete, delete sequence', async () => {
    const screen = await render(<TodoList />)

    const input = screen.getByTestId('todo-input')
    const addBtn = screen.getByTestId('add-todo-btn')

    // Start with empty state
    await expect.element(screen.getByTestId('empty-message')).toBeInTheDocument()

    // Add multiple todos
    await input.fill('Morning workout')
    await addBtn.click()
    await input.fill('Team meeting')
    await addBtn.click()
    await input.fill('Code review')
    await addBtn.click()

    // Verify all added
    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 3')

    // Complete some todos
    const checkboxes = screen.container.querySelectorAll('[data-testid^="todo-checkbox-"]')
    await (checkboxes[0] as HTMLElement).click()
    await (checkboxes[1] as HTMLElement).click()

    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 2')

    // Clear completed
    await screen.getByTestId('clear-completed-btn').click()

    await expect.element(screen.getByTestId('active-count')).toHaveTextContent('Active: 1')
    await expect.element(screen.getByTestId('completed-count')).toHaveTextContent('Completed: 0')

    // Delete remaining todo
    const deleteBtn = screen.container.querySelector('[data-testid^="delete-todo-"]') as HTMLElement
    await deleteBtn.click()

    // Back to empty state
    await expect.element(screen.getByTestId('empty-message')).toBeInTheDocument()
  })
})
