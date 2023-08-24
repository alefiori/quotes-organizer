import { FC } from 'react'

type QuoteCardProps = {
  author?: string | null
  content: string
  onAdd?: () => void
  onCopy: () => void
}

export const QuoteCard: FC<QuoteCardProps> = ({ author, content, onAdd, onCopy }) => {
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
      {onAdd && (
        <>
          <span className="quote-card__suggestion">new</span>
          <button
            className="material-symbols-outlined quote-card__action quote-card__action--add"
            title="add"
            onClick={onAdd}
          >
            add
          </button>
        </>
      )}
      <button
        className="material-symbols-outlined quote-card__action quote-card__action--copy"
        title="copy"
        onClick={onCopy}
      >
        content_copy
      </button>
    </article>
  )
}
