import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '..'

describe('Button component', () => {
  it('should render the button', () => {
    const { container } = render(<Button label="" onClick={vi.fn()} />)
    expect(container.querySelector('button')).toBeInTheDocument()
  })
  it('should call onClick when the button is clicked', () => {
    const onClick = vi.fn()
    const { container } = render(<Button label="" onClick={onClick} />)
    const button = container.querySelector('button')!
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
  it('should render the label', () => {
    const label = 'label'
    const { container } = render(<Button label={label} />)
    const button = container.querySelector('button')!
    expect(button).toHaveTextContent(label)
  })
  it('should render the icon', () => {
    const icon = 'icon'
    const { container } = render(<Button icon={icon} />)
    const button = container.querySelector('button')!
    expect(button).toHaveTextContent(icon)
  })
  it('should add className if given', () => {
    const className = 'className'
    const { container } = render(<Button label="" className={className} />)
    const button = container.querySelector('button')!
    expect(button).toHaveClass(className)
  })
  it('should be disabled if disabled is true', () => {
    const { container } = render(<Button label="" disabled />)
    const button = container.querySelector('button')!
    expect(button).toBeDisabled()
  })
  it('should not be disabled if disabled is not given', () => {
    const { container } = render(<Button label="" />)
    const button = container.querySelector('button')!
    expect(button).not.toBeDisabled()
  })
  it('should not be disabled if disabled is false', () => {
    const { container } = render(<Button label="" disabled={false} />)
    const button = container.querySelector('button')!
    expect(button).not.toBeDisabled()
  })
  it('should not call onClick when the button is clicked if disabled is true', () => {
    const onClick = vi.fn()
    const { container } = render(<Button label="" disabled onClick={onClick} />)
    const button = container.querySelector('button')!
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
