import { ChangeEvent, FC, useCallback, useState } from 'react'
import { Button } from '..'
import { CreateQuoteInput } from '../../types'

type AddModalProps = {
  onCancel: () => void
  onConfirm: (_: Omit<CreateQuoteInput, 'id'>) => void
}

export const AddModal: FC<AddModalProps> = ({ onCancel, onConfirm }) => {
  const [content, setContent] = useState<string>('')
  const [author, setAuthor] = useState<string>('')

  const onContentChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>): void => setContent(value),
    [],
  )

  const onAuthorChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>): void => setAuthor(value),
    [],
  )

  const onConfirmClick = useCallback(
    (): void => onConfirm({ content, author: author.trim() ? author : null }),
    [content, author, onConfirm],
  )

  return (
    <article className="add-modal" data-testid="add-modal">
      <button className="add-modal__close" data-testid="add-modal-close" onClick={onCancel}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <h2 className="add-modal__title">Add a new quote</h2>
      <form className="add-modal__form" data-testid="add-modal-form">
        <label htmlFor="add-form-content">Content*</label>
        <textarea
          required
          id="add-form-content"
          placeholder="Write or paste your quote here..."
          value={content}
          onChange={onContentChange}
        />
        <label htmlFor="add-form-author">Author</label>
        <input
          id="add-form-author"
          placeholder="Write or paste the author here..."
          type="text"
          value={author}
          onChange={onAuthorChange}
        />
      </form>
      <div className="add-modal__actions">
        <Button
          className="add-modal__actions__button"
          data-testid="add-modal-cancel"
          label="Cancel"
          icon="cancel"
          onClick={onCancel}
        />
        <Button
          className="add-modal__actions__button"
          data-testid="add-modal-add"
          label="Add"
          icon="check_circle"
          disabled={!content.trim()}
          onClick={onConfirmClick}
        />
      </div>
    </article>
  )
}
