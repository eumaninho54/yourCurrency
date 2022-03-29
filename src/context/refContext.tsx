import { createContext, useState } from "react";

interface refContextModel {
    showSlidingConvert?: any
    setShowSlidingConvert?: any
}

export const RefContext = createContext<refContextModel>({})

export default function RefProvider({ children }: { children: React.ReactNode }) {
    const [showSlidingConvert, setShowSlidingConvert] = useState(null)
  
    return (
      <RefContext.Provider value={{ showSlidingConvert, setShowSlidingConvert }}>
        {children}
      </RefContext.Provider>
    )
  }