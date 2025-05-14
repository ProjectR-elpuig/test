import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import '@mantine/core/styles.css';

import { isEnvBrowser } from './utils/misc'
import { customTheme } from './theme'

import { MantineProvider } from '@mantine/core'
import { RecoilRoot } from 'recoil'

if (isEnvBrowser()) {
  const root = document.getElementById('root')

  root!.style.backgroundImage = 'url("https://i.imgur.com/3pzRj9n.png")'
  root!.style.backgroundSize = 'cover'
  root!.style.backgroundRepeat = 'no-repeat'
  root!.style.backgroundPosition = 'center'
}

const root = document.getElementById('root') as HTMLElement
ReactDOM.createRoot(root!).render(
  <React.StrictMode>
    <RecoilRoot>
      <MantineProvider theme={customTheme} defaultColorScheme='dark'>
        <App />
      </MantineProvider>
    </RecoilRoot>
  </React.StrictMode>
)
