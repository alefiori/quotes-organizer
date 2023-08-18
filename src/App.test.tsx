import { act, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { App } from './App'

describe('App component', () => {
  it('should render', async () => {
    const app = await act(() => render(<App />))
    expect(app).toBeDefined()
  })
})
