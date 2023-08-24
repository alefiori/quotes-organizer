import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QuoteCard } from '..'

describe('QuoteCard component', () => {
  it('should render the quote content', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} />)
    expect(container.querySelector('.quote-card__content')).toHaveTextContent('__CONTENT__')
  })
  it('should render the quote author if given', () => {
    const { container } = render(
      <QuoteCard author="__AUTHOR__" content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} />,
    )
    expect(container.querySelector('.quote-card__author')).toHaveTextContent('__AUTHOR__')
  })
  it('should not render the quote author if not given', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} />)
    expect(container.querySelector('.quote-card__author')).toBeNull()
  })

  it('should render the copy button', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} />)
    expect(container.querySelector('.quote-card__action--copy')).toBeInTheDocument()
  })

  it('should call the onCopy callback when the copy button is clicked', () => {
    const onCopy = vi.fn()
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={onCopy} onDelete={vi.fn()} />)
    const copyButton = container.querySelector('.quote-card__action--copy')!
    fireEvent.click(copyButton)
    expect(onCopy).toHaveBeenCalled()
  })

  it('should render the delete button', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} />)
    expect(container.querySelector('.quote-card__action--delete')).toBeInTheDocument()
  })

  it('should call the onDelete callback when the delete button is clicked', () => {
    const onDelete = vi.fn()
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={onDelete} />)
    const deleteButton = container.querySelector('.quote-card__action--delete')!
    fireEvent.click(deleteButton)
    expect(onDelete).toHaveBeenCalled()
  })

  it('should render the add button if onAdd is given', () => {
    const { container } = render(
      <QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} onAdd={vi.fn()} />,
    )
    expect(container.querySelector('.quote-card__action--add')).toBeInTheDocument()
  })

  it('should not render the add button if onAdd is not given', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} />)
    expect(container.querySelector('.quote-card__action--add')).not.toBeInTheDocument()
  })

  it('should call the onAdd callback when the add button is clicked', () => {
    const onAdd = vi.fn()
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} onAdd={onAdd} />)
    const addButton = container.querySelector('.quote-card__action--add')!
    fireEvent.click(addButton)
    expect(onAdd).toHaveBeenCalled()
  })

  it('should render the change button if onChange and onAdd are given', () => {
    const { container } = render(
      <QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} onAdd={vi.fn()} onChange={vi.fn()} />,
    )
    expect(container.querySelector('.quote-card__action--change')).toBeInTheDocument()
  })

  it('should not render the change button if onChange is not given', () => {
    const { container } = render(
      <QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} onAdd={vi.fn()} />,
    )
    expect(container.querySelector('.quote-card__action--change')).not.toBeInTheDocument()
  })

  it('should not render the change button if onAdd is not given', () => {
    const { container } = render(
      <QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} onChange={vi.fn()} />,
    )
    expect(container.querySelector('.quote-card__action--change')).not.toBeInTheDocument()
  })

  it('should call the onChange callback when the change button is clicked', () => {
    const onChange = vi.fn()
    const { container } = render(
      <QuoteCard content="__CONTENT__" onCopy={vi.fn()} onDelete={vi.fn()} onAdd={vi.fn()} onChange={onChange} />,
    )
    const changeButton = container.querySelector('.quote-card__action--change')!
    fireEvent.click(changeButton)
    expect(onChange).toHaveBeenCalled()
  })
})
