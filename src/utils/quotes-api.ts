// eslint-disable-next-line import/named
import { GraphQLQuery } from '@aws-amplify/api'
import { API, graphqlOperation } from 'aws-amplify'
import { listQuotes } from '../graphql/queries'
import { ListQuotesQuery, Quote } from '../types/API'

export const quotesApi = {
  getQuotes: async (): Promise<Array<Quote>> => {
    const { data } = await API.graphql<GraphQLQuery<ListQuotesQuery>>(graphqlOperation(listQuotes))
    if (data?.listQuotes?.items) {
      return data.listQuotes.items as Array<Quote>
    } else {
      throw new Error('No quotes found')
    }
  },
}
