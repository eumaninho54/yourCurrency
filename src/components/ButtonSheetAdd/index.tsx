import { View, Text, Platform, SectionListData, DefaultSectionT, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { RenderCustomItem } from './styles'
import { AlphabetList, IData } from 'react-native-section-alphabet-list'
import { CoinsContext } from '../../context/coinsContext'
import { alphabetList, currencySymbol } from '../../models/dataCoinsModel'
import { serviceDataCoins } from '../../services/dataCoinsService'
import ButtonSheet from '../../templates/ButtonSheet'
import { Button, CheckBox, SearchBar } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import { flags } from '../../services/flags'
import { nameCurrency } from '../../services/nameCurrency'


export default function ButtonSheetAdd() {
  const { state, dispatch } = useContext(CoinsContext)
  const [search, setSearch] = useState<any>('')
  const dataList: alphabetList[] = [
    { value: 'BRL', key: 'BRL', image: flags['BRL'], name: nameCurrency['BRL'], selected: true },
    { value: 'USD', key: 'USD', image: flags['USD'], name: nameCurrency['USD'], selected: true },
    { value: 'CAD', key: 'CAD', image: flags['CAD'], name: nameCurrency['CAD'], selected: false },
    { value: 'EUR', key: 'EUR', image: flags['EUR'], name: nameCurrency['EUR'], selected: true },
    { value: 'CNY', key: 'CNY', image: flags['CNY'], name: nameCurrency['CNY'], selected: false },
    { value: 'JPY', key: 'JPY', image: flags['JPY'], name: nameCurrency['JPY'], selected: false },
    { value: 'GBP', key: 'GBP', image: flags['GBP'], name: nameCurrency['GBP'], selected: false },
    { value: 'AUD', key: 'AUD', image: flags['AUD'], name: nameCurrency['AUD'], selected: false },
    { value: 'ARS', key: 'ARS', image: flags['ARS'], name: nameCurrency['ARS'], selected: false },
    { value: 'BTC', key: 'BTC', image: flags['BTC'], name: nameCurrency['BTC'], selected: false },
    { value: 'INR', key: 'INR', image: flags['INR'], name: nameCurrency['INR'], selected: false },
    { value: 'CHF', key: 'CHF', image: flags['CHF'], name: nameCurrency['CHF'], selected: false },
  ]

  useEffect(() => {

  }, [])

  const renderCustomItem = (item: alphabetList) => {
    return (
      <>
        <ItemSeparatorComponent />
        <View style={RenderCustomItem.content}>
          <CheckBox
            checked={item.selected}
            checkedIcon='check-circle'
            checkedColor='green'
            uncheckedIcon='circle-o' />
          <Image
            style={{ width: 40, height: 40 }}
            source={{ uri: item.image}} />
          <View style={RenderCustomItem.info}>
            <Text style={RenderCustomItem.value}>{item.value}</Text>
            <Text style={RenderCustomItem.name}>{item.name}</Text>
          </View>
        </View>
      </>
    )
  }

  const renderCustomSectionHeader = (section: SectionListData<IData, DefaultSectionT>) => {

    return (
      <View style={{ paddingLeft: 20, paddingTop: 20}}>
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
        style={{height: '70%'}}
        extraData={dataList}
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