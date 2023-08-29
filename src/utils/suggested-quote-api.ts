import { httpService } from '.'
import { SuggestedQuote, SuggestedQuoteResponse } from '../types'

const apiUrl = 'https://api.api-ninjas.com/v1/quotes'
const headers = { 'X-Api-Key': import.meta.env.VITE_SUGGESTED_QUOTE_API_KEY }

export const suggestedQuoteApi = {
  getQuote: async (): Promise<SuggestedQuote> => {
    try {
      const response = await httpService.get<SuggestedQuoteResponse>(apiUrl, { headers })
      if (response.length && response[0]?.quote) {
        return response[0]
      }
      throw new Error()
    } catch (_) {
      throw new Error('Fetching suggested quote')
    }
  },
}
