import { FC } from 'react'

type QuoteCardProps = {
  author?: string | null
  content: string
}

export const QuoteCard: FC<QuoteCardProps> = ({ author, content }) => {
  return (
    <article className="quote-card">
      <p className="quote-card__content" title={content}>
        {content}
      </p>
      {author && (
        <p className="quote-card__author" title={author}>
          {author}
        </p>
      )}
    </article>
  )
}
