import { View, Text, FlatList, Image, Animated } from 'react-native'
import React, { useContext, useState } from 'react'
import { StyleHome, RenderItem } from './styles'
import { CoinsContext } from '../../context/coinsContext'
import { DataCoins } from '../../models/dataCoinsModel'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {ModalConvert} from '../ModalConvert'

export default function Home() {
  const { state, dispatch } = useContext(CoinsContext)
  const [visible, setVisible] = useState(false)
  const [newCurrency, setNewCurrency] = useState<number | null>(0)
  const [onSwipeable, setOnSwipeable] = useState(false)
  const [currencyPress, setCurrencyPress] = useState<DataCoins>({
    code: 'USD',
    codein: 'TEST',
    high: '',
    image: '',
    name: '',
    selected: true,
    symbol: ''
  })

  const renderSwipeableAction = () => {

    return (
      <RectButton>
        <Animated.Text>
          EXCLUIR
        </Animated.Text>
      </RectButton>
    )
  }

  const renderItem = ({ item }: { item: DataCoins }) => {

    return (
      <GestureHandlerRootView>
        <Swipeable
          renderRightActions={renderSwipeableAction}
          onSwipeableOpen={() => setOnSwipeable(true)}
          onSwipeableClose={() => setOnSwipeable(false)}>
          <TouchableWithoutFeedback
            onPress={() => {setVisible(true); setCurrencyPress(item)}}
            disabled={onSwipeable ? true : false}>
            <Animated.View style={[RenderItem.bg, item.selected ? { backgroundColor: '#d0facc' } : null]}>
              <View style={RenderItem.content}>
                <View style={RenderItem.flag}>
                  <Image style={{ width: 50, height: 50 }} source={{ uri: item.image }} />
                </View>

                <View style={RenderItem.nameCurrency}>
                  <Text style={{ color: 'gray' }}>{item.codein}</Text>
                  <Text>{item.name.split('/', 2)[1]}</Text>
                </View>
              </View>

              <Animated.View
                style={[RenderItem.valueCurrency, item.selected ? { backgroundColor: '#19a50d' } : null]}>
                <Text style={item.selected ? { color: 'white' } : { color: '#13730A' }}>{item.symbol + ' ' + item.high}</Text>
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Swipeable>
      </GestureHandlerRootView>
    )
  }

  const ItemSeparatorComponent = () => {
    return (
      <View style={
        {height: 1, marginLeft: 20,
         marginRight: 20, backgroundColor: '#dddddd'}}/>
    )
  }

  return (
    <StyleHome>
      <FlatList
        data={state}
        extraData={state}
        keyExtractor={(coin) => coin.codein}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={ItemSeparatorComponent}>
      </FlatList>

      <ModalConvert
        visible={visible}
        setVisible={setVisible}
        newCurrency={newCurrency}
        setNewCurrency={setNewCurrency}
        currencyPress={currencyPress}/>

    </StyleHome>
  )
}

