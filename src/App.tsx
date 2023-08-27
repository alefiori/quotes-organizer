import { FC, useEffect, useState } from 'react'
import { AddModal, QuotesList, SearchBar, Spinner, TextButton } from './components'
import { CreateQuoteInput, Quote, SuggestedQuote } from './types'
import { quotesApi, suggestedQuoteApi } from './utils'

export const App: FC = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>([])
  const [suggestedQuote, setSuggestedQuote] = useState<SuggestedQuote>()
  const [search, setSearch] = useState<string>('')
  const [addMode, setAddMode] = useState<boolean>(false)
  const [showSpinner, setShowSpinner] = useState<boolean>(true)

  useEffect(() => {
    initQuotes()
  }, [])

  useEffect(
    () => document.body.classList[addMode || showSpinner ? 'add' : 'remove']('add-mode'),
    [addMode, showSpinner],
  )

  const initQuotes = async (): Promise<void> => {
    setShowSpinner(true)
    await Promise.all([fetchQuotes(), fetchSuggestedQuote()])
    setShowSpinner(false)
  }

  const fetchQuotes = async (): Promise<void> => {
    try {
      setQuotes(await quotesApi.getQuotes())
    } catch (error) {
      console.log(error)
    }
  }

  const fetchSuggestedQuote = async (): Promise<void> => {
    try {
      setSuggestedQuote(await suggestedQuoteApi.getQuote())
    } catch (error) {
      console.log(error)
    }
  }

  const addQuote = async (quote: CreateQuoteInput): Promise<void> => {
    try {
      const newQuote = await quotesApi.addQuote(quote)
      setQuotes([newQuote, ...quotes])
      setAddMode(false)
    } catch (error) {
      console.log(error)
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
        console.log(error)
      }
      setShowSpinner(false)
    }
  }

  const changeSuggestedQuote = async (): Promise<void> => {
    setShowSpinner(true)
    await fetchSuggestedQuote()
    setShowSpinner(false)
  }

  return (
    <>
      <main>
        <h1>Quotes Organizer</h1>
        <SearchBar onSearch={(search) => setSearch(search)} />
        <TextButton onClick={() => setAddMode(true)} label="Add Quote" icon="add" />
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
    </>
  )
}
