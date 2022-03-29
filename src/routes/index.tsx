import React, { useContext, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import TabNav from './Tab';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button } from 'react-native-elements';
import ButtonSheetAdd from '../components/ButtonSheetAdd';
import ButtonSheetConvert from '../components/ButtonSheetConvert';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RefContext } from '../context/refContext';

export default function Routes() {
  const [showSlidingAdd, setShowSlidingAdd] = useState(null)
  const { showSlidingConvert, setShowSlidingConvert } = useContext(RefContext)

  return (
    <>
      <NavigationContainer>
        <TabNav 
          showSlidingAdd={showSlidingAdd}
          showSlidingConvert={showSlidingConvert}/>

        <SlidingUpPanel
          ref={(ref:any) => setShowSlidingAdd(ref)}>
          <ButtonSheetAdd/>
        </SlidingUpPanel>

        <SlidingUpPanel
          ref={(ref:any) => setShowSlidingConvert(ref)}>
          <ButtonSheetConvert/>
        </SlidingUpPanel>


      </NavigationContainer>
    </>
  )
}