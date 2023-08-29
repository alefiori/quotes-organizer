import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Toast } from '..'

describe('Toast component', () => {
  it('should render a toast with a message, a success icon and a close button', () => {
    const { getByText } = render(<Toast message="__MESSAGE__" type="success" onDismiss={vi.fn()} />)
    expect(getByText('__MESSAGE__')).toBeInTheDocument()
    expect(getByText('check_circle')).toBeInTheDocument()
    expect(getByText('close')).toBeInTheDocument()
  })
  it('should render a toast with a message, an error icon and a close button', () => {
    const { getByText } = render(<Toast message="__MESSAGE__" type="error" onDismiss={vi.fn()} />)
    expect(getByText('__MESSAGE__')).toBeInTheDocument()
    expect(getByText('error')).toBeInTheDocument()
    expect(getByText('close')).toBeInTheDocument()
  })
  it('should render a toast with a message, a warning icon and a close button', () => {
    const { getByText } = render(<Toast message="__MESSAGE__" type="warning" onDismiss={vi.fn()} />)
    expect(getByText('__MESSAGE__')).toBeInTheDocument()
    expect(getByText('warning')).toBeInTheDocument()
    expect(getByText('close')).toBeInTheDocument()
  })
  it('should call onDismiss when the close button is clicked', () => {
    const onDismiss = vi.fn()
    const { getByText } = render(<Toast message="__MESSAGE__" type="success" onDismiss={onDismiss} />)
    fireEvent.click(getByText('close'))
    expect(onDismiss).toHaveBeenCalled()
  })
})
