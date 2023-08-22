import { FC, useEffect, useState } from 'react'
import { QuoteCard } from '..'
import { Quote } from '../../types'
import { useSearchFilter } from '../../utils'

type QuotesListProps = {
  quotes: Array<Quote>
  search: string
}

export const QuotesList: FC<QuotesListProps> = ({ quotes, search }) => {
  const [filteredQuotes, setFilteredQuotes] = useState<Array<Quote>>(quotes)
  const { searchFilter } = useSearchFilter()

  useEffect(() => setFilteredQuotes(searchFilter(quotes, search)), [quotes, search, searchFilter])

  return (
    <section className="quotes-list">
      <h2 className="quotes-list__title">List of Quotes</h2>
      {filteredQuotes.length ? (
        <ul className="quotes-list__list">
          {filteredQuotes.map((quote, index) => (
            <li key={index}>
              <QuoteCard {...quote} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No quotes found</p>
      )}
    </section>
  )
}
