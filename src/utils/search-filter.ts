export const useSearchFilter = () => {
  const searchFilter = <T extends { author?: string | null; content: string }>(
    quotes: Array<T>,
    search: string,
  ): Array<T> => {
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
