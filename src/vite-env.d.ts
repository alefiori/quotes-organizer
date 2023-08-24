/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  readonly VITE_LOGIN_USER: string
  readonly VITE_LOGIN_PASSWORD: string
  readonly VITE_SUGGESTED_QUOTE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
