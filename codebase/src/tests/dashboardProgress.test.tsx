import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Progress dashboard', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders progress metrics for today', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Dashboard' }))

    expect(screen.getByText('Today')).toBeInTheDocument()
    expect(screen.getAllByText(/completed/i).length).toBeGreaterThan(0)
  })
})
