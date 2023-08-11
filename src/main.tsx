import { withAuthenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import awsConfig from './aws-exports'
import './styles/main.scss'

Amplify.configure(awsConfig)

const AppWithAuth = withAuthenticator(App)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithAuth />
  </StrictMode>,
)
