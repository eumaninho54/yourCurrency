import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import TabNav from './Tab';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button } from 'react-native-elements';
import ButtonSheetAdd from '../components/ButtonSheetAdd';

export default function Routes() {
  const [showSlidingAdd, setShowSlidingAdd] = useState(null)


  return (
    <>
      <NavigationContainer>
        <TabNav showSliding={showSlidingAdd} />

        <SlidingUpPanel ref={(ref: any) => setShowSlidingAdd(ref)}>
          <ButtonSheetAdd/>
        </SlidingUpPanel>
      </NavigationContainer>
    </>
  )
}