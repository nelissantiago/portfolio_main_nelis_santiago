import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AppProps } from 'next/app'
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react'

import '../styles/globals.scss'
import { ApolloProvider } from '@apollo/client'
import { Client } from '../lib/apollo'
import { useEffect } from 'react'
import progress from '../lib/progress'


export default function MyApp({ Component, pageProps}: AppProps) {
 
  useEffect(() => {
    progress.start()
    progress.done()
}, [])

 
  return (
    <>
        <SessionProvider session={pageProps.session}>
        <ApolloProvider client={Client}>
            <Component  {...pageProps} />
              <ToastContainer />
          </ApolloProvider>
        </SessionProvider>
    </>
  )
}

