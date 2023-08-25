import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TextButton } from '..'

describe('TextButton component', () => {
  it('should render the button', () => {
    const { container } = render(<TextButton label="" onClick={vi.fn()} />)
    expect(container.querySelector('button')).toBeInTheDocument()
  })
  it('should call onClick when the button is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<TextButton label="" onClick={onClick} />)
    const button = container.querySelector('button')!
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
  it('should render the label', () => {
    const label = 'label'
    const { container } = render(<TextButton label={label} onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button).toHaveTextContent(label)
  })
  it('should render the icon if given', () => {
    const icon = 'icon'
    const { container } = render(<TextButton label="" icon={icon} onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button).toHaveTextContent(icon)
  })
  it('should add className if given', () => {
    const className = 'className'
    const { container } = render(<TextButton label="" className={className} onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button).toHaveClass(className)
  })
  it('should be disabled if disabled is true', () => {
    const { container } = render(<TextButton label="" disabled onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button).toBeDisabled()
  })
  it('should not be disabled if disabled is not given', () => {
    const { container } = render(<TextButton label="" onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button).not.toBeDisabled()
  })
  it('should not be disabled if disabled is false', () => {
    const { container } = render(<TextButton label="" disabled={false} onClick={vi.fn()} />)
    const button = container.querySelector('button')!
    expect(button).not.toBeDisabled()
  })
  it('should not call onClick when the button is clicked if disabled is true', () => {
    const onClick = vi.fn()
    const { container } = render(<TextButton label="" disabled onClick={onClick} />)
    const button = container.querySelector('button')!
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
