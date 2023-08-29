import { describe, expect, it, vi } from 'vitest'
import { suggestedQuoteApi } from '../utils'

const httpService = vi.hoisted(() => ({
  get: vi.fn().mockImplementation(() => Promise.resolve([{ quote: 'hello' }])),
}))

vi.mock('../utils/http-service', () => ({
  httpService,
}))

describe('SuggestedQuoteApi', () => {
  it('should be able to get a quote', async () => {
    const res = await suggestedQuoteApi.getQuote()
    expect(res).toEqual({ quote: 'hello' })
  })
  it('should throw an error if the request fails', async () => {
    httpService.get.mockImplementationOnce(() => Promise.reject(new Error()))
    await expect(suggestedQuoteApi.getQuote()).rejects.toThrow('Fetching suggested quote')
  })
  it('should throw an error if the response is empty', async () => {
    httpService.get.mockImplementationOnce(() => Promise.resolve([{ quote: '' }]))
    await expect(suggestedQuoteApi.getQuote()).rejects.toThrow('Fetching suggested quote')
  })
})
