import { FC, useEffect, useState } from 'react'
import { AddButton, AddModal, QuotesList } from './components'
import { CreateQuoteInput, Quote } from './types'
import { quotesApi } from './utils'

export const App: FC = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>([])
  const [addMode, setAddMode] = useState<boolean>(false)

  useEffect(() => {
    fetchQuotes()
  }, [])

  useEffect(() => document.body.classList[addMode ? 'add' : 'remove']('add-mode'), [addMode])

  const fetchQuotes = async (): Promise<void> => {
    try {
      setQuotes(await quotesApi.getQuotes())
    } catch (error) {
      console.log(error)
    }
  }

  const addQuote = async (quote: CreateQuoteInput): Promise<void> => {
    try {
      await quotesApi.addQuote(quote)
      fetchQuotes()
      setAddMode(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main>
        <h1>Quotes Organizer</h1>
        <AddButton onClick={() => setAddMode(true)} />
        {quotes && <QuotesList quotes={quotes} />}
      </main>
      {addMode && <AddModal onCancel={() => setAddMode(false)} onConfirm={addQuote} />}
    </>
  )
}
