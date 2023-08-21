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
        <span className="material-symbols-outlined">close</span>
      </button>
      <form className="add-modal__form">
        <label htmlFor="add-form-content">Content*</label>
        <textarea
          required
          id="add-form-content"
          value={content}
          onChange={({ target: { value } }) => setContent(value)}
        />
        <label htmlFor="add-form-author">Author</label>
        <input id="add-form-author" type="text" value={author} onChange={({ target: { value } }) => setAuthor(value)} />
      </form>
      <div className="add-modal__actions">
        <button id="add-modal-cancel" className="add-modal__actions__button" onClick={onCancel}>
          <span>Cancel</span>
          <span className="material-symbols-outlined">cancel</span>
        </button>
        <button
          id="add-modal-add"
          className="add-modal__actions__button"
          disabled={!content.trim()}
          onClick={() => onConfirm({ content, author: author.trim() ? author : null })}
          type="submit"
        >
          <span>Add</span>
          <span className="material-symbols-outlined">check_circle</span>
        </button>
      </div>
    </article>
  )
}
