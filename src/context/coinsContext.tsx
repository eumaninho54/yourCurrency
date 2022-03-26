import { View, Text } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { serviceDataCoins } from '../services/dataCoinsService'
import { flags } from '../services/flags'
import { symbols } from '../services/symbols'
import { DataCoins, currencySymbol } from '../models/dataCoinsModel'

let initialState: DataCoins[] = []

interface contextModel {
  state?: DataCoins[]
  dispatch?: React.Dispatch<dispatchAction>
}

interface dispatchAction {
  type: string
  payload: any
}

interface actionsObject {
  addCoin: (state: DataCoins[], action: dispatchAction) => DataCoins[]
  reloadCoin: (state: DataCoins[], action: dispatchAction) => DataCoins[]
}

export const CoinsContext = createContext<contextModel>({})

const actions: actionsObject = {
  addCoin(state: DataCoins[], action: dispatchAction): DataCoins[] {

    //Check for duplicate item
    Object.keys(action.payload).forEach((key: string) => {
      let bool = false
      state.forEach((object: DataCoins) => {
        if (object.code == action.payload[key].code && object.codein == action.payload[key].codein) {
          bool = true
        }
      })
      if (!bool) {
        state.push({
          image: flags[action.payload[key].codein as keyof currencySymbol],
          symbol: symbols[action.payload[key].codein as keyof currencySymbol],
          ...action.payload[key]
        })
      }
    })

    return [...state]
  },

  reloadCoin(state: DataCoins[], action: dispatchAction): DataCoins[]{
    return [...action.payload]
  }
}

export default function CoinsProvider({ children }: { children: React.ReactNode }) {

  const reducer = (state: DataCoins[], action: dispatchAction) => {
    const funcAction = actions[action.type as keyof actionsObject]
    return funcAction ? funcAction(state, action) : state
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CoinsContext.Provider value={{ state, dispatch }}>
      {children}
    </CoinsContext.Provider>
  )
}