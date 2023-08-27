import { FC, useEffect, useState } from 'react'
import { AddModal, QuotesList, SearchBar, TextButton } from './components'
import { CreateQuoteInput, Quote, SuggestedQuote } from './types'
import { quotesApi, suggestedQuoteApi } from './utils'

export const App: FC = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>([])
  const [suggestedQuote, setSuggestedQuote] = useState<SuggestedQuote>()
  const [search, setSearch] = useState<string>('')
  const [addMode, setAddMode] = useState<boolean>(false)

  useEffect(() => {
    fetchQuotes()
    fetchSuggestedQuote()
  }, [])

  useEffect(() => document.body.classList[addMode ? 'add' : 'remove']('add-mode'), [addMode])

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
  const addSuggestedQuote = ({ author, quote: content }: SuggestedQuote): void => {
    addQuote({ author, content })
    fetchSuggestedQuote()
  }

  const deleteQuote = async (quote: Quote | SuggestedQuote): Promise<void> => {
    if (quote === suggestedQuote) {
      setSuggestedQuote(undefined)
    } else {
      try {
        const { id } = quote as Quote
        await quotesApi.deleteQuote({ id })
        setQuotes(quotes.filter((quote) => quote.id !== id))
      } catch (error) {
        console.log(error)
      }
    }
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
          changeSuggested={fetchSuggestedQuote}
          deleteQuote={deleteQuote}
        />
      </main>
      {addMode && <AddModal onCancel={() => setAddMode(false)} onConfirm={addQuote} />}
    </>
  )
}
