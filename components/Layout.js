
import React from 'react'

import Head from 'next/head'
import { ThemeProvider } from "styled-components"

const theme = {
  memexicolindo: {
    hbg: '#e11649',
    hpbg: '#70405c',
    acbg: '#67bcb9',
    rbg: '#d9f052'
  },
  selfthinkers: {
    hbg: '#000',
    hpbg: '#eaab00',
    acbg: '#73bdfa',
    rbg: '#f8a13d'
  },
  mancavemx: {
    hbg: '#1a203f',
    hpbg: '#eb532d',
    acbg: '#1a203f',
    rbg:  '#e92a6a'
  },
  mujerdemexico: {
    hbg: '#e6a5fa',
    hpbg: '#f75858',
    acbg: '#8773fa',
    rbg: '#effa5b'
  },
  elimaginero: {
    hbg: '#3c28df',
    hpbg: '#fed32f',
    acbg: '#3fe0f9',
    rbg:  '#e92a6a'
  }
}


const Theme = ({ children, themeComunity }) => (
  <ThemeProvider theme={theme[themeComunity]}>
      {children}
  </ThemeProvider>
)
const Layout = ({children, title, image, description, themeComunity, favicon}) => {
  return (
    <div>
      <Head>
        
        <title>{title}</title>
        <link rel="icon" type="image/vnd.microsoft.icon" href={favicon} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta property="og:type" content="website"/>
        <meta
          key="og:image"
          name="og:image"
          property="og:image"
          content={image}
        /> 
      </Head>
      <Theme themeComunity={themeComunity}>
        {children}
      </Theme>
      
    </div>
  )
}


export default Layout