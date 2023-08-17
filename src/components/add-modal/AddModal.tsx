import { FC } from 'react'

type AddModalProps = {
  onCancel: () => void
}

export const AddModal: FC<AddModalProps> = ({ onCancel }) => {
  return (
    <article className="add-modal">
      <button className="add-modal__close" onClick={onCancel}>
        X
      </button>
    </article>
  )
}
