import { Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const {height: SCREEN_HEIGHT} = Dimensions.get('window')

export const StyleAdd = StyleSheet.create({
    container: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT / 3,
        borderRadius: 25,
    },

    line: {
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    }
})