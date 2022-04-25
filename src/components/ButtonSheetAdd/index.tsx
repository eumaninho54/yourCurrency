import { View, Text, Platform, SectionListData, DefaultSectionT, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RenderCustomItemStyle } from './styles'
import { AlphabetList, IData } from 'react-native-section-alphabet-list'
import { CoinsContext } from '../../context/coinsContext'
import { alphabetList, currencySymbol } from '../../models/dataCoinsModel'
import ButtonSheet from '../../templates/ButtonSheet'
import { Button, CheckBox, SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { flags } from '../../services/flags'
import { serviceDataCoins } from '../../services/dataCoinsService'
import { nameCurrency } from '../../services/nameCurrency'


export default function ButtonSheetAdd() {
  const coinsContext = useContext(CoinsContext)
  const [search, setSearch] = useState<any>('')
  let dataList: alphabetList[] = [
    { value: 'BRL', key: 'BRL', image: flags['BRL'], name: nameCurrency['BRL'], selected: false },
    { value: 'USD', key: 'USD', image: flags['USD'], name: nameCurrency['USD'], selected: false },
    { value: 'CAD', key: 'CAD', image: flags['CAD'], name: nameCurrency['CAD'], selected: false },
    { value: 'EUR', key: 'EUR', image: flags['EUR'], name: nameCurrency['EUR'], selected: false },
    { value: 'CNY', key: 'CNY', image: flags['CNY'], name: nameCurrency['CNY'], selected: false },
    { value: 'JPY', key: 'JPY', image: flags['JPY'], name: nameCurrency['JPY'], selected: false },
    { value: 'GBP', key: 'GBP', image: flags['GBP'], name: nameCurrency['GBP'], selected: false },
    { value: 'AUD', key: 'AUD', image: flags['AUD'], name: nameCurrency['AUD'], selected: false },
    { value: 'ARS', key: 'ARS', image: flags['ARS'], name: nameCurrency['ARS'], selected: false },
    { value: 'BTC', key: 'BTC', image: flags['BTC'], name: nameCurrency['BTC'], selected: false },
    { value: 'INR', key: 'INR', image: flags['INR'], name: nameCurrency['INR'], selected: false },
    { value: 'CHF', key: 'CHF', image: flags['CHF'], name: nameCurrency['CHF'], selected: false },
  ]

  if (!coinsContext) return null
  const { state, dispatch } = coinsContext

  const addPayload = async (code?: string) => {
    const dataApi = await serviceDataCoins.getComparison(state, state[0].codein, 1, code)
    if (dataApi != undefined) {
      dispatch({
        type: 'addCoin',
        payload: dataApi
      })
    }
  }

  const removePayload = async (code?: string) => {
    const dataApi = await serviceDataCoins.getComparison(state, state[0].codein, 1, code)
    if (dataApi != undefined) {
      dispatch({
        type: 'removeCoin',
        payload: {dataApi: dataApi, codeRemove: code }
      })
    }
  }

  const renderCustomItem = (item: alphabetList) => {
    state.forEach(currency => {
      let isSelected = false
      if (currency.codein == item.key) {
        isSelected = true
      }
      if (isSelected) {
        item.selected = true
      }
    })

    return (
      <>
        <ItemSeparatorComponent />
        <TouchableOpacity 
          style={RenderCustomItemStyle.content} 
          onPress={() => item.selected ? removePayload(item.key) : addPayload(item.key)}>
          <CheckBox
            checked={item.selected}
            checkedIcon='check-circle'
            checkedColor='green'
            uncheckedIcon='circle-o'
            onPress={() => item.selected ? removePayload(item.key) : addPayload(item.key)} />
          <Image
            style={{ width: 40, height: 40 }}
            source={{ uri: item.image }} />
          <View style={RenderCustomItemStyle.info}>
            <Text style={RenderCustomItemStyle.value}>{item.value}</Text>
            <Text style={RenderCustomItemStyle.name}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </>
    )
  }

  const renderCustomSectionHeader = (section: SectionListData<IData, DefaultSectionT>) => {

    return (
      <View style={{ paddingLeft: 20, paddingTop: 20 }}>
        <Text>{section.title}</Text>
      </View>
    )

  }

  const ItemSeparatorComponent = () => {
    return (
      <View style={
        {
          height: 1, marginLeft: 20,
          marginRight: 20, backgroundColor: '#dddddd'
        }} />
    )
  }

  return (
    <>
      <SearchBar
        platform={Platform.OS == 'android' ? 'android' : 'ios'}
        placeholder='Currency, Country, or Code'
        onChangeText={(text) => setSearch(text)}
        value={search}
      />

      <AlphabetList
        style={{ height: '70%' }}
        extraData={state}
        data={dataList}
        indexLetterStyle={{
          color: 'green',
          fontSize: 15,
          paddingBottom: 20
        }}
        renderCustomSectionHeader={renderCustomSectionHeader}
        renderCustomItem={(item: any) => renderCustomItem(item)} />
    </>
  )
}