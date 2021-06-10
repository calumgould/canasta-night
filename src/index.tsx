import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.css'
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
import App from './App'
import store from './redux/store'
import './Types'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastProvider
        autoDismiss
        placement="bottom-left"
      >
        <App />
      </ToastProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
