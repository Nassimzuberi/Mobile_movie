import React from 'react'
import { SafeAreaView } from 'react-native'
import { Provider } from 'react-redux'
import Navigation from './Navigation/Navigation'
import store from './Store/configStore'
export default function App () {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </Provider>
  )
}
