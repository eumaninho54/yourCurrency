import 'react-native-gesture-handler'
import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import Routes from './src/routes'
import { reactotron } from './src/config/reactotron'
import CoinsProvider from './src/context/coinsContext'
console.tron = reactotron

export default function App() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#19a50d' }}>
      <StatusBar animated backgroundColor={'#19a50d'} />
      <CoinsProvider>
        <Routes />
      </CoinsProvider>
    </SafeAreaView>
  )
}