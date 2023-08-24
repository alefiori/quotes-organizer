import { SuggestedQuote, SuggestedQuoteResponse } from '../types'

const apiUrl = 'https://api.api-ninjas.com/v1/quotes'
const headers = { 'X-Api-Key': import.meta.env.VITE_SUGGESTED_QUOTE_API_KEY }

export const suggestedQuoteApi = {
  getQuote: async (): Promise<SuggestedQuote> => {
    const response = await executeGet<SuggestedQuoteResponse>(apiUrl, { headers })
    if (response.length && response[0]?.quote) {
      return response[0]
    }
    throw new Error('Error fetching suggested quote')
  },
}

const executeGet = async <Response>(url: string, options?: RequestInit): Promise<Response> => {
  const response = await fetch(url, options)
  if (response.ok) {
    return response.json() as Promise<Response>
  }
  throw new Error('Error fetching suggested quote')
}
