import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store/Store'
import { Application } from './application/Application'
import './index.css'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Application />
      </Provider>
    </React.StrictMode>
  )
} else {
  console.error('Element with ID root not found')
}
