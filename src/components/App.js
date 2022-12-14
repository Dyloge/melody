import React from 'react'
import { Global, css, jsx } from '@emotion/core'
import MusicPlayer from './index'

const App = () => (
  <>
    <Global styles={GlobalCSS} />
    <MusicPlayer />
  </>
)

const GlobalCSS = css`
  * {
    box-sizing: border-box;
    font-family: Ubuntu, 'times new roman', times, roman, serif;
  }

  html,
  body,
  .app {
    margin: 0;
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
`

export default App
