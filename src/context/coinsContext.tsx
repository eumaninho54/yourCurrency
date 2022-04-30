import React, { createContext, useEffect, useReducer, useState } from 'react'
import { serviceDataCoins } from '../services/dataCoinsService'
import { DataCoins } from '../models/dataCoinsModel'
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  removeCoin: (state: DataCoins[], action: dispatchAction) => DataCoins[]
  rebuildCoin: (state: DataCoins[], action: dispatchAction) => DataCoins[]
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

  removeCoin(state: DataCoins[], action: dispatchAction): DataCoins[] {
    let newState = state

    newState.forEach(item => {
      if (item.codein == action.payload) {
        item.isShow = false
      }
    })

    return [...newState]
  },

  reloadCoin(state: DataCoins[], action: dispatchAction): DataCoins[] {
    let newState = action.payload['items']

    newState.forEach((item: DataCoins) => {
      action.payload['code'].forEach((code: string) => {
        if (item.codein == code) {
          item.isShow = true
        }
      })
    })

    return [...newState]
  },

  rebuildCoin(state: DataCoins[], action: dispatchAction): DataCoins[] {
    let newState = [...state]

    return [...newState]
  }

}

export default function CoinsProvider({ children }: { children: React.ReactNode }) {
  let initialState: DataCoins[] = []
  const reducer = (state: DataCoins[], action: dispatchAction) => {
    const funcAction = actions[action.type as keyof actionsObject]
    return funcAction ? funcAction(state, action) : state
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const [showCurrencys, setShowCurrencys] = useState<string[]>([])

  useEffect(() => {
    const dataApi = async () => {
      let isShowCurrencys = await AsyncStorage.getItem('@saveCurrencys')
      let array: string[] = []

      if (isShowCurrencys == 'true') {
        let json = await AsyncStorage.getItem('@showCurrencys')
        if (json != null) {
          array = await JSON.parse(json)
        }
        setShowCurrencys(array)
      }


      if (array.length != 0) {
        serviceDataCoins.getComparison(array[0], 1)
          .then(items => {
            dispatch({
              type: 'reloadCoin',
              payload: { items: items, code: array }
            })
          })
      } else {
        serviceDataCoins.getComparison('USD', 1)
          .then(items => {
            dispatch({
              type: 'reloadCoin',
              payload: { items: items, code: showCurrencys }
            })
          })
      }
    }
    dataApi()
  }, [])

  return (
    <CoinsContext.Provider value={{ state, dispatch, showCurrencys, setShowCurrencys }}>
      {children}
    </CoinsContext.Provider>
  )
}