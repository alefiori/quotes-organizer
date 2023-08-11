/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateQuote = /* GraphQL */ `
  subscription OnCreateQuote($filter: ModelSubscriptionQuoteFilterInput, $owner: String) {
    onCreateQuote(filter: $filter, owner: $owner) {
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
export const onUpdateQuote = /* GraphQL */ `
  subscription OnUpdateQuote($filter: ModelSubscriptionQuoteFilterInput, $owner: String) {
    onUpdateQuote(filter: $filter, owner: $owner) {
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
export const onDeleteQuote = /* GraphQL */ `
  subscription OnDeleteQuote($filter: ModelSubscriptionQuoteFilterInput, $owner: String) {
    onDeleteQuote(filter: $filter, owner: $owner) {
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
