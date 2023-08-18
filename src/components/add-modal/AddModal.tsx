import { FC, useState } from 'react'
import { CreateQuoteInput } from '../../types'

type AddModalProps = {
  onCancel: () => void
  // eslint-disable-next-line no-unused-vars
  onConfirm: (quote: Omit<CreateQuoteInput, 'id'>) => Promise<void>
}

export const AddModal: FC<AddModalProps> = ({ onCancel, onConfirm }) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  return (
    <article className="add-modal">
      <button className="add-modal__close" onClick={onCancel}>
        X
      </button>
      <form>
        <label htmlFor="add-form-content">Content</label>
        <textarea
          required
          id="add-form-content"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <label htmlFor="add-form-author">Author</label>
        <input id="add-form-author" type="text" value={author} onChange={({ target: { value } }) => setAuthor(value)} />
      </form>
      <button className="add-modal__cancel" onClick={onCancel}>
        Cancel
      </button>
      <button
        className="add-modal__add"
        disabled={!content.trim()}
        onClick={() => onConfirm({ content, author: author.trim() ? author : null })}
        type="submit"
      >
        Add
      </button>
    </article>
  )
}
