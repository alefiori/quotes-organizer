/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchQuotes = /* GraphQL */ `
  query SearchQuotes(
    $filter: SearchableQuoteFilterInput
    $sort: [SearchableQuoteSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableQuoteAggregationInput]
  ) {
    searchQuotes(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        content
        author
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
              __typename
            }
          }
        }
        __typename
      }
      __typename
    }
  }
`
export const getQuote = /* GraphQL */ `
  query GetQuote($id: ID!) {
    getQuote(id: $id) {
      id
      content
      author
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`
export const listQuotes = /* GraphQL */ `
  query ListQuotes($filter: ModelQuoteFilterInput, $limit: Int, $nextToken: String) {
    listQuotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        author
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`
