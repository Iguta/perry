import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('Goal management', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('creates a new goal with theme and category', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Goals' }))

    await user.type(screen.getByLabelText('Goal title'), 'Ship personal landing page')
    await user.clear(screen.getByLabelText('Theme'))
    await user.type(screen.getByLabelText('Theme'), 'Career')
    await user.selectOptions(screen.getByLabelText('Category'), 'Career')

    fireEvent.change(screen.getByLabelText(/Progress/), { target: { value: '65' } })

    await user.click(screen.getByRole('button', { name: /add goal/i }))

    expect(screen.getByText('Ship personal landing page')).toBeInTheDocument()
    expect(screen.getByText('Career · Career')).toBeInTheDocument()
  })
})
