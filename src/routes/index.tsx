import React, { useContext, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import TabNav from './Tab';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Button } from 'react-native-elements';
import ButtonSheetAdd from '../components/ButtonSheetAdd';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonSheet from '../templates/ButtonSheet';
import FirstAccess from '../components/firstAccess';

interface RoutesModel {
  firstAccess: string
  setFirstAccess: React.Dispatch<React.SetStateAction<string>>
}

export default function Routes({ firstAccess, setFirstAccess }: RoutesModel) {
  const [showSlidingAdd, setShowSlidingAdd] = useState(null)

  if (firstAccess == 'false')
    return <FirstAccess setFirstAccess={setFirstAccess} />

  else
    return (
      <>
        <NavigationContainer>
          <TabNav showSlidingAdd={showSlidingAdd} />

          <SlidingUpPanel
            allowDragging={false}
            ref={(ref: any) => setShowSlidingAdd(ref)}>
            <ButtonSheet showSlidingAdd={showSlidingAdd}>
              <ButtonSheetAdd />
            </ButtonSheet>
          </SlidingUpPanel>

        </NavigationContainer>
      </>
    )
}