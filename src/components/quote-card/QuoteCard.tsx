import { FC } from 'react'

type QuoteCardProps = {
  author?: string | null
  content: string
}

export const QuoteCard: FC<QuoteCardProps> = ({ author, content }) => {
  return (
    <article>
      <p>{content}</p>
      {author && <p>{author}</p>}
    </article>
  )
}
