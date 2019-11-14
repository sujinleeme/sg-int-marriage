import React, { useContext } from "react"

export const StateContext = React.createContext()

export const useStore = () => useContext(StateContext)
