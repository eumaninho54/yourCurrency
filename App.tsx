import 'react-native-gesture-handler'
import { StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Routes from './src/routes'
import { reactotron } from './src/config/reactotron'
import CoinsProvider from './src/context/coinsContext'
import SettingsProvider from './src/context/settingsContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

console.tron = reactotron


export default function App() {
  const [firstAccess, setFirstAccess] = useState('')

  useEffect(() => {
    const json = async () => {
      let json = await AsyncStorage.getItem('@firstAccess')
      if (json != null)
        setFirstAccess('true')
      else
        setFirstAccess('false')
    }
    json()
  }, [])

  if (firstAccess == '')
    return null

  else
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#19a50d' }}>
        <StatusBar animated backgroundColor={'#19a50d'} />
        <SettingsProvider>
          <CoinsProvider>
            <Routes firstAccess={firstAccess} setFirstAccess={setFirstAccess} />
          </CoinsProvider>
        </SettingsProvider>
      </SafeAreaView>

    )
}
