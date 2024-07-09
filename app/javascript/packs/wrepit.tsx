import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from '@apollo/client/link/context'
import Route from '../components/routes/Index'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root')
  const root = createRoot(rootElement)

  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  }

  const uploadLink = createUploadLink({
    uri: `${process.env.BASE_URL}/graphql`,
  })

  const authLink = setContext((_, { headers }) => {
    const csrfToken = getCsrfToken()
    return {
      headers: {
        ...headers,
        'X-CSRF-Token': csrfToken,
        Accept: 'application/json'
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),
  })

  root.render(
    <ApolloProvider client={client}>
      <StrictMode>
        <Route />
      </StrictMode>
    </ApolloProvider>
  )
})
