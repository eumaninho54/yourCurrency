import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from 'react-native-onboarding-swiper';
import { Icon, Image } from 'react-native-elements'
import addIcon from '../../assets/add-icon1-green.png'


export default function FirstAccess({ setFirstAccess }: { setFirstAccess: React.Dispatch<React.SetStateAction<string>> }) {

  const onFinish = async () => {
    await AsyncStorage.setItem('@firstAccess', 'true')

    setFirstAccess('true')
  }

  return (
    <Onboarding
      onSkip={onFinish}
      onDone={onFinish}
      pages={[
        {
          backgroundColor: '#fff',
          image: <Icon 
                    name='home'
                    color={'#19a50d'}
                    size={230}
                    tvParallaxProperties={{}} />,
          title: 'Conversion',
          subtitle: 'Make multiple conversions with the desired value',
        },

        {
          backgroundColor: '#fff',
          image: <Image
                    source={addIcon}
                    style={{width: 230, height: 230}}
                    resizeMode='contain' />,
          title: 'Add and remove',
          subtitle: 'Add remove coins to your list',
        },

        {
          backgroundColor: '#fff',
          image: <Icon 
                    name='settings'
                    color={'#19a50d'}
                    size={230}
                    tvParallaxProperties={{}} />,
          title: 'Configure the app',
          subtitle: 'Various settings to customize your app',
        },
      ]}
    />
  )
}
