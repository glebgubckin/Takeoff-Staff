import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import user from './store/UserStore'
import contacts from './store/ContactStore'
import './index.css'

export const Context = createContext({user, contacts})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Context.Provider value={{user, contacts}}>
      <App />
    </Context.Provider>
  </React.StrictMode>
)
