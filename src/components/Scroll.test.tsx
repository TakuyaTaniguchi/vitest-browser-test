import { render } from 'vitest-browser-react'
import { expect, test, describe } from 'vitest'
import { Scroll } from './Scroll'

describe('Scroll Component', () => {
  test('renders Scroll component', async () => {
    const screen = await render(<Scroll />)
    const heading = screen.getByRole('heading', { name: 'Scroll Example' })
    await expect.element(heading).toBeDefined()
  })
})