import { FC } from 'react'
import { QuoteCard } from '..'
import { Quote } from '../../types'

type QuotesListProps = {
  quotes: Array<Quote>
}

export const QuotesList: FC<QuotesListProps> = ({ quotes }) => {
  return (
    <section>
      <h2>List of Quotes</h2>
      {quotes.length ? (
        <ul>
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
