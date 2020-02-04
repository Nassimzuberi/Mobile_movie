import React from 'react'
import { Provider } from 'react-redux'
import Navigation from './Navigation/Navigation'
import store from './Store/configStore'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'

export default function App () {
  const persistor = persistStore(store)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}
