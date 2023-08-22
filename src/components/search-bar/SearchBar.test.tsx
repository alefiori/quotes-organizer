import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from '..'

vi.mock('../../utils', () => ({
  useDebounce: () => ({
    debounce: (fn: (_: string) => void) => (value: string) => fn(value),
  }),
}))

describe('SearchBar component', () => {
  it('should render an input field with a placeholder', () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />)
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Search...')
  })
  it('should render a search icon when the input is empty', () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />)
    const icon = container.querySelector('.search-bar__icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveTextContent('search')
  })
  it('should not render a search icon when the input is not empty', () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />)
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: '__SEARCH__' } })
    expect(container.querySelector('.search-bar__icon')).not.toBeInTheDocument()
  })
  it('should update input value when it changes', () => {
    const { container } = render(<SearchBar onSearch={vi.fn()} />)
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: '__SEARCH__' } })
    expect(input).toHaveValue('__SEARCH__')
  })
  it('should call onSearch with the input value when it changes', () => {
    const onSearch = vi.fn()
    const { container } = render(<SearchBar onSearch={onSearch} />)
    const input = container.querySelector('input')!
    fireEvent.change(input, { target: { value: '__SEARCH__' } })
    expect(onSearch).toHaveBeenCalledWith('__SEARCH__')
  })
})
