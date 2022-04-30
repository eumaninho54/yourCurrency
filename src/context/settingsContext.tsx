import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface contextModel {
  saveCurrencys: boolean
  setSaveCurrencys: React.Dispatch<React.SetStateAction<boolean>>
}

export const SettingsContext = createContext<contextModel | null>(null)

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [saveCurrencys, setSaveCurrencys] = useState(false)

  useEffect(() => {
    const isSaveCurrencys = async () => {
      let asyncStorage = await AsyncStorage.getItem('@saveCurrencys')

      if(asyncStorage == 'true')
        setSaveCurrencys(true)
      else
        setSaveCurrencys(false)
    } 
    isSaveCurrencys()
  },[])

  return (
    <SettingsContext.Provider value={{ saveCurrencys, setSaveCurrencys }}>
      {children}
    </SettingsContext.Provider>
  )
}