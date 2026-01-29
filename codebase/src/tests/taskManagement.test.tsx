import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

const today = new Date().toISOString().slice(0, 10)

describe('Task management', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds a new task from the Tasks page', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Tasks' }))

    await user.type(screen.getByLabelText('Task title'), 'Plan weekly reset')
    await user.type(screen.getByLabelText('Description'), 'Review priorities and block focus time.')
    await user.type(screen.getByLabelText('Due date'), today)

    await user.click(screen.getByRole('button', { name: /add task/i }))

    expect(screen.getByText('Plan weekly reset')).toBeInTheDocument()
  })
})
