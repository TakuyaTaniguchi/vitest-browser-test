import { render } from 'vitest-browser-react'
import { expect, test, describe } from 'vitest'
import { Counter } from './Counter'

describe('Counter Component', () => {
  test('renders with initial count of 0', async () => {
    const screen = render(<Counter />)
    const countDisplay = screen.getByTestId('count-display')
    await expect.element(countDisplay).toHaveTextContent('Count: 0')
  })

  test('increments count when increment button is clicked', async () => {
    const screen = render(<Counter />)

    const incrementBtn = screen.getByTestId('increment-btn')
    const countDisplay = screen.getByTestId('count-display')

    await incrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 1')

    await incrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 2')
  })

  test('decrements count when decrement button is clicked', async () => {
    const screen = render(<Counter />)

    const decrementBtn = screen.getByTestId('decrement-btn')
    const countDisplay = screen.getByTestId('count-display')

    await decrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: -1')
  })

  test('resets count to 0 when reset button is clicked', async () => {
    const screen = render(<Counter />)

    const incrementBtn = screen.getByTestId('increment-btn')
    const resetBtn = screen.getByTestId('reset-btn')
    const countDisplay = screen.getByTestId('count-display')

    await incrementBtn.click()
    await incrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 2')

    await resetBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 0')
  })

  test('sets custom value when valid number is entered', async () => {
    const screen = render(<Counter />)

    const input = screen.getByTestId('custom-input')
    const setCustomBtn = screen.getByTestId('set-custom-btn')
    const countDisplay = screen.getByTestId('count-display')

    await input.fill('42')
    await setCustomBtn.click()

    await expect.element(countDisplay).toHaveTextContent('Count: 42')
    await expect.element(input).toHaveValue('')
  })

  test('does not change count when invalid input is provided', async () => {
    const screen = render(<Counter />)

    const input = screen.getByTestId('custom-input')
    const setCustomBtn = screen.getByTestId('set-custom-btn')
    const countDisplay = screen.getByTestId('count-display')

    await input.fill('not a number')
    await setCustomBtn.click()

    await expect.element(countDisplay).toHaveTextContent('Count: 0')
  })

  test('performs multiple interactions in sequence', async () => {
    const screen = render(<Counter />)

    const incrementBtn = screen.getByTestId('increment-btn')
    const decrementBtn = screen.getByTestId('decrement-btn')
    const input = screen.getByTestId('custom-input')
    const setCustomBtn = screen.getByTestId('set-custom-btn')
    const countDisplay = screen.getByTestId('count-display')

    await incrementBtn.click()
    await incrementBtn.click()
    await incrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 3')

    await decrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 2')

    await input.fill('100')
    await setCustomBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 100')

    await incrementBtn.click()
    await expect.element(countDisplay).toHaveTextContent('Count: 101')
  })
})
