import { useState, ReactNode } from 'react'

interface ToggleProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}

export function Toggle({ title, children, defaultOpen = false }: ToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div data-testid="toggle-container">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '10px',
          backgroundColor: '#f0f0f0',
          borderRadius: '4px',
          userSelect: 'none'
        }}
        onClick={toggleOpen}
        data-testid="toggle-button"
      >
        <span
          style={{
            marginRight: '8px',
            fontSize: '14px',
            transition: 'transform 0.2s'
          }}
          data-testid="toggle-icon"
        >
          {isOpen ? '▼' : '▶'}
        </span>
        <span style={{ fontWeight: 'bold' }}>{title}</span>
      </div>
      {isOpen && (
        <div
          style={{
            marginTop: '10px',
            padding: '10px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px'
          }}
          data-testid="toggle-content"
        >
          {children}
        </div>
      )}
    </div>
  )
}
