import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../components/Home'
import { StyleAdd, StyleTabNav } from './styles'
import Settings from '../../components/Settings'
import { Icon, Image } from 'react-native-elements'
import addIcon from '../../assets/add-icon1-green.png'

const Tab = createBottomTabNavigator()

interface CustomTabBarButton {
  children: React.ReactNode
  onPress?: ((e: GestureResponderEvent) => void) | undefined
}


export default function TabNav({ showSlidingAdd }: { showSlidingAdd: any}) {

  const CustomTabBarButton = (props: CustomTabBarButton) => {

    return (

      <TouchableOpacity
        style={{
          top: -30,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => { showSlidingAdd.show() }}>

        <View style={{
          width: 100,
          height: 130,
          borderRadius: 60
        }}>
          {props.children}
        </View>

      </TouchableOpacity>

    )
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 22 },
        headerStyle: { backgroundColor: '#19a50d' },
        tabBarLabelStyle: { display: 'none' },
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...StyleTabNav.shadow
        }
      }}>

      <Tab.Screen name='Currency' component={Home} options={{
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
            <Icon
              name='home'
              style={{}}
              color={focused ? '#19a50d' : '#aaa'}
              size={35}
              tvParallaxProperties={{}} />
            <Text>HOME</Text>
          </View>
        )
      }} />

      <Tab.Screen name='Add' component={Home} options={{
        tabBarIcon: () => (
          <View style={StyleAdd.view}>
            <Image
              source={addIcon}
              style={StyleAdd.img}
              resizeMode='contain' />
          </View>
        ),
        tabBarButton: (props: any) => (
          <CustomTabBarButton {...props} />
        )

      }} />

      <Tab.Screen name='Settings' component={Settings} options={{
        tabBarIcon: ({ focused }: { focused: boolean }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
            <Icon
              name='settings'
              style={{}}
              color={focused ? '#19a50d' : '#aaa'}
              size={30}
              tvParallaxProperties={{}} />
            <Text>SETTINGS</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  )
}