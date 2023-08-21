import { FC } from 'react'

type AddButtonProps = {
  onClick: () => void
}

export const AddButton: FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      <span>Add Quote</span>
      <span className="material-symbols-outlined">add</span>
    </button>
  )
}
