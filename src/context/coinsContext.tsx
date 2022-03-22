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


interface dispatchProps {
  state: {
    dataCoins: DataCoins[]
  }
  action: {
    type: string
    payload: DataCoins
  }
}

interface dispatchAction {
  type: string
  payload: DataCoins[]
}

interface actionsObject {
  addCoin: (state: any, action: any) => any
}

export const CoinsContext = createContext<any>([])

const actions: actionsObject = {
  addCoin(state: any, action: any) {

    //Check for duplicate item
    Object.keys(action.payload).forEach((key) => {
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

  const reducer = (state: any, action: any) => {
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