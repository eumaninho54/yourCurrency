import { Linking } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { StyleSettings } from './styles'
import CardSettings from '../cardSettings'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from '../../context/settingsContext';

export default function Settings() {
  const settingsContext = useContext(SettingsContext)

  if (!settingsContext) return null
  const { saveCurrencys, setSaveCurrencys } = settingsContext

  const changeSaveCurrencys = () => {
    AsyncStorage.setItem("@saveCurrencys", String(!saveCurrencys))
    setSaveCurrencys(!saveCurrencys)

    if(!saveCurrencys){
      AsyncStorage.removeItem("@showCurrencys")
    }
  }

  const toAbout = async () => {
    const url = "https://github.com/eumaninho54"

    const supported = await Linking.canOpenURL(url)

    if (supported)
      Linking.openURL(url)
  }

  useEffect(() => {
    const isSaveCurrencys = async () => {
      let asyncStorage = await AsyncStorage.getItem('@saveCurrencys')

      if (asyncStorage == 'true'){
        setSaveCurrencys(true)
      }
    }

    isSaveCurrencys()
  },[])

  return (
    <StyleSettings>
      <CardSettings
        onActived={changeSaveCurrencys}
        valueSwitch={saveCurrencys}
        title={'Save coins'}
        description={'Save all current currencys from the list.'}
        type='switch' />

      <CardSettings
        onActived={toAbout}
        valueSwitch={false}
        title={'About'}
        description={'Want to know more about the Creator of this App? Check it out!'}
        type='arrow' />
    </StyleSettings>
  )
}