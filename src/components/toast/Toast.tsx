import { FC } from 'react'
import { ToastContent, ToastType } from '../../types'

type ToastProps = ToastContent & {
  onDismiss: () => void
}

const toastTypeIcon: Record<ToastType, string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
}

export const Toast: FC<ToastProps> = ({ message, type, onDismiss }) => {
  return (
    <div className={`toast toast--${type}`}>
      <span className="material-symbols-outlined toast__icon">{toastTypeIcon[type]}</span>
      <span>{message}</span>
      <button className="material-symbols-outlined toast__close" title="dismiss" onClick={onDismiss}>
        close
      </button>
    </div>
  )
}
