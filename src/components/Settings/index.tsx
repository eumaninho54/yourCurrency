import { View, Text, SwitchChangeEvent } from 'react-native'
import React, { useContext } from 'react'
import { StyleSettings } from './styles'
import CardSettings from '../cardSettings'

export default function Settings() {
  const changeSaveCurrencys = (event: SwitchChangeEvent) => {
    console.tron.log!(event)
  }

  const toAbout = (event: SwitchChangeEvent) => {
    console.tron.log!(event)
  }

  return (
    <StyleSettings>

      <CardSettings
        onActived={changeSaveCurrencys}
        valueSwitch={false}
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