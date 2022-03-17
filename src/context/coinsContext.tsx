import { View, Text } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { dataCoins } from '../services/dataCoins'
import { DataCoins } from '../models/dataCoins'

const initialState = { dataCoins }
export const CoinsContext: React.Context<{}> = createContext({})

interface CoinsProviderProps {
  children: React.ReactNode
}

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
  payload: DataCoins
}

interface dispatchState {
  dataCoins: DataCoins[]
}

interface actionsObject {
  createCoin: (state: dispatchState, action: dispatchAction) => dispatchState
  deleteUser: (state: dispatchState, action: dispatchAction) => dispatchState
}



const actions: actionsObject   = {
   createCoin(state: dispatchState, action: dispatchAction): dispatchState {
    const coin = action.payload
    coin.id = Math.random()
    return {
      ...state,
      dataCoins: [...state.dataCoins, coin]
    }
  },

  deleteUser(state: dispatchState, action: dispatchAction): dispatchState {
    const coin = action.payload
    return {
      ...state,
      dataCoins: state.dataCoins.filter((c: { id: number }) => c.id !== coin.id)
    }
  }
}

export default function CoinsProvider(props: CoinsProviderProps) {

  const reducer = (state: dispatchState, action: dispatchAction): dispatchState => {
    let funcAction =  actions[action.type as keyof actionsObject] 
    return funcAction ? funcAction(state, action) : state
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <CoinsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </CoinsContext.Provider>
  )
}