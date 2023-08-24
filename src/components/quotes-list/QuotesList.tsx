import { FC, useEffect, useState } from 'react'
import { QuoteCard } from '..'
import { Quote, SuggestedQuote } from '../../types'
import { useSearchFilter } from '../../utils'

type QuotesListProps = {
  quotes: Array<Quote>
  search: string
  addSuggested: (_: SuggestedQuote) => void
  changeSuggested: () => void
  deleteQuote: (_: Quote | SuggestedQuote) => void
  suggestedQuote?: SuggestedQuote
}

export const QuotesList: FC<QuotesListProps> = ({
  quotes,
  search,
  suggestedQuote,
  addSuggested,
  changeSuggested,
  deleteQuote,
}) => {
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
                onChange={changeSuggested}
                onCopy={() => copyQuote(suggestedQuote.quote, suggestedQuote.author)}
                onDelete={() => deleteQuote(suggestedQuote)}
              />
            </li>
          )}
          {filteredQuotes.map((quote, index) => (
            <li key={index}>
              <QuoteCard
                {...quote}
                onCopy={() => copyQuote(quote.content, quote.author)}
                onDelete={() => deleteQuote(quote)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes found</p>
      )}
    </section>
  )
}
