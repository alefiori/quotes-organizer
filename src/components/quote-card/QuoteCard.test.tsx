import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QuoteCard } from '..'

describe('QuoteCard component', () => {
  it('should render the quote content', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} />)
    expect(container.querySelector('.quote-card__content')).toHaveTextContent('__CONTENT__')
  })
  it('should render the quote author if given', () => {
    const { container } = render(<QuoteCard author="__AUTHOR__" content="__CONTENT__" onCopy={vi.fn()} />)
    expect(container.querySelector('.quote-card__author')).toHaveTextContent('__AUTHOR__')
  })
  it('should not render the quote author if not given', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} />)
    expect(container.querySelector('.quote-card__author')).toBeNull()
  })

  it('should render the copy button', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={vi.fn()} />)
    expect(container.querySelector('.quote-card__copy')).toBeInTheDocument()
  })

  it('should call the onCopy callback when the copy button is clicked', () => {
    const onCopy = vi.fn()
    const { container } = render(<QuoteCard content="__CONTENT__" onCopy={onCopy} />)
    const copyButton = container.querySelector('.quote-card__copy')!
    fireEvent.click(copyButton)
    expect(onCopy).toHaveBeenCalled()
  })
})
