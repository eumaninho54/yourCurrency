import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleHome, RenderItem } from './styles'
import { CoinsContext } from '../../context/coinsContext'
import { DataCoins } from '../../models/dataCoinsModel'
import { serviceDataCoins } from '../../services/dataCoinsService'

export default function Home() {
  const { state, dispatch } = useContext(CoinsContext)

  const renderItem = ({ item }: { item: DataCoins }) => {

    return (
      <TouchableOpacity onPress={() => {requestPayload(item.codein)}}>
        <View style={[RenderItem.bg, item.selected ? {backgroundColor: 'gray'} : null]}>
          <View style={RenderItem.content}>
            <View style={RenderItem.flag}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: item.image }} />
            </View>

            <View style={RenderItem.nameCurrency}>
              <Text>{item.codein}</Text>
              <Text>{item.name.split('/', 2)[1]}</Text>
            </View>
          </View>

          <View style={RenderItem.valueCurrency}>
            <Text>{item.symbol + ' ' + item.high}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const ItemSeparatorComponent = (props: any) => {
    return (
      <View style={
        {
          height: 1,
          marginLeft: 5,
          marginRight: 5,
          backgroundColor: props.highlighted
            ? 'yellow'
            : 'gray'
        }
      }>

      </View>
    )
  }

  const requestPayload = async (code: any) => {
    let stateKeys: string = ''
    if(code != 'USD'){
      stateKeys = `USD-${code},`
    }
    state?.forEach(coin => {
      if(code != coin.codein && coin.codein != 'USD'){
        stateKeys += `USD-${coin.codein},`
      }
    })
    stateKeys = stateKeys.slice(0, -1)
    console.tron.log!(stateKeys)

    const dataApi = await serviceDataCoins.getComparison(stateKeys, code, 10)
    if (dataApi != undefined) {
      dispatch!({
        type: 'reloadCoin',
        payload: dataApi
      })
    }
  }

  const TESTrequestPayload = async () => {
    const dataApi = await serviceDataCoins.TESTgetComparison('USD-BRL,USD-EUR,USD-CAD,USD-CNY')
    if (dataApi != undefined) {
      dispatch!({
        type: 'addCoin',
        payload: dataApi
      })
    }
  }

  return (
    <StyleHome>
      <FlatList
        data={state}
        extraData={state}
        keyExtractor={(coin) => coin.codein}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 100}}
        ItemSeparatorComponent={ItemSeparatorComponent}

      >
      </FlatList>

      <TouchableOpacity onPress={() => { TESTrequestPayload() }}>
        <Text>ADICIONAR</Text>
      </TouchableOpacity>

    </StyleHome>
  )
}