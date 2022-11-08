import '../styles/globals.css'
import '../styles/index.css'
import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { ApolloProvider } from '@apollo/client'
import client from '../apollo-client'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
    <Toaster
      toastOptions={{
        style:{
          background: '#333',
          color: 'white'
        },
        duration: 5000

      }}
    />
    <Component {...pageProps} />
    </ApolloProvider>
  )
}
