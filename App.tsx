import 'react-native-gesture-handler'
import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Routes from './src/routes'
import { reactotron } from './src/config/reactotron'
import CoinsProvider from './src/context/coinsContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import FirstAccess from './src/components/firstAccess'

console.tron = reactotron

export default function App() {
  const [firstAccess, setFirstAccess] = useState('')

  useEffect(() => {
    const json = async() => {
      let json = await AsyncStorage.getItem('@firstAccess')
      if(json != null)
        setFirstAccess('true')
      else 
        setFirstAccess('false')
    } 
    json()
  },[])
//39FF5A

  if(firstAccess == '')
    return null

  else
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#19a50d' }}>
        <StatusBar animated backgroundColor={'#19a50d'} />
        <CoinsProvider>
          <Routes firstAccess={firstAccess} setFirstAccess={setFirstAccess}/>
        </CoinsProvider>
      </SafeAreaView>
    )
}



/*else
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#19a50d' }}>
        <StatusBar animated backgroundColor={'#19a50d'} />
        <CoinsProvider>
          <Routes />
        </CoinsProvider>
      </SafeAreaView>
    )*/