import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AddButton } from '..'

describe('AddButton component', () => {
  it('should render the add button', () => {
    const { container } = render(<AddButton onClick={vi.fn()} />)
    expect(container.querySelector('button')).toBeInTheDocument()
  })
  it('should call onClick when the add button is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<AddButton onClick={onClick} />)
    const addButton = container.querySelector('button')!
    fireEvent.click(addButton)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
