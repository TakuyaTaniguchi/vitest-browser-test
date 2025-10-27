import { useState } from 'react'

interface FormData {
  username: string
  email: string
  age: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  username?: string
  email?: string
  age?: string
  password?: string
  confirmPassword?: string
}

export function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else {
      const ageNum = parseInt(formData.age, 10)
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 120) {
        newErrors.age = 'Age must be between 18 and 120'
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(false)

    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Reset form
      setFormData({
        username: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
      })
    }
  }

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      age: '',
      password: '',
      confirmPassword: '',
    })
    setErrors({})
    setIsSubmitted(false)
  }

  return (
    <div>
      <h1>User Registration Form</h1>

      {isSubmitted && (
        <div
          data-testid="success-message"
          style={{
            padding: '10px',
            marginBottom: '20px',
            backgroundColor: '#d4edda',
            color: '#155724',
            border: '1px solid #c3e6cb',
            borderRadius: '4px',
          }}
        >
          Registration successful!
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="user-form">
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username">
            Username:
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              data-testid="username-input"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
              style={{
                marginLeft: '10px',
                padding: '5px',
                border: errors.username ? '2px solid red' : '1px solid #ccc',
              }}
            />
          </label>
          {errors.username && (
            <div
              id="username-error"
              data-testid="username-error"
              style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
            >
              {errors.username}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              data-testid="email-input"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              style={{
                marginLeft: '10px',
                padding: '5px',
                border: errors.email ? '2px solid red' : '1px solid #ccc',
              }}
            />
          </label>
          {errors.email && (
            <div
              id="email-error"
              data-testid="email-error"
              style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
            >
              {errors.email}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="age">
            Age:
            <input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              data-testid="age-input"
              aria-invalid={!!errors.age}
              aria-describedby={errors.age ? 'age-error' : undefined}
              style={{
                marginLeft: '10px',
                padding: '5px',
                border: errors.age ? '2px solid red' : '1px solid #ccc',
              }}
            />
          </label>
          {errors.age && (
            <div
              id="age-error"
              data-testid="age-error"
              style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
            >
              {errors.age}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password">
            Password:
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              data-testid="password-input"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              style={{
                marginLeft: '10px',
                padding: '5px',
                border: errors.password ? '2px solid red' : '1px solid #ccc',
              }}
            />
          </label>
          {errors.password && (
            <div
              id="password-error"
              data-testid="password-error"
              style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
            >
              {errors.password}
            </div>
          )}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword">
            Confirm Password:
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              data-testid="confirm-password-input"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
              style={{
                marginLeft: '10px',
                padding: '5px',
                border: errors.confirmPassword ? '2px solid red' : '1px solid #ccc',
              }}
            />
          </label>
          {errors.confirmPassword && (
            <div
              id="confirm-password-error"
              data-testid="confirm-password-error"
              style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}
            >
              {errors.confirmPassword}
            </div>
          )}
        </div>

        <div>
          <button
            type="submit"
            data-testid="submit-btn"
            disabled={isSubmitting}
            style={{
              padding: '8px 16px',
              marginRight: '10px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            data-testid="reset-btn"
            style={{ padding: '8px 16px' }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  )
}
