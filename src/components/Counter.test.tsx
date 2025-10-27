import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { expect, test, describe } from 'vitest'
import { Counter } from './Counter'

describe('Counter Component', () => {
  test('renders with initial count of 0', async () => {
    render(<Counter />)
    const countDisplay = screen.getByTestId('count-display')
    expect(countDisplay).toHaveTextContent('Count: 0')
  })

  test('increments count when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementBtn = screen.getByTestId('increment-btn')
    const countDisplay = screen.getByTestId('count-display')

    await user.click(incrementBtn)
    expect(countDisplay).toHaveTextContent('Count: 1')

    await user.click(incrementBtn)
    expect(countDisplay).toHaveTextContent('Count: 2')
  })

  test('decrements count when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const decrementBtn = screen.getByTestId('decrement-btn')
    const countDisplay = screen.getByTestId('count-display')

    await user.click(decrementBtn)
    expect(countDisplay).toHaveTextContent('Count: -1')
  })

  test('resets count to 0 when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementBtn = screen.getByTestId('increment-btn')
    const resetBtn = screen.getByTestId('reset-btn')
    const countDisplay = screen.getByTestId('count-display')

    await user.click(incrementBtn)
    await user.click(incrementBtn)
    expect(countDisplay).toHaveTextContent('Count: 2')

    await user.click(resetBtn)
    expect(countDisplay).toHaveTextContent('Count: 0')
  })

  test('sets custom value when valid number is entered', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const input = screen.getByTestId('custom-input')
    const setCustomBtn = screen.getByTestId('set-custom-btn')
    const countDisplay = screen.getByTestId('count-display')

    await user.type(input, '42')
    await user.click(setCustomBtn)

    expect(countDisplay).toHaveTextContent('Count: 42')
    expect(input).toHaveValue('')
  })

  test('does not change count when invalid input is provided', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const input = screen.getByTestId('custom-input')
    const setCustomBtn = screen.getByTestId('set-custom-btn')
    const countDisplay = screen.getByTestId('count-display')

    await user.type(input, 'not a number')
    await user.click(setCustomBtn)

    expect(countDisplay).toHaveTextContent('Count: 0')
  })

  test('performs multiple interactions in sequence', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementBtn = screen.getByTestId('increment-btn')
    const decrementBtn = screen.getByTestId('decrement-btn')
    const input = screen.getByTestId('custom-input')
    const setCustomBtn = screen.getByTestId('set-custom-btn')
    const countDisplay = screen.getByTestId('count-display')

    await user.click(incrementBtn)
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    expect(countDisplay).toHaveTextContent('Count: 3')

    await user.click(decrementBtn)
    expect(countDisplay).toHaveTextContent('Count: 2')

    await user.type(input, '100')
    await user.click(setCustomBtn)
    expect(countDisplay).toHaveTextContent('Count: 100')

    await user.click(incrementBtn)
    expect(countDisplay).toHaveTextContent('Count: 101')
  })
})
