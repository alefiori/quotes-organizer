import { FC } from 'react'

type QuoteCardProps = {
  author?: string | null
  content: string
  onCopy: () => void
}

export const QuoteCard: FC<QuoteCardProps> = ({ author, content, onCopy }) => {
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
      <button className="material-symbols-outlined quote-card__copy" title="copy" onClick={onCopy}>
        content_copy
      </button>
    </article>
  )
}
