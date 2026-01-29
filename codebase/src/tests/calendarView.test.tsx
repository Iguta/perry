import { render, screen } from '@testing-library/react'
import App from '../App'

describe('Calendar view', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shows tasks scheduled for the selected day', () => {
    render(<App />)

    expect(screen.getByText('Morning reflection')).toBeInTheDocument()
  })
})
