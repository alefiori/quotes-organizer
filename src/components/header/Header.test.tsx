import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Header } from '..'

vi.mock('../button/Button', () => ({
  Button: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>__TEXT_BUTTON__</button>,
}))
describe('Header component', () => {
  it('shoud render the header', () => {
    const { getByRole } = render(<Header onLogout={() => {}} />)
    expect(getByRole('heading')).toHaveTextContent('Quotes Organizer')
  })
  it('shoud render the logout button', () => {
    const { getByText } = render(<Header onLogout={() => {}} />)
    expect(getByText('__TEXT_BUTTON__')).toBeInTheDocument()
  })
  it('shoud call the onLogout function when the logout button is clicked', () => {
    const onLogout = vi.fn()
    const { getByText } = render(<Header onLogout={onLogout} />)
    const logoutButton = getByText('__TEXT_BUTTON__')
    fireEvent.click(logoutButton)
    expect(onLogout).toHaveBeenCalled()
  })
})
