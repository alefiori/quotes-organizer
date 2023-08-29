import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it } from 'vitest'
import { httpService } from '../utils'

const restHandlers = [
  rest.get('http://api/ok', (_, res, ctx) => res(ctx.status(200), ctx.json({ message: 'hello' }))),
  rest.get('http://api/ko', (_, res, ctx) => res(ctx.status(500))),
]
const server = setupServer(...restHandlers)

describe('httpService', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
  afterAll(() => server.close())
  afterEach(() => server.resetHandlers())
  it('should be able to make a GET request', async () => {
    const { message } = await httpService.get<{ message: string }>('http://api/ok')
    expect(message).toBe('hello')
  })
  it('should throw an error if the request fails', async () => {
    await expect(httpService.get('http://api/ko')).rejects.toThrow('Fetching http://api/ko')
  })
})
