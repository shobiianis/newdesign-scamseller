import React from 'react'
import AppRouter from './config/Router'
import { AuthContextProvider } from './context/AuthControler'

const App = () => {
  return (
    <div>

<AuthContextProvider>

        <AppRouter/>
</AuthContextProvider>
       


    </div>
  )
}

export default App