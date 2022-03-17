import { View, Text, FlatList } from 'react-native'
import React, { useContext } from 'react'
import { StyleHome } from './styles'
import { CoinsContext } from '../../context/coinsContext'
import { DataCoins } from '../../models/dataCoins'

export default function Home() {
  const { state, dispatch }: any = useContext(CoinsContext)


  return (
    <StyleHome>
      <FlatList
        keyExtractor={coin => coin.id.toString()}
        data={state}>

      </FlatList>
    </StyleHome>
  )
}