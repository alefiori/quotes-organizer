import { FC } from 'react'

type TextButtonProps = {
  onClick: () => void
  label: string
  icon?: string
  disabled?: boolean
  className?: string
}

export const TextButton: FC<TextButtonProps> = ({ label, icon, className, ...props }) => {
  return (
    <button className={`button ${className || ''}`} {...props}>
      <span>{label}</span>
      {icon && <span className="material-symbols-outlined">{icon}</span>}
    </button>
  )
}
