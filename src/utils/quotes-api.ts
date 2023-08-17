// eslint-disable-next-line import/named
import { GraphQLQuery } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'
import { createQuote } from '../graphql/mutations'
import { listQuotes } from '../graphql/queries'
import { CreateQuoteInput, CreateQuoteMutation, ListQuotesQuery, Quote } from '../types'

export const quotesApi = {
  addQuote: async (input: CreateQuoteInput): Promise<void> => {
    const { errors } = await API.graphql<GraphQLQuery<CreateQuoteMutation>>(graphqlOperation(createQuote, { input }))
    if (errors?.length) {
      throw new Error('Error creating quote')
    }
  },
  getQuotes: async (): Promise<Array<Quote>> => {
    const { data } = await API.graphql<GraphQLQuery<ListQuotesQuery>>(graphqlOperation(listQuotes))
    if (data?.listQuotes?.items) {
      return data.listQuotes.items as Array<Quote>
    } else {
      throw new Error('No quotes found')
    }
  },
}
