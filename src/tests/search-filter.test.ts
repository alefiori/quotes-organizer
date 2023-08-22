import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { useSearchFilter } from '../utils'
import { Quote } from '../types'

const baseMockQuote: Omit<Quote, 'content'> = {
  __typename: 'Quote',
  createdAt: '',
  id: '',
  updatedAt: '',
}

const mockQuotes: Array<Quote> = [
  {
    ...baseMockQuote,
    content: 'Quote 1',
    author: 'Author 2',
  },
  {
    ...baseMockQuote,
    content: 'Quote 2',
  },
  {
    ...baseMockQuote,
    content: 'Quote 3',
    author: 'Author 1',
  },
]

describe('useSearchFilter hook', () => {
  it('should return all quotes if search is empty', () => {
    const { searchFilter } = renderHook(() => useSearchFilter()).result.current
    const result = searchFilter(mockQuotes, '')
    expect(result).toEqual(mockQuotes)
  })
  it('should return quotes that match the search keyword', () => {
    const { searchFilter } = renderHook(() => useSearchFilter()).result.current
    const result1 = searchFilter(mockQuotes, '1')
    expect(result1).toEqual([mockQuotes[0], mockQuotes[2]])
    const result2 = searchFilter(mockQuotes, 'Author')
    expect(result2).toEqual([mockQuotes[0], mockQuotes[2]])
    const result3 = searchFilter(mockQuotes, 'Quote')
    expect(result3).toEqual(mockQuotes)
    const result4 = searchFilter(mockQuotes, '2')
    expect(result4).toEqual([mockQuotes[0], mockQuotes[1]])
    const result5 = searchFilter(mockQuotes, '3')
    expect(result5).toEqual([mockQuotes[2]])
  })
  it('should return quotes that match the search keywords', () => {
    const { searchFilter } = renderHook(() => useSearchFilter()).result.current
    const result1 = searchFilter(mockQuotes, '1 2')
    expect(result1).toEqual(mockQuotes)
    const result2 = searchFilter(mockQuotes, 'Author 2')
    expect(result2).toEqual(mockQuotes)
  })
  it('should return quotes that match the search keywords no case sensitive', () => {
    const { searchFilter } = renderHook(() => useSearchFilter()).result.current
    const result1 = searchFilter(mockQuotes, 'author')
    expect(result1).toEqual([mockQuotes[0], mockQuotes[2]])
    const result2 = searchFilter(mockQuotes, 'quote')
    expect(result2).toEqual(mockQuotes)
  })
  it('should return empty array if no quotes match the search keywords', () => {
    const { searchFilter } = renderHook(() => useSearchFilter()).result.current
    const result = searchFilter(mockQuotes, '4')
    expect(result).toEqual([])
  })
})
