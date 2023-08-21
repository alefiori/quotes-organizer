import { FC } from 'react'
import { QuoteCard } from '..'
import { Quote } from '../../types'

type QuotesListProps = {
  quotes: Array<Quote>
}

export const QuotesList: FC<QuotesListProps> = ({ quotes }) => {
  return (
    <section className="quotes-list">
      <h2 className="quotes-list__title">List of Quotes</h2>
      {quotes.length ? (
        <ul className="quotes-list__list">
          {quotes.map((quote, index) => (
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
