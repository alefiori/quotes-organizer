// eslint-disable-next-line import/named
import { GraphQLQuery } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'
import { createQuote, deleteQuote, searchQuotes } from '../graphql'
import {
  CreateQuoteInput,
  CreateQuoteMutation,
  DeleteQuoteInput,
  DeleteQuoteMutation,
  Quote,
  SearchQuotesQuery,
  SearchableQuoteSortInput,
  SearchableQuoteSortableFields,
  SearchableSortDirection,
} from '../types'

export const quotesApi = {
  addQuote: async (input: CreateQuoteInput): Promise<Quote> => {
    const { data } = await API.graphql<GraphQLQuery<CreateQuoteMutation>>(graphqlOperation(createQuote, { input }))
    if (data?.createQuote) {
      return data.createQuote
    }
    throw new Error('Error creating quote')
  },
  deleteQuote: async (input: DeleteQuoteInput): Promise<void> => {
    const { data } = await API.graphql<GraphQLQuery<DeleteQuoteMutation>>(graphqlOperation(deleteQuote, { input }))
    if (!data?.deleteQuote) {
      throw new Error('Error deleting quote')
    }
  },
  getQuotes: async (): Promise<Array<Quote>> => {
    const sort: SearchableQuoteSortInput = {
      direction: SearchableSortDirection.desc,
      field: SearchableQuoteSortableFields.createdAt,
    }
    const { data } = await API.graphql<GraphQLQuery<SearchQuotesQuery>>(graphqlOperation(searchQuotes, { sort }))
    if (data?.searchQuotes?.items) {
      return data.searchQuotes.items
    }
    throw new Error('Error fetching quotes')
  },
}
