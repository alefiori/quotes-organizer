import { FC } from 'react'

type QuoteCardProps = {
  author?: string | null
  content: string
  onAdd?: () => void
  onChange?: () => void
  onCopy: () => void
  onDelete: () => void
}

export const QuoteCard: FC<QuoteCardProps> = ({ author, content, onAdd, onChange, onCopy, onDelete }) => {
  return (
    <article className={`quote-card ${onAdd ? 'quote-card--suggestion' : ''}`}>
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
          <button className="material-symbols-outlined quote-card__add" onClick={onAdd} title="add">
            add
          </button>
          {onChange && (
            <button
              className="material-symbols-outlined quote-card__action quote-card__action--change"
              title="change"
              onClick={onChange}
            >
              refresh
            </button>
          )}
        </>
      )}
      <button
        data-testid={`delete-${content}`}
        className="material-symbols-outlined quote-card__action quote-card__action--delete"
        title="delete"
        onClick={onDelete}
      >
        delete
      </button>
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
