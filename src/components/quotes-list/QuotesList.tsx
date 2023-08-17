import { FC } from 'react'
import { QuoteCard } from '..'
import { Quote } from '../../types'

type QuotesListProps = {
  quotes: Array<Quote>
}

export const QuotesList: FC<QuotesListProps> = ({ quotes }) => {
  return (
    <section>
      {quotes.map((quote, index) => (
        <QuoteCard key={index} {...quote} />
      ))}
    </section>
  )
}
