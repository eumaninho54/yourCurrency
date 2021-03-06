import { View, Text, Image, TouchableOpacity, Platform, Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import Modal from 'react-native-modal'
import { StyleModalConvert } from './styles'
import { Icon } from 'react-native-elements'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import CurrencyInput from 'react-native-currency-input'
import { CoinsContext } from '../../context/coinsContext'
import { serviceDataCoins } from '../../services/dataCoinsService'
import { DataCoins } from '../../models/dataCoinsModel'
import Spinner from 'react-native-loading-spinner-overlay';

interface ModalConvert {
  visible: boolean
  setVisible: (value: React.SetStateAction<boolean>) => void
  newCurrency: number | null
  setNewCurrency: (value: React.SetStateAction<number | null>) => void
  currencyPress: DataCoins
}

export function ModalConvert({ visible, setVisible, newCurrency, setNewCurrency, currencyPress }: ModalConvert) {
  const coinsContext = useContext(CoinsContext)
  if (!coinsContext) return null
  const { state, dispatch, showCurrencys } = coinsContext

  const requestPayload = async (codein: string, value: number | null) => {
    const dataApi = await serviceDataCoins.getComparison(codein, value == null ? 0 : value)
    if (dataApi != undefined) {
      dispatch!({
        type: 'reloadCoin',
        payload: { items: dataApi, code: showCurrencys }
      })
    }
    setNewCurrency(0)
    setVisible(false)
    Keyboard.dismiss()

  }

  return (
    <Modal
      isVisible={visible}
      animationIn="fadeIn"
      style={{ justifyContent: 'center', alignItems: 'center' }}
      animationOut="fadeOut"
      backdropTransitionOutTiming={0}
      onBackdropPress={() => setVisible(false)}>
      <View style={StyleModalConvert.bg}>
        <View style={[StyleModalConvert.header]}>
          <View style={StyleModalConvert.contentCurrency}>
            <View style={StyleModalConvert.flag}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: currencyPress.image }} />
            </View>

            <View style={StyleModalConvert.nameCurrency}>
              <Text style={{ color: 'gray' }}>{currencyPress.codein}</Text>
              <Text>{currencyPress.name}</Text>
            </View>
          </View>

          <Icon
            name='close'
            color={'#777777'}
            size={35}
            tvParallaxProperties={{}}
            onPress={() => setVisible(false)} />
        </View>
        <View style={StyleModalConvert.value}>
          <Text style={{ fontSize: 24 }} >{currencyPress.symbol}</Text>
          <CurrencyInput
            keyboardType='number-pad'
            style={{ fontSize: 30 }}
            value={newCurrency == null ? 0.00 : newCurrency}
            onChangeValue={value => setNewCurrency(value)}
            minValue={0}
            maxValue={9999999999}
            separator={'.'}
            delimiter={','} />
        </View>

        <View style={StyleModalConvert.buttonBg}>
          <TouchableOpacity
            style={StyleModalConvert.button}
            onPress={() => requestPayload(currencyPress.codein, newCurrency)}>
            <Text style={{ fontSize: 20, color: 'white' }}>CONVERT</Text>
          </TouchableOpacity>

          <View style={StyleModalConvert.suggestions}>
            <TouchableOpacity
              style={StyleModalConvert.buttonSuggestion}
              onPress={() => requestPayload(currencyPress.codein, 1)}>
              <Text style={{ fontSize: 20, color: '#19a50d' }}>{currencyPress.symbol}1</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={StyleModalConvert.buttonSuggestion}
              onPress={() => requestPayload(currencyPress.codein, 10)}>
              <Text style={{ fontSize: 20, color: '#19a50d' }}>{currencyPress.symbol}10</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={StyleModalConvert.buttonSuggestion}
              onPress={() => requestPayload(currencyPress.codein, 100)}>
              <Text style={{ fontSize: 20, color: '#19a50d' }}>{currencyPress.symbol}100</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
    </Modal>
  )
}