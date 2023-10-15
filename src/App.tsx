import { Auth } from 'aws-amplify'
import { FC, useCallback, useEffect, useState } from 'react'
import { AddModal, Button, Header, QuotesList, SearchBar, Spinner, Toast } from './components'
import { CreateQuoteInput, Quote, SuggestedQuote, ToastContent } from './types'
import { quotesApi, suggestedQuoteApi } from './utils'

export const App: FC = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>([])
  const [suggestedQuote, setSuggestedQuote] = useState<SuggestedQuote>()
  const [search, setSearch] = useState<string>('')
  const [addMode, setAddMode] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const [toast, setToast] = useState<ToastContent>()

  useEffect(() => {
    initQuotes()
  }, [])

  useEffect(
    () => document.body.classList[addMode || showSpinner ? 'add' : 'remove']('add-mode'),
    [addMode, showSpinner],
  )

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(undefined), 5000)
      return () => clearTimeout(timeout)
    }
  }, [toast])

  const initQuotes = useCallback(async (): Promise<void> => {
    setShowSpinner(true)
    await Promise.all([fetchQuotes(), fetchSuggestedQuote()])
    setShowSpinner(false)
  }, [])

  const fetchQuotes = useCallback(async (): Promise<void> => {
    try {
      setQuotes(await quotesApi.getQuotes())
    } catch (error) {
      setToast({ message: `${error}`, type: 'error' })
    }
  }, [])

  const fetchSuggestedQuote = useCallback(async (): Promise<void> => {
    try {
      setSuggestedQuote(await suggestedQuoteApi.getQuote())
    } catch (error) {
      setToast({ message: `${error}`, type: 'error' })
    }
  }, [])

  const addQuote = useCallback(
    async (quote: CreateQuoteInput): Promise<void> => {
      try {
        const newQuote = await quotesApi.addQuote(quote)
        setQuotes([newQuote, ...quotes])
        setAddMode(false)
      } catch (error) {
        setToast({ message: `${error}`, type: 'error' })
      }
    },
    [quotes],
  )

  const addSuggestedQuote = useCallback(
    async ({ author, quote: content }: SuggestedQuote): Promise<void> => {
      setShowSpinner(true)
      await Promise.all([addQuote({ author, content }), fetchSuggestedQuote()])
      setShowSpinner(false)
    },
    [addQuote, fetchSuggestedQuote],
  )

  const deleteQuote = useCallback(
    async (quote: Quote | SuggestedQuote): Promise<void> => {
      if (quote === suggestedQuote) {
        setSuggestedQuote(undefined)
      } else {
        setShowSpinner(true)
        try {
          const { id } = quote as Quote
          await quotesApi.deleteQuote({ id })
          setQuotes(quotes.filter((quote) => quote.id !== id))
        } catch (error) {
          setToast({ message: `${error}`, type: 'error' })
        }
        setShowSpinner(false)
      }
    },
    [quotes, suggestedQuote],
  )

  const changeSuggestedQuote = useCallback(async (): Promise<void> => {
    setShowSpinner(true)
    await fetchSuggestedQuote()
    setShowSpinner(false)
  }, [fetchSuggestedQuote])

  const logout = useCallback(async (): Promise<void> => {
    try {
      await Auth.signOut({ global: true })
    } catch (_) {
      setToast({ message: 'Error during Sign Out', type: 'error' })
    }
  }, [])

  const fireAddMode = useCallback((): void => setAddMode(true), [])

  const removeAddMode = useCallback((): void => setAddMode(false), [])

  const dismissToast = useCallback((): void => setToast(undefined), [])

  return (
    <>
      <main>
        <Header onLogout={logout} />
        <SearchBar onSearch={setSearch} />
        <Button onClick={fireAddMode} label="Add Quote" icon="add" />
        <QuotesList
          quotes={quotes}
          search={search}
          suggestedQuote={suggestedQuote}
          addSuggested={addSuggestedQuote}
          changeSuggested={changeSuggestedQuote}
          deleteQuote={deleteQuote}
        />
      </main>
      {addMode && <AddModal onCancel={removeAddMode} onConfirm={addQuote} />}
      {showSpinner && <Spinner />}
      {toast && <Toast {...toast} onDismiss={dismissToast} />}
    </>
  )
}
