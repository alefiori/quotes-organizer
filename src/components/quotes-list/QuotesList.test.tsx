import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QuotesList } from '..'
import { Quote } from '../../types'

const mockQuote: Quote = {
  __typename: 'Quote',
  content: '__QUOTE__',
  createdAt: '',
  id: '',
  updatedAt: '',
}

const mockQuotes: Array<Quote> = Array(4).fill(mockQuote)

vi.mock('../quote-card/QuoteCard', () => ({
  QuoteCard: () => '__QUOTE_CARD__',
}))

const searchFilter = vi.fn((quotes: Array<Quote>) => quotes)

vi.mock('../../utils', () => ({
  useSearchFilter: () => ({
    searchFilter,
  }),
}))

describe('QuotesList component', () => {
  it('should render a title', () => {
    const { container } = render(<QuotesList addSuggested={vi.fn()} search="" quotes={[]} />)
    expect(container.querySelector('h2')).toHaveTextContent('List of Quotes')
  })
  it('should render a message when no quotes are given', () => {
    const { container } = render(<QuotesList addSuggested={vi.fn()} search="" quotes={[]} />)
    expect(container.querySelector('p')).toHaveTextContent('No quotes found')
  })
  it('should render a list of QuoteCard components based to given quotes', () => {
    const { container } = render(<QuotesList addSuggested={vi.fn()} search="" quotes={mockQuotes} />)
    const elements = container.querySelectorAll('li')
    expect(elements.length).toBe(mockQuotes.length)
    for (const element of elements) {
      expect(element).toHaveTextContent('__QUOTE_CARD__')
    }
  })
  it('should call searchFilter with given search and quotes', () => {
    render(<QuotesList addSuggested={vi.fn()} search="__QUOTE__" quotes={mockQuotes} />)
    expect(searchFilter).toHaveBeenCalledWith(mockQuotes, '__QUOTE__')
    render(<QuotesList addSuggested={vi.fn()} search="" quotes={mockQuotes} />)
    expect(searchFilter).toHaveBeenCalledWith(mockQuotes, '')
  })
})
