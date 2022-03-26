import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StyleAdd } from './styles'
import { AlphabetList } from 'react-native-section-alphabet-list'
import { CoinsContext } from '../../context/coinsContext'
import { alphabetList, DataCoins } from '../../models/dataCoinsModel'
import { serviceDataCoins } from '../../services/dataCoinsService'


export default function ButtonSheetAdd() {
  const {state, dispatch} = useContext(CoinsContext)
  const dataList: alphabetList[] = []

  if (dataList.length == 0){
    let newData: DataCoins[] = []


  }

  const renderCustomItem =() => {
    return(
      <View>
        <Text>Oi</Text>
      </View>
    )
  }

  return (
    <View style={StyleAdd.container}>
      <View style={StyleAdd.line}/>

      <AlphabetList
        extraData={dataList}
        data={dataList}
        indexLetterStyle={{ 
          color: 'blue', 
          fontSize: 15,
        }}
        renderCustomItem={renderCustomItem}/>
    </View>
  )
}