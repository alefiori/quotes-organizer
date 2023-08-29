export const httpService = {
  get: async <Response>(url: string, options?: RequestInit): Promise<Response> => {
    const response = await fetch(url, options)
    if (response.ok) {
      return response.json() as Promise<Response>
    }
    throw new Error(`Fetching ${url}`)
  },
}
