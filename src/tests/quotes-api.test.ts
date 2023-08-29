import { describe, expect, it, vi } from 'vitest'
import { quotesApi } from '../utils'

const graphqlFunctions = {
  createQuote: () => ({ data: { createQuote: 'createQuote' } }),
  deleteQuote: () => ({ data: { deleteQuote: 'deleteQuote' } }),
  searchQuotes: () => ({ data: { searchQuotes: { items: 'searchQuotes' } } }),
  error: () => new Error(),
}

const API = vi.hoisted(() => ({
  graphql: vi.fn(),
}))

vi.mock('aws-amplify', () => ({
  API,
  graphqlOperation: vi.fn(),
}))

describe('QuotesApi', () => {
  it('should make addQuote request', async () => {
    API.graphql.mockImplementationOnce(graphqlFunctions.createQuote)
    const res = await quotesApi.addQuote({ author: 'author', content: 'content' })
    expect(res).toBe('createQuote')
  })
  it('should make deleteQuote request', async () => {
    API.graphql.mockImplementationOnce(graphqlFunctions.deleteQuote)
    await expect(quotesApi.deleteQuote({ id: 'id' })).resolves.not.toThrow()
  })
  it('should make getQuotes request', async () => {
    API.graphql.mockImplementationOnce(graphqlFunctions.searchQuotes)
    const res = await quotesApi.getQuotes()
    expect(res).toBe('searchQuotes')
  })
  it('should throw error if thrown from API.graphql addQuote', async () => {
    API.graphql.mockImplementationOnce(graphqlFunctions.error)
    await expect(quotesApi.addQuote({ author: 'author', content: 'content' })).rejects.toThrow('Creating quote')
  })
  it('should throw error if thrown from API.graphql deleteQuote', async () => {
    API.graphql.mockImplementationOnce(graphqlFunctions.error)
    await expect(quotesApi.deleteQuote({ id: 'id' })).rejects.toThrow('Deleting quote')
  })
  it('should throw error if thrown from API.graphql getQuotes', async () => {
    API.graphql.mockImplementationOnce(graphqlFunctions.error)
    await expect(quotesApi.getQuotes()).rejects.toThrow('Fetching quotes')
  })
  it('should throw error if no data returned', async () => {
    await expect(quotesApi.addQuote({ author: 'author', content: 'content' })).rejects.toThrow('Creating quote')
    await expect(quotesApi.deleteQuote({ id: 'id' })).rejects.toThrow('Deleting quote')
    await expect(quotesApi.getQuotes()).rejects.toThrow('Fetching quotes')
  })
})
