import { FC } from 'react'
import { RequireAtLeastOne } from '../../types'

type BasicButtonProps = {
  className: string
  disabled: boolean
  icon: string
  label: string
  onClick: () => void
}

type ButtonProps = RequireAtLeastOne<Partial<BasicButtonProps>, 'label' | 'icon'>

export const Button: FC<ButtonProps> = ({ label, icon, className, ...props }) => {
  return (
    <button className={`button ${className || ''}`} {...props}>
      {label && <span>{label}</span>}
      {icon && <span className="material-symbols-outlined">{icon}</span>}
    </button>
  )
}
