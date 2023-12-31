// eslint-disable-next-line import/named
import { fireEvent, render, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { App } from './App'
import { Quote, SuggestedQuote } from './types'

const Auth = vi.hoisted(() => ({
  signOut: vi.fn(),
}))

vi.mock('aws-amplify', () => ({
  Auth,
}))

const quotesApi = vi.hoisted(() => ({
  getQuotes: vi.fn().mockImplementation(() => []),
  addQuote: vi.fn(),
  deleteQuote: vi.fn(),
}))

vi.mock('./utils/quotes-api', () => ({
  quotesApi,
}))

const suggestedQuote: SuggestedQuote = {
  author: '__SUGGESTED_AUTHOR__',
  quote: '__SUGGESTED_QUOTE__',
  category: '__SUGGESTED_CATEGORY__',
}

const suggestedQuoteApi = vi.hoisted(() => ({
  getQuote: vi.fn(),
}))

vi.mock('./utils/suggested-quote-api', () => ({
  suggestedQuoteApi,
}))

vi.mock('./components/add-modal/AddModal', () => ({
  AddModal: ({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) => (
    <>
      <div>__ADD_MODAL__</div>
      <button onClick={onCancel}>__ON_CANCEL__</button>
      <button onClick={onConfirm}>__ON_CONFIRM__</button>
    </>
  ),
}))

vi.mock('./components/quotes-list/QuotesList', () => ({
  QuotesList: ({
    addSuggested,
    changeSuggested,
    deleteQuote,
  }: {
    addSuggested: () => void
    changeSuggested: () => void
    deleteQuote: (_: Quote | SuggestedQuote) => void
  }) => (
    <>
      <div>__QUOTES_LIST__</div>
      <button onClick={addSuggested}>__ADD_SUGGESTED__</button>
      <button onClick={changeSuggested}>__CHANGE_SUGGESTED__</button>
      <button
        onClick={() => deleteQuote({ __typename: 'Quote', content: '', id: '__ID__', createdAt: '', updatedAt: '' })}
      >
        __DELETE_QUOTE__
      </button>
      <button onClick={() => deleteQuote(suggestedQuote)}>__DELETE_SUGGESTED_QUOTE__</button>
    </>
  ),
}))

vi.mock('./components/search-bar/SearchBar', () => ({
  SearchBar: ({ onSearch }: { onSearch: (_: string) => void }) => (
    <>
      <div>__SEARCH_BAR__</div>
      <button onClick={() => onSearch('search')}>__ON_SEARCH__</button>
    </>
  ),
}))

vi.mock('./components/spinner/Spinner', () => ({
  Spinner: () => <div>__SPINNER__</div>,
}))

vi.mock('./components/button/Button', () => ({
  Button: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>__TEXT_BUTTON__</button>,
}))

vi.mock('./components/toast/Toast', () => ({
  Toast: ({ onDismiss }: { onDismiss: () => void }) => (
    <>
      <div>__TOAST__</div>
      <button onClick={onDismiss}>__ON_DISMISS__</button>
    </>
  ),
}))

vi.mock('./components/header/Header', () => ({
  Header: ({ onLogout }: { onLogout: () => void }) => (
    <>
      <div>__HEADER__</div>
      <button onClick={onLogout}>__LOGOUT__</button>
    </>
  ),
}))

describe('App component', () => {
  it('should render header', async () => {
    const { findByText } = render(<App />)
    expect(await findByText('__HEADER__')).toBeInTheDocument()
  })
  it('should render a search bar', async () => {
    const { findByText } = render(<App />)
    expect(await findByText('__SEARCH_BAR__')).toBeInTheDocument()
  })
  it('should render a button to add a quote', async () => {
    const { findByText } = render(<App />)
    expect(await findByText('__TEXT_BUTTON__')).toBeInTheDocument()
  })
  it('should render a list of quotes', async () => {
    const { findByText } = render(<App />)
    expect(await findByText('__QUOTES_LIST__')).toBeInTheDocument()
  })
  it('should render a modal to add a quote if add button was clicked', async () => {
    const { findByText } = render(<App />)
    const addButton = await findByText('__TEXT_BUTTON__')
    fireEvent.click(addButton)
    expect(await findByText('__ADD_MODAL__')).toBeInTheDocument()
  })
  it('should call quotesApi.addQuote on AddModal onConfirm', async () => {
    const { findByText } = render(<App />)
    const addButton = await findByText('__TEXT_BUTTON__')
    fireEvent.click(addButton)
    await findByText('__ADD_MODAL__')
    const onConfirmButton = await findByText('__ON_CONFIRM__')
    fireEvent.click(onConfirmButton)
    waitFor(() => expect(quotesApi.addQuote).toHaveBeenCalled())
  })
  it('should call quotesApi.addQuote on QuotesList addSuggested', async () => {
    const { findByText } = render(<App />)
    const addButton = await findByText('__ADD_SUGGESTED__')
    fireEvent.click(addButton)
    expect(quotesApi.addQuote).toHaveBeenCalled()
  })
  it('should call quotesApi.getQuotes on startup', () => {
    render(<App />)
    waitFor(() => expect(quotesApi.getQuotes).toHaveBeenCalled())
  })
  it('should call suggestedQuoteApi.getQuote on startup', async () => {
    render(<App />)
    expect(suggestedQuoteApi.getQuote).toHaveBeenCalled()
  })
  it('should not call quotesApi.deleteQuote on QuotesList deleteQuote if suggestedQuote', async () => {
    suggestedQuoteApi.getQuote.mockImplementationOnce(() => suggestedQuote)
    const { findByText } = render(<App />)
    const deleteSuggested = await findByText('__DELETE_SUGGESTED_QUOTE__')
    await fireEvent.click(deleteSuggested)
    await expect(quotesApi.deleteQuote).not.toHaveBeenCalled()
  })
  it('should call quotesApi.deleteQuote on QuotesList deleteQuote', async () => {
    const { findByText } = render(<App />)
    const deleteButton = await findByText('__DELETE_QUOTE__')
    fireEvent.click(deleteButton)
    expect(quotesApi.deleteQuote).toHaveBeenCalledWith({ id: '__ID__' })
  })
  it('should call suggestedQuoteApi.getQuote on QuotesList changeSuggested', async () => {
    const { findByText } = render(<App />)
    const changeButton = await findByText('__CHANGE_SUGGESTED__')
    fireEvent.click(changeButton)
    expect(suggestedQuoteApi.getQuote).toHaveBeenCalled()
  })
  it('should add add-mode class when add button is clicked', async () => {
    const { findByText } = render(<App />)
    const addButton = await findByText('__TEXT_BUTTON__')
    fireEvent.click(addButton)
    expect(document.body.classList.contains('add-mode')).toBe(true)
  })
  it('should show toast when quotesApi.getQuotes fails', async () => {
    quotesApi.getQuotes.mockImplementationOnce(() => {
      throw new Error('error')
    })
    const { findByText } = render(<App />)
    expect(await findByText('__TOAST__')).toBeInTheDocument()
  })
  it('should show toast when quotesApi.addQuote fails', async () => {
    quotesApi.addQuote.mockImplementationOnce(() => {
      throw new Error('error')
    })
    const { findByText } = render(<App />)
    const addButton = await findByText('__TEXT_BUTTON__')
    fireEvent.click(addButton)
    await findByText('__ADD_MODAL__')
    const onConfirmButton = await findByText('__ON_CONFIRM__')
    fireEvent.click(onConfirmButton)
    expect(await findByText('__TOAST__')).toBeInTheDocument()
  })
  it('should show toast when quotesApi.deleteQuote fails', async () => {
    quotesApi.deleteQuote.mockImplementationOnce(() => {
      throw new Error('error')
    })
    const { findByText } = render(<App />)
    const deleteButton = await findByText('__DELETE_QUOTE__')
    fireEvent.click(deleteButton)
    expect(await findByText('__TOAST__')).toBeInTheDocument()
  })
  it('should show toast when suggestedQuoteApi.getQuote fails', async () => {
    suggestedQuoteApi.getQuote.mockImplementationOnce(() => {
      throw new Error('error')
    })
    const { findByText } = render(<App />)
    const changeButton = await findByText('__CHANGE_SUGGESTED__')
    fireEvent.click(changeButton)
    expect(await findByText('__TOAST__')).toBeInTheDocument()
  })
  it('should call Auth.signOut on logout', async () => {
    const { findByText } = render(<App />)
    const logoutButton = await findByText('__LOGOUT__')
    fireEvent.click(logoutButton)
    expect(Auth.signOut).toHaveBeenCalledOnce()
  })
  it('should show toast when Auth.signOut fails', async () => {
    Auth.signOut.mockImplementationOnce(() => {
      throw new Error('error')
    })
    const { findByText } = render(<App />)
    const logoutButton = await findByText('__LOGOUT__')
    fireEvent.click(logoutButton)
    expect(await findByText('__TOAST__')).toBeInTheDocument()
  })
})
