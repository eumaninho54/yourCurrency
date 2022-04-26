import { View, Text } from 'react-native'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import { serviceDataCoins } from '../services/dataCoinsService'
import { flags } from '../services/flags'
import { symbols } from '../services/symbols'
import { DataCoins, currencySymbol, alphabetList } from '../models/dataCoinsModel'
import { nameCurrency } from '../services/nameCurrency'

let initialState2: DataCoins[] = [
  {
    code: 'USD',
    codein: 'USD',
    high: '1.00',
    image: "https://cdn-icons-png.flaticon.com/512/3909/3909383.png",
    name: 'Dólar/Dólar Americano',
    selected: true,
    symbol: "US$",
    isShow: true
  },
  {
    code: 'USD',
    codein: 'BRL',
    high: '4.75',
    image: "https://cdn-icons-png.flaticon.com/512/3909/3909370.png",
    name: 'Dólar/Real Brasileiro',
    selected: false,
    symbol: "R$",
    isShow: true
  },
  {
    code: 'USD',
    codein: 'EUR',
    high: '0.94',
    image: "https://cdn-icons-png.flaticon.com/512/323/323344.png",
    name: 'Dólar/Euro',
    selected: false,
    symbol: "€",
    isShow: true
  }

]

interface contextModel {
  state: DataCoins[]
  dispatch: React.Dispatch<dispatchAction>
  showCurrencys: string[]
  setShowCurrencys: React.Dispatch<React.SetStateAction<string[]>>
}

interface dispatchAction {
  type: string
  payload: any
}

interface actionsObject {
  addCoin: (state: DataCoins[], action: dispatchAction) => DataCoins[]
  reloadCoin: (state: DataCoins[], action: dispatchAction) => DataCoins[]
}

export const CoinsContext = createContext<contextModel | null>(null)

const actions: actionsObject = {

  addCoin(state: DataCoins[], action: dispatchAction): DataCoins[] {
    let newState = state
    
    newState.forEach(item => {
      if (item.codein == action.payload) {
        item.isShow = true
      }
    })
    
    return [...newState]
  },

  reloadCoin(state: DataCoins[], action: dispatchAction): DataCoins[] {
    let newState = action.payload['items']
    
    newState.forEach((item: DataCoins) => {
      action.payload['code'].forEach((code: string) => {
        if(item.codein == code){
          item.isShow = true
        }
      })
    })
  
    return [...newState]
  },
}

export default function CoinsProvider({ children }: { children: React.ReactNode }) {
  let initialState: DataCoins[] = []
  const reducer = (state: DataCoins[], action: dispatchAction) => {
    const funcAction = actions[action.type as keyof actionsObject]
    return funcAction ? funcAction(state, action) : state
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [showCurrencys, setShowCurrencys] = useState(['BRL', 'USD', 'EUR'])

  useEffect(() => {
    serviceDataCoins.getComparison('USD', 1)
      .then(items => {
        dispatch({
          type: 'reloadCoin',
          payload: {items: items, code: showCurrencys}
        })
      })
  }, [])

  return (
    <CoinsContext.Provider value={{ state, dispatch, showCurrencys, setShowCurrencys }}>
      {children}
    </CoinsContext.Provider>
  )
}