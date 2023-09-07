import { FC } from 'react'
import { Button } from '..'

type HeaderProps = {
  onLogout: () => void
}

export const Header: FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="header">
      <h1>Quotes Organizer</h1>
      <Button icon="logout" onClick={onLogout} />
    </header>
  )
}
