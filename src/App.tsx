import { FC, useEffect, useState } from 'react'
import { AddModal, Header, QuotesList, SearchBar, Spinner, Button, Toast } from './components'
import { CreateQuoteInput, Quote, SuggestedQuote, ToastContent } from './types'
import { quotesApi, suggestedQuoteApi } from './utils'
import { Auth } from 'aws-amplify'

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

  const initQuotes = async (): Promise<void> => {
    setShowSpinner(true)
    await Promise.all([fetchQuotes(), fetchSuggestedQuote()])
    setShowSpinner(false)
  }

  const fetchQuotes = async (): Promise<void> => {
    try {
      setQuotes(await quotesApi.getQuotes())
    } catch (error) {
      setToast({ message: `${error}`, type: 'error' })
    }
  }

  const fetchSuggestedQuote = async (): Promise<void> => {
    try {
      setSuggestedQuote(await suggestedQuoteApi.getQuote())
    } catch (error) {
      setToast({ message: `${error}`, type: 'error' })
    }
  }

  const addQuote = async (quote: CreateQuoteInput): Promise<void> => {
    try {
      const newQuote = await quotesApi.addQuote(quote)
      setQuotes([newQuote, ...quotes])
      setAddMode(false)
    } catch (error) {
      setToast({ message: `${error}`, type: 'error' })
    }
  }

  const addSuggestedQuote = async ({ author, quote: content }: SuggestedQuote): Promise<void> => {
    setShowSpinner(true)
    await Promise.all([addQuote({ author, content }), fetchSuggestedQuote()])
    setShowSpinner(false)
  }

  const deleteQuote = async (quote: Quote | SuggestedQuote): Promise<void> => {
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
  }

  const changeSuggestedQuote = async (): Promise<void> => {
    setShowSpinner(true)
    await fetchSuggestedQuote()
    setShowSpinner(false)
  }

  const logout = async (): Promise<void> => {
    try {
      await Auth.signOut({ global: true })
    } catch (_) {
      setToast({ message: 'Error during Sign Out', type: 'error' })
    }
  }

  return (
    <>
      <main>
        <Header onLogout={logout} />
        <SearchBar onSearch={(search) => setSearch(search)} />
        <Button onClick={() => setAddMode(true)} label="Add Quote" icon="add" />
        <QuotesList
          quotes={quotes}
          search={search}
          suggestedQuote={suggestedQuote}
          addSuggested={addSuggestedQuote}
          changeSuggested={changeSuggestedQuote}
          deleteQuote={deleteQuote}
        />
      </main>
      {addMode && <AddModal onCancel={() => setAddMode(false)} onConfirm={addQuote} />}
      {showSpinner && <Spinner />}
      {toast && <Toast {...toast} onDismiss={() => setToast(undefined)} />}
    </>
  )
}
