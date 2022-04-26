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
    { value: 'BRL', key: 'BRL', image: flags['BRL'], name: nameCurrency['BRL']},
    { value: 'USD', key: 'USD', image: flags['USD'], name: nameCurrency['USD']},
    { value: 'CAD', key: 'CAD', image: flags['CAD'], name: nameCurrency['CAD']},
    { value: 'EUR', key: 'EUR', image: flags['EUR'], name: nameCurrency['EUR']},
    { value: 'CNY', key: 'CNY', image: flags['CNY'], name: nameCurrency['CNY']},
    { value: 'JPY', key: 'JPY', image: flags['JPY'], name: nameCurrency['JPY']},
    { value: 'GBP', key: 'GBP', image: flags['GBP'], name: nameCurrency['GBP']},
    { value: 'AUD', key: 'AUD', image: flags['AUD'], name: nameCurrency['AUD']},
    { value: 'ARS', key: 'ARS', image: flags['ARS'], name: nameCurrency['ARS']},
    { value: 'INR', key: 'INR', image: flags['INR'], name: nameCurrency['INR']},
    { value: 'CHF', key: 'CHF', image: flags['CHF'], name: nameCurrency['CHF']},
  ]

  if (!coinsContext) return null
  const { state, dispatch, showCurrencys, setShowCurrencys } = coinsContext

  const addPayload = async (code: string) => {

    setShowCurrencys([...showCurrencys, code])
    dispatch({
      type: 'addCoin',
      payload: code
    })
  }

  const removePayload = async (code?: string) => {
   
  }

  const renderCustomItem = (item: alphabetList) => {

    let isShow = state.find(currency => currency.codein == item.key)?.isShow
    if(isShow == undefined){
      isShow = false
    }

    return (
      <>
        <ItemSeparatorComponent />
        <TouchableOpacity
          style={RenderCustomItemStyle.content}
          onPress={() => isShow ? removePayload(item.key) : addPayload(item.key)}>
          <CheckBox
            checked={isShow}
            checkedIcon='check-circle'
            checkedColor='green'
            uncheckedIcon='circle-o'
            onPress={() => {isShow ? removePayload(item.key) : addPayload(item.key)}} />
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