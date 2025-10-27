import { render } from 'vitest-browser-react'
import { expect, test, describe } from 'vitest'
import { UserForm } from './UserForm'

describe('UserForm Component', () => {
  test('renders all form fields', async () => {
    const screen = await render(<UserForm />)

    await expect.element(screen.getByTestId('username-input')).toBeInTheDocument()
    await expect.element(screen.getByTestId('email-input')).toBeInTheDocument()
    await expect.element(screen.getByTestId('age-input')).toBeInTheDocument()
    await expect.element(screen.getByTestId('password-input')).toBeInTheDocument()
    await expect.element(screen.getByTestId('confirm-password-input')).toBeInTheDocument()
    await expect.element(screen.getByTestId('submit-btn')).toBeInTheDocument()
    await expect.element(screen.getByTestId('reset-btn')).toBeInTheDocument()
  })

  test('shows validation errors when submitting empty form', async () => {
    const screen = await render(<UserForm />)

    const submitBtn = screen.getByTestId('submit-btn')
    await submitBtn.click()

    await expect.element(screen.getByTestId('username-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('username-error')).toHaveTextContent('Username is required')

    await expect.element(screen.getByTestId('email-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('email-error')).toHaveTextContent('Email is required')

    await expect.element(screen.getByTestId('age-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('age-error')).toHaveTextContent('Age is required')

    await expect.element(screen.getByTestId('password-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('password-error')).toHaveTextContent('Password is required')

    await expect.element(screen.getByTestId('confirm-password-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('confirm-password-error')).toHaveTextContent('Please confirm your password')
  })

  test('validates username length', async () => {
    const screen = await render(<UserForm />)

    const usernameInput = screen.getByTestId('username-input')
    const submitBtn = screen.getByTestId('submit-btn')

    await usernameInput.fill('ab')
    await submitBtn.click()

    await expect.element(screen.getByTestId('username-error')).toHaveTextContent('Username must be at least 3 characters')
  })

  test('validates email format', async () => {
    const screen = await render(<UserForm />)

    const emailInput = screen.getByTestId('email-input')
    const submitBtn = screen.getByTestId('submit-btn')

    // Test invalid email
    await emailInput.fill('invalid-email')
    await submitBtn.click()

    await expect.element(screen.getByTestId('email-error')).toHaveTextContent('Invalid email format')

    // Test another invalid format
    await emailInput.fill('test@')
    await submitBtn.click()

    await expect.element(screen.getByTestId('email-error')).toHaveTextContent('Invalid email format')
  })

  test('validates age range', async () => {
    const screen = await render(<UserForm />)

    const ageInput = screen.getByTestId('age-input')
    const submitBtn = screen.getByTestId('submit-btn')

    // Test age too young
    await ageInput.fill('17')
    await submitBtn.click()

    await expect.element(screen.getByTestId('age-error')).toHaveTextContent('Age must be between 18 and 120')

    // Test age too old
    await ageInput.fill('121')
    await submitBtn.click()

    await expect.element(screen.getByTestId('age-error')).toHaveTextContent('Age must be between 18 and 120')
  })

  test('validates password length', async () => {
    const screen = await render(<UserForm />)

    const passwordInput = screen.getByTestId('password-input')
    const submitBtn = screen.getByTestId('submit-btn')

    await passwordInput.fill('short')
    await submitBtn.click()

    await expect.element(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 8 characters')
  })

  test('validates password confirmation match', async () => {
    const screen = await render(<UserForm />)

    const passwordInput = screen.getByTestId('password-input')
    const confirmPasswordInput = screen.getByTestId('confirm-password-input')
    const submitBtn = screen.getByTestId('submit-btn')

    await passwordInput.fill('password123')
    await confirmPasswordInput.fill('password456')
    await submitBtn.click()

    await expect.element(screen.getByTestId('confirm-password-error')).toHaveTextContent('Passwords do not match')
  })

  test('clears error when user starts typing', async () => {
    const screen = await render(<UserForm />)

    const usernameInput = screen.getByTestId('username-input')
    const submitBtn = screen.getByTestId('submit-btn')

    // Trigger validation error
    await submitBtn.click()
    await expect.element(screen.getByTestId('username-error')).toBeInTheDocument()

    // Start typing
    await usernameInput.fill('a')

    // Error should be cleared
    const usernameError = screen.container.querySelector('[data-testid="username-error"]')
    expect(usernameError).toBeNull()
  })

  test('submits form with valid data', async () => {
    const screen = await render(<UserForm />)

    // Fill all fields with valid data
    await screen.getByTestId('username-input').fill('john_doe')
    await screen.getByTestId('email-input').fill('john@example.com')
    await screen.getByTestId('age-input').fill('25')
    await screen.getByTestId('password-input').fill('password123')
    await screen.getByTestId('confirm-password-input').fill('password123')

    const submitBtn = screen.getByTestId('submit-btn')
    await submitBtn.click()

    // Should show loading state
    await expect.element(submitBtn).toBeDisabled()
    await expect.element(submitBtn).toHaveTextContent('Submitting...')

    // Wait for submission to complete
    await expect.element(screen.getByTestId('success-message')).toBeInTheDocument()
    await expect.element(screen.getByTestId('success-message')).toHaveTextContent('Registration successful!')

    // Form should be reset
    await expect.element(screen.getByTestId('username-input')).toHaveValue('')
    await expect.element(screen.getByTestId('email-input')).toHaveValue('')
    await expect.element(screen.getByTestId('password-input')).toHaveValue('')
    await expect.element(screen.getByTestId('confirm-password-input')).toHaveValue('')
  })

  test('resets form when reset button is clicked', async () => {
    const screen = await render(<UserForm />)

    // Fill form with data
    await screen.getByTestId('username-input').fill('testuser')
    await screen.getByTestId('email-input').fill('test@test.com')
    await screen.getByTestId('age-input').fill('30')

    // Trigger some errors
    await screen.getByTestId('submit-btn').click()

    // Reset form
    await screen.getByTestId('reset-btn').click()

    // All fields should be empty
    await expect.element(screen.getByTestId('username-input')).toHaveValue('')
    await expect.element(screen.getByTestId('email-input')).toHaveValue('')

    // All errors should be cleared
    const usernameError = screen.container.querySelector('[data-testid="username-error"]')
    const emailError = screen.container.querySelector('[data-testid="email-error"]')
    expect(usernameError).toBeNull()
    expect(emailError).toBeNull()
  })

  test('sets aria-invalid attribute on invalid fields', async () => {
    const screen = await render(<UserForm />)

    const usernameInput = screen.getByTestId('username-input')
    const submitBtn = screen.getByTestId('submit-btn')

    // Initially should not have aria-invalid
    await expect.element(usernameInput).not.toHaveAttribute('aria-invalid', 'true')

    // Submit to trigger validation
    await submitBtn.click()

    // Should now have aria-invalid
    await expect.element(usernameInput).toHaveAttribute('aria-invalid', 'true')
  })

  test('associates error messages with inputs via aria-describedby', async () => {
    const screen = await render(<UserForm />)

    const usernameInput = screen.getByTestId('username-input')
    const submitBtn = screen.getByTestId('submit-btn')

    // Submit to trigger validation
    await submitBtn.click()

    // Check aria-describedby is set correctly
    await expect.element(usernameInput).toHaveAttribute('aria-describedby', 'username-error')
  })

  test('applies error styling to invalid fields', async () => {
    const screen = await render(<UserForm />)

    const submitBtn = screen.getByTestId('submit-btn')

    // Submit to trigger validation
    await submitBtn.click()

    // Verify that aria-invalid is set, which indicates error styling
    await expect.element(screen.getByTestId('username-input')).toHaveAttribute('aria-invalid', 'true')
  })

  test('handles complete user registration workflow', async () => {
    const screen = await render(<UserForm />)

    // Step 1: Try to submit empty form
    await screen.getByTestId('submit-btn').click()
    await expect.element(screen.getByTestId('username-error')).toBeInTheDocument()

    // Step 2: Fill with invalid data
    await screen.getByTestId('username-input').fill('ab')
    await screen.getByTestId('email-input').fill('invalid')
    await screen.getByTestId('age-input').fill('15')
    await screen.getByTestId('password-input').fill('short')
    await screen.getByTestId('confirm-password-input').fill('different')
    await screen.getByTestId('submit-btn').click()

    // Verify all validation errors
    await expect.element(screen.getByTestId('username-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('email-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('age-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('password-error')).toBeInTheDocument()
    await expect.element(screen.getByTestId('confirm-password-error')).toBeInTheDocument()

    // Step 3: Correct all fields
    await screen.getByTestId('username-input').fill('john_doe_123')
    await screen.getByTestId('email-input').fill('john.doe@example.com')
    await screen.getByTestId('age-input').fill('28')
    await screen.getByTestId('password-input').fill('securePassword123')
    await screen.getByTestId('confirm-password-input').fill('securePassword123')

    // Step 4: Submit successfully
    await screen.getByTestId('submit-btn').click()

    // Step 5: Verify success
    await expect.element(screen.getByTestId('success-message')).toBeInTheDocument()
  })

  test('validates all fields simultaneously on submit', async () => {
    const screen = await render(<UserForm />)

    // Fill only username correctly, leave others empty/invalid
    await screen.getByTestId('username-input').fill('validuser')
    await screen.getByTestId('submit-btn').click()

    // Should show errors for all other required fields
    const emailError = screen.getByTestId('email-error')
    const ageError = screen.getByTestId('age-error')
    const passwordError = screen.getByTestId('password-error')
    const confirmPasswordError = screen.getByTestId('confirm-password-error')

    await expect.element(emailError).toBeInTheDocument()
    await expect.element(ageError).toBeInTheDocument()
    await expect.element(passwordError).toBeInTheDocument()
    await expect.element(confirmPasswordError).toBeInTheDocument()

    // Username should not have error
    const usernameError = screen.container.querySelector('[data-testid="username-error"]')
    expect(usernameError).toBeNull()
  })
})
