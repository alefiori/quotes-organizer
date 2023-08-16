import { FC } from 'react'

type AddButtonProps = {
  onClick: () => void
}

export const AddButton: FC<AddButtonProps> = ({ onClick }) => {
  return <button onClick={onClick}>Add</button>
}
