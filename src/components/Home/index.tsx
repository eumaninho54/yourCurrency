import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleHome, RenderItem } from './styles'
import { CoinsContext } from '../../context/coinsContext'
import { DataCoins } from '../../models/dataCoinsModel'
import { serviceDataCoins } from '../../services/dataCoinsService'
import { ListItem } from 'react-native-elements'

export default function Home() {
  const { state, dispatch } = useContext(CoinsContext)
  const renderItem = ({ item }: { item: DataCoins }) => {
    console.tron.log!(item.image)
    return (
      <View style={RenderItem.bg}>
        <View style={RenderItem.content}>
          <Image style={{ width: 50, height: 50 }} source={{ uri: item.image }} />

          <View style={RenderItem.nameCurrency}>
            <Text>{item.codein}</Text>
            <Text>{item.name.split('/', 2)[1]}</Text>
          </View>
        </View>

        <View style={RenderItem.valueCurrency}>
          <Text>{item.symbol+ ' ' + item.high}</Text>
        </View>
      </View>
    )
  }

  const ItemSeparatorComponent = (props:any) => {
    return (
      <View style={
        {
          height: 1,
          backgroundColor: props.highlighted
            ? 'yellow'
            : 'gray'
        }
      }>

      </View>
    )
  }

  const requestPayload = async () => {
    const dataApi = await serviceDataCoins.getComparison('USD-BRL,USD-EUR,USD-CAD')
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
        ItemSeparatorComponent={ItemSeparatorComponent}
      >
      </FlatList>

      <TouchableOpacity onPress={() => { requestPayload() }}>
        <Text>ADICIONAR</Text>
      </TouchableOpacity>

    </StyleHome>
  )
}