import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDebounce } from '../utils'

describe('useDebounce hook', () => {
  beforeAll(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.clearAllTimers()
  })
  afterAll(() => {
    vi.useRealTimers()
  })
  it('should call the function after the wait time', () => {
    const { debounce } = renderHook(() => useDebounce()).result.current
    const mockFn = vi.fn()
    debounce(mockFn, 100)()
    vi.advanceTimersByTime(100)
    expect(mockFn).toHaveBeenCalledOnce()
  })
  it('should not call the function before the wait time', () => {
    const { debounce } = renderHook(() => useDebounce()).result.current
    const mockFn = vi.fn()
    debounce(mockFn, 100)()
    vi.advanceTimersByTime(99)
    expect(mockFn).not.toHaveBeenCalled()
  })
  it('should call the function with the arguments', () => {
    const { debounce } = renderHook(() => useDebounce()).result.current
    const mockFn = vi.fn()
    debounce(mockFn, 100)('foo', 'bar')
    vi.advanceTimersByTime(100)
    expect(mockFn).toHaveBeenCalledWith('foo', 'bar')
  })
})
