import { FC, useEffect, useState } from 'react'
import { QuoteCard } from '..'
import { Quote, SuggestedQuote } from '../../types'
import { useSearchFilter } from '../../utils'

type QuotesListProps = {
  quotes: Array<Quote>
  search: string
  addSuggested: (_: SuggestedQuote) => void
  suggestedQuote?: SuggestedQuote
}

export const QuotesList: FC<QuotesListProps> = ({ quotes, search, suggestedQuote, addSuggested }) => {
  const [filteredQuotes, setFilteredQuotes] = useState<Array<Quote>>(quotes)
  const { searchFilter } = useSearchFilter()

  useEffect(() => setFilteredQuotes(searchFilter(quotes, search)), [quotes, search, searchFilter])

  const copyQuote = (content: string, author?: string | null): void => {
    const authorText = author ? `\n(${author})` : ''
    navigator.clipboard.writeText(`${content}${authorText}`)
  }

  return (
    <section className="quotes-list">
      <h2 className="quotes-list__title">List of Quotes</h2>
      {filteredQuotes.length || suggestedQuote ? (
        <ul className="quotes-list__list">
          {suggestedQuote && (
            <li>
              <QuoteCard
                content={suggestedQuote.quote}
                author={suggestedQuote.author}
                onAdd={() => {
                  addSuggested(suggestedQuote)
                }}
                onCopy={() => copyQuote(suggestedQuote.quote, suggestedQuote.author)}
              />
            </li>
          )}
          {filteredQuotes.map((quote, index) => (
            <li key={index}>
              <QuoteCard {...quote} onCopy={() => copyQuote(quote.content, quote.author)} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes found</p>
      )}
    </section>
  )
}
