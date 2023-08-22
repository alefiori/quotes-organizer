import { Quote } from '../types'

export const useSearchFilter = () => {
  const searchFilter = (quotes: Array<Quote>, search: string) => {
    if (!search) {
      return quotes
    }
    const searchKeywords = search
      .split(' ')
      .filter((keyword) => keyword)
      .map((keyword) => keyword.toLowerCase())
    return quotes.filter(({ author, content }) =>
      searchKeywords.some(
        (keyword) => content.toLowerCase().includes(keyword) || author?.toLowerCase().includes(keyword),
      ),
    )
  }
  return { searchFilter }
}
