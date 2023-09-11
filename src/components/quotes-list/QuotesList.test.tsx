import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { QuotesList } from '..'
import { Quote, SuggestedQuote } from '../../types'

const mockQuote: Quote = {
  __typename: 'Quote',
  content: '__QUOTE__',
  createdAt: '',
  id: '',
  updatedAt: '',
}

const mockQuotes: Array<Quote> = Array(4).fill(mockQuote)

const mockSuggestedQuote: SuggestedQuote = {
  author: '__SUGGESTED_AUTHOR__',
  quote: '__SUGGESTED_QUOTE__',
  category: '__SUGGESTED_CATEGORY__',
}

vi.mock('../quote-card/QuoteCard', () => ({
  QuoteCard: ({
    onAdd,
    onChange,
    onCopy,
    onDelete,
  }: {
    onAdd: () => void
    onChange: () => void
    onCopy: () => void
    onDelete: () => void
  }) => {
    return (
      <>
        <div>__QUOTE_CARD__</div>
        <button onClick={onAdd}>__ON_ADD__</button>
        <button onClick={onChange}>__ON_CHANGE__</button>
        <button onClick={onCopy}>__ON_COPY__</button>
        <button onClick={onDelete}>__ON_DELETE__</button>
      </>
    )
  },
}))

const searchFilter = vi.hoisted(() => vi.fn((quotes: Array<Quote>) => quotes))

vi.mock('../../utils', () => ({
  searchFilter,
}))

const writeText = vi.fn()

Object.assign(navigator, {
  clipboard: { writeText },
})

describe('QuotesList component', () => {
  it('should render a title', () => {
    const { container } = render(
      <QuotesList search="" quotes={[]} addSuggested={vi.fn()} changeSuggested={vi.fn()} deleteQuote={vi.fn()} />,
    )
    expect(container.querySelector('h2')).toHaveTextContent('List of Quotes')
  })
  it('should render a message when no quotes are given', () => {
    const { container } = render(
      <QuotesList search="" quotes={[]} addSuggested={vi.fn()} changeSuggested={vi.fn()} deleteQuote={vi.fn()} />,
    )
    expect(container.querySelector('p')).toHaveTextContent('No quotes found')
  })
  it('should render a list of QuoteCard components based to given quotes', () => {
    const { container } = render(
      <QuotesList
        search=""
        quotes={mockQuotes}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    const elements = container.querySelectorAll('li')
    expect(elements.length).toBe(mockQuotes.length)
    for (const element of elements) {
      expect(element).toHaveTextContent('__QUOTE_CARD__')
    }
  })
  it('should call searchFilter with given search and quotes', () => {
    render(
      <QuotesList
        search="__QUOTE__"
        quotes={mockQuotes}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    expect(searchFilter).toHaveBeenCalledWith(mockQuotes, '__QUOTE__')
    render(
      <QuotesList
        search=""
        quotes={mockQuotes}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    expect(searchFilter).toHaveBeenCalledWith(mockQuotes, '')
  })
  it('should render a QuoteCard component for suggestedQuote', () => {
    const { container } = render(
      <QuotesList
        search=""
        quotes={[]}
        suggestedQuote={mockSuggestedQuote}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    expect(container.querySelector('li')).toHaveTextContent('__QUOTE_CARD__')
  })
  it('should call searchFilter with suggestedQuote when it is given', () => {
    render(
      <QuotesList
        search="__SUGGESTED__"
        quotes={[]}
        suggestedQuote={mockSuggestedQuote}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    expect(searchFilter).toHaveBeenCalledWith(
      [{ content: mockSuggestedQuote.quote, author: mockSuggestedQuote.author }],
      '__SUGGESTED__',
    )
  })
  it('should not render a QuoteCard component for suggestedQuote when it is not given', () => {
    const { container } = render(
      <QuotesList search="" quotes={[]} addSuggested={vi.fn()} changeSuggested={vi.fn()} deleteQuote={vi.fn()} />,
    )
    expect(container.querySelector('li')).toBeNull()
  })
  it('should call addSuggested when onAdd is called passing suggestedQuote', () => {
    const addSuggested = vi.fn()
    const { getByText } = render(
      <QuotesList
        search=""
        quotes={[]}
        suggestedQuote={mockSuggestedQuote}
        addSuggested={addSuggested}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    const addButton = getByText('__ON_ADD__')
    fireEvent.click(addButton)
    expect(addSuggested).toHaveBeenCalledWith(mockSuggestedQuote)
  })
  it('should call changeSuggested when onChange is called', () => {
    const changeSuggested = vi.fn()
    const { getByText } = render(
      <QuotesList
        search=""
        quotes={[]}
        suggestedQuote={mockSuggestedQuote}
        addSuggested={vi.fn()}
        changeSuggested={changeSuggested}
        deleteQuote={vi.fn()}
      />,
    )
    const changeButton = getByText('__ON_CHANGE__')
    fireEvent.click(changeButton)
    expect(changeSuggested).toHaveBeenCalled()
  })
  it('should call writeText when onCopy is called on suggestedQuote', () => {
    const { getByText } = render(
      <QuotesList
        search=""
        quotes={[]}
        suggestedQuote={mockSuggestedQuote}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    const copyButton = getByText('__ON_COPY__')
    fireEvent.click(copyButton)
    expect(writeText).toHaveBeenCalled()
  })
  it('should call writeText when onCopy is called on quote', () => {
    const { getByText } = render(
      <QuotesList
        search=""
        quotes={[mockQuote]}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={vi.fn()}
      />,
    )
    const copyButton = getByText('__ON_COPY__')
    fireEvent.click(copyButton)
    expect(writeText).toHaveBeenCalled()
  })
  it('should call deleteQuote when onDelete is called on suggestedQuote', () => {
    const deleteQuote = vi.fn()
    const { getByText } = render(
      <QuotesList
        search=""
        quotes={[]}
        suggestedQuote={mockSuggestedQuote}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={deleteQuote}
      />,
    )
    const deleteButton = getByText('__ON_DELETE__')
    fireEvent.click(deleteButton)
    expect(deleteQuote).toHaveBeenCalledWith(mockSuggestedQuote)
  })
  it('should call deleteQuote when onDelete is called on quote', () => {
    const deleteQuote = vi.fn()
    const { getByText } = render(
      <QuotesList
        search=""
        quotes={[mockQuote]}
        addSuggested={vi.fn()}
        changeSuggested={vi.fn()}
        deleteQuote={deleteQuote}
      />,
    )
    const deleteButton = getByText('__ON_DELETE__')
    fireEvent.click(deleteButton)
    expect(deleteQuote).toHaveBeenCalledWith(mockQuote)
  })
})
