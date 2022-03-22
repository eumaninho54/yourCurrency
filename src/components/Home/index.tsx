import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleHome, RenderItem } from './styles'
import { CoinsContext } from '../../context/coinsContext'
import { DataCoins } from '../../models/dataCoins'
import { serviceDataCoins } from '../../services/dataCoins'
import { ListItem } from 'react-native-elements'

export default function Home() {
  const { state, dispatch } = useContext(CoinsContext)
  const renderItem = ({ item }: {item: DataCoins}) => {

    return (
      <View style={RenderItem.bg}>
        <View style={RenderItem.content}>


          <View style={RenderItem.nameCurrency}>
            <Text>{item.code}</Text>
            <Text></Text>
          </View>

          <View style={RenderItem.valueCurrency}>
            <Text></Text>
          </View>

        </View>
      </View>
    )
  }

  const requestPayload = async () => {
    const dataApi = await serviceDataCoins.get('USD-BRL,EUR-BRL')
    if(dataApi != undefined){
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
        keyExtractor={(coin) => coin.code.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          padding: 20
        }}>

      </FlatList>

      <TouchableOpacity onPress={() => { requestPayload() }}>
        <Text>ADICIONAR</Text>
      </TouchableOpacity>

    </StyleHome>
  )
}