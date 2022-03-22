import { View, Text } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { serviceDataCoins } from '../services/dataCoins'
import { DataCoins } from '../models/dataCoins'

let initialState = [
  {
    code: "1",
    codein: 'string',
    name: 'string',
    high: 'string',
    low: 'string',
    varBid: 'string',
    pctChange: 'string',
    bid: 'string',
    ask: 'string',
    timestamp: 'string',
    create_date: 'string'
  },
  {
    code: "2",
    codein: 'string',
    name: 'string',
    high: 'string',
    low: 'string',
    varBid: 'string',
    pctChange: 'string',
    bid: 'string',
    ask: 'string',
    timestamp: 'string',
    create_date: 'string'
  },
]


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
}

export const CoinsContext = createContext<contextModel>({})

const actions: actionsObject = {
  addCoin(state: DataCoins[], action: dispatchAction) {

    //Check for duplicate item
    Object.keys(action.payload).forEach((key: string) => {
      let bool = false
      state.forEach((object: DataCoins) => {
        if (object.code == action.payload[key].code && object.codein == action.payload[key].codein) {
          bool = true
        }
      })
      if (!bool) {
        state.push(action.payload[key])
      }
    })

    return [...state]
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