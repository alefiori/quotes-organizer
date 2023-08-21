import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { QuoteCard } from '..'

describe('QuoteCard component', () => {
  it('should render the quote content', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" />)
    expect(container.querySelector('.quote-card__content')).toHaveTextContent('__CONTENT__')
  })
  it('should render the quote author if given', () => {
    const { container } = render(<QuoteCard author="__AUTHOR__" content="__CONTENT__" />)
    expect(container.querySelector('.quote-card__author')).toHaveTextContent('__AUTHOR__')
  })
  it('should not render the quote author if not given', () => {
    const { container } = render(<QuoteCard content="__CONTENT__" />)
    expect(container.querySelector('.quote-card__author')).toBeNull()
  })
})
