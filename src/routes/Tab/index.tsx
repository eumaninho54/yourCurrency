import { View, Text, TouchableOpacity, GestureResponderEvent } from 'react-native'
import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../components/Home'
import Add from '../../components/ButtonSheetAdd'
import { StyleAdd, StyleTabNav, StyleCoinSelected } from './styles'
import Settings from '../../components/Settings'
import { Icon, Image } from 'react-native-elements'
import addIcon from '../../assets/add-icon1.png'

const Tab = createBottomTabNavigator()

interface CustomTabBarButton {
  children: React.ReactNode
  onPress?: ((e: GestureResponderEvent) => void) | undefined
  showSliding: any
}

const CustomTabBarButton = (props: CustomTabBarButton) => (

  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center'

    }}
    onPress={() => props.showSliding.show()}>

    <View style={{
      width: 100,
      height: 130,
      borderRadius: 60
    }}>
      {props.children}
    </View>

  </TouchableOpacity>

)

export default function TabNav({ showSliding }: { showSliding:any }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitleStyle: { fontSize: 22 },
        headerStyle: { backgroundColor: '#FEBF01' },
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

      <Tab.Screen name='Home' component={Home} options={{
        tabBarIcon: ({ focused }: any) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
            <Icon
              name='home'
              style={{}}
              color={focused ? '#FEBF01' : '#aaa'}
              size={35}
              tvParallaxProperties={{}} />
            <Text>HOME</Text>
          </View>
        )
      }} />

      <Tab.Screen name='Add' component={Home} options={{
        tabBarIcon: ({ focused }: any) => (
          <View style={StyleAdd.view}>
            <Image
              source={addIcon}
              style={StyleAdd.img}
              resizeMode='contain' />
          </View>
        ),
        tabBarButton: (props: any) => (
          <CustomTabBarButton {...props} showSliding={showSliding} />
        )

      }} />

      <Tab.Screen name='Settings' component={Settings} options={{
        tabBarIcon: ({ focused }: any) => (
          <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
            <Icon
              name='settings'
              style={{}}
              color={focused ? '#FEBF01' : '#aaa'}
              size={30}
              tvParallaxProperties={{}} />
            <Text>SETTINGS</Text>
          </View>
        )
      }} />
    </Tab.Navigator>
  )
}