import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StyleHome, RenderItem, ModalConvert } from './styles'
import { CoinsContext } from '../../context/coinsContext'
import { DataCoins } from '../../models/dataCoinsModel'
import { serviceDataCoins } from '../../services/dataCoinsService'
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal'

export default function Home() {
  const { state, dispatch } = useContext(CoinsContext)
  const [visible, setVisible] = useState(false)
  const [currencyPress, setCurrencyPress] = useState<DataCoins>({
    code: 'USD',
    codein: 'TEST',
    high: '',
    image: '',
    name: '',
    selected: true,
    symbol: ''
  })

  const renderItem = ({ item }: { item: DataCoins }) => {

    return (
      <TouchableOpacity onPress={() => { setCurrencyPress(item); setVisible(true) }}>
        <View style={[RenderItem.bg, item.selected ? { backgroundColor: '#d0facc' } : null]}>
          <View style={RenderItem.content}>
            <View style={RenderItem.flag}>
              <Image style={{ width: 50, height: 50 }} source={{ uri: item.image }} />
            </View>

            <View style={RenderItem.nameCurrency}>
              <Text style={{color: 'gray'}}>{item.codein}</Text>
              <Text>{item.name.split('/', 2)[1]}</Text>
            </View>
          </View>

          <View style={[RenderItem.valueCurrency, item.selected ? { backgroundColor: '#19a50d' } : null]}>
            <Text style={item.selected ? { color: 'white' } : { color: '#13730A' }}>{item.symbol + ' ' + item.high}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  const ItemSeparatorComponent = () => {
    return (
      <View style={
        {
          height: 1,
          marginLeft: 20,
          marginRight: 20,
          backgroundColor: '#dddddd'
        }
      }>

      </View>
    )
  }

  const requestPayload = async (code: string) => {
    let stateKeys: string = ''
    if (code != 'USD') {
      stateKeys = `USD-${code},`
    }
    state?.forEach(coin => {
      if (code != coin.codein && coin.codein != 'USD') {
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

  return (
    <StyleHome>
      <FlatList
        data={state}
        extraData={state}
        keyExtractor={(coin) => coin.codein}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={ItemSeparatorComponent}

      >
      </FlatList>

      <Modal
        isVisible={visible}
        animationIn="fadeIn"
        style={{ justifyContent: 'center', alignItems: 'center' }}
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        onBackdropPress={() => setVisible(false)}>
        <View style={ModalConvert.bg}>
          <View style={[ModalConvert.header]}>
            <View style={ModalConvert.contentCurrency}>
              <View style={ModalConvert.flag}>
                <Image style={{ width: 50, height: 50 }} source={{ uri: currencyPress.image }} />
              </View>

              <View style={ModalConvert.nameCurrency}>
                <Text style={{color: 'gray'}}>{currencyPress.codein}</Text>
                <Text>{currencyPress.name.split('/', 2)[1]}</Text>
              </View>
            </View>

            <Icon
              name='close'
              style={{}}
              color={'#aaa'}
              size={35}
              tvParallaxProperties={{}} 
              onPress={() => setVisible(false)}/>
          </View>
        </View>

      </Modal>


    </StyleHome>
  )
}