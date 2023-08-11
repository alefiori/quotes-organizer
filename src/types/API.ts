/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateQuoteInput = {
  id?: string | null
  content: string
  author?: string | null
}

export type ModelQuoteConditionInput = {
  content?: ModelStringInput | null
  author?: ModelStringInput | null
  and?: Array<ModelQuoteConditionInput | null> | null
  or?: Array<ModelQuoteConditionInput | null> | null
  not?: ModelQuoteConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type Quote = {
  __typename: 'Quote'
  id: string
  content: string
  author?: string | null
  createdAt: string
  updatedAt: string
  owner?: string | null
}

export type UpdateQuoteInput = {
  id: string
  content?: string | null
  author?: string | null
}

export type DeleteQuoteInput = {
  id: string
}

export type ModelQuoteFilterInput = {
  id?: ModelIDInput | null
  content?: ModelStringInput | null
  author?: ModelStringInput | null
  and?: Array<ModelQuoteFilterInput | null> | null
  or?: Array<ModelQuoteFilterInput | null> | null
  not?: ModelQuoteFilterInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type ModelQuoteConnection = {
  __typename: 'ModelQuoteConnection'
  items: Array<Quote | null>
  nextToken?: string | null
}

export type ModelSubscriptionQuoteFilterInput = {
  id?: ModelSubscriptionIDInput | null
  content?: ModelSubscriptionStringInput | null
  author?: ModelSubscriptionStringInput | null
  and?: Array<ModelSubscriptionQuoteFilterInput | null> | null
  or?: Array<ModelSubscriptionQuoteFilterInput | null> | null
}

export type ModelSubscriptionIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type ModelSubscriptionStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  in?: Array<string | null> | null
  notIn?: Array<string | null> | null
}

export type CreateQuoteMutationVariables = {
  input: CreateQuoteInput
  condition?: ModelQuoteConditionInput | null
}

export type CreateQuoteMutation = {
  createQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type UpdateQuoteMutationVariables = {
  input: UpdateQuoteInput
  condition?: ModelQuoteConditionInput | null
}

export type UpdateQuoteMutation = {
  updateQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type DeleteQuoteMutationVariables = {
  input: DeleteQuoteInput
  condition?: ModelQuoteConditionInput | null
}

export type DeleteQuoteMutation = {
  deleteQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type GetQuoteQueryVariables = {
  id: string
}

export type GetQuoteQuery = {
  getQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type ListQuotesQueryVariables = {
  filter?: ModelQuoteFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListQuotesQuery = {
  listQuotes?: {
    __typename: 'ModelQuoteConnection'
    items: Array<{
      __typename: 'Quote'
      id: string
      content: string
      author?: string | null
      createdAt: string
      updatedAt: string
      owner?: string | null
    } | null>
    nextToken?: string | null
  } | null
}

export type OnCreateQuoteSubscriptionVariables = {
  filter?: ModelSubscriptionQuoteFilterInput | null
  owner?: string | null
}

export type OnCreateQuoteSubscription = {
  onCreateQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnUpdateQuoteSubscriptionVariables = {
  filter?: ModelSubscriptionQuoteFilterInput | null
  owner?: string | null
}

export type OnUpdateQuoteSubscription = {
  onUpdateQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}

export type OnDeleteQuoteSubscriptionVariables = {
  filter?: ModelSubscriptionQuoteFilterInput | null
  owner?: string | null
}

export type OnDeleteQuoteSubscription = {
  onDeleteQuote?: {
    __typename: 'Quote'
    id: string
    content: string
    author?: string | null
    createdAt: string
    updatedAt: string
    owner?: string | null
  } | null
}
