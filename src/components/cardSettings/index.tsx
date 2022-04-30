import { View, Text } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-elements';
import { cardSettings } from './styles';
import { Icon } from 'react-native-elements'

interface CardSettingsModel {
  onActived: any
  title: string
  description: string
  valueSwitch: boolean
  type: 'switch' | 'arrow'
}

export default function CardSettings({onActived, title, description, valueSwitch, type}: CardSettingsModel) {
  return (
    <View style={cardSettings.content}>
      <Text style={cardSettings.title}>{title}</Text>

      <View style={cardSettings.info}>
        <Text style={cardSettings.description}>{description}</Text>

        {type == 'switch'
        ? <Switch 
            trackColor={{true: '#19a50d', false: '#c0c0c0'}}
            thumbColor='#fff'
            color='green' 
            value={valueSwitch} 
            onChange={onActived} />
        : <Icon 
            name='arrow-forward'
            color={'#c0c0c0'}
            size={30}
            tvParallaxProperties={{}} 
            onPress={() => onActived()}/>
        }
        
      </View>
    </View>
  )
}