import { FC, useEffect, useState } from 'react'
import { Quote } from './types/API'
import { quotesApi } from './utils'
import { AddButton, AddModal, QuotesList } from './components'

export const App: FC = () => {
  const [quotes, setQuotes] = useState<Array<Quote>>([])
  const [addMode, setAddMode] = useState<boolean>(false)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async (): Promise<void> => {
    try {
      setQuotes(await quotesApi.getQuotes())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main>
      <h1>Quotes Organizer</h1>
      <AddButton onClick={() => setAddMode(true)} />
      {quotes && <QuotesList quotes={quotes} />}
      {addMode && <AddModal />}
    </main>
  )
}
