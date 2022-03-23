import { StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

export const StyleHome = styled.View`
    flex: 1;
`

export const RenderItem = StyleSheet.create({
    bg: {
        flexDirection: 'row',
        margin: 15,
        justifyContent: 'space-between'
    },

    content: {
        marginLeft: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },

    nameCurrency: {
        marginLeft: 15

    },

    valueCurrency: {
        backgroundColor: '#FEBF01',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6,
        height: 30,
        borderRadius: 7
    }
})
