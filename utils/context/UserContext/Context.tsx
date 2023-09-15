import { User } from "@/db"
import React from "react"

interface UserContextValues {
  user: User;
  setuser:React.Dispatch<React.SetStateAction>
}

const UserContext = React.createContext<UserContextValues>({
  user:null
})

export const useUser = () => React.useContext(UserContext)
export const UserContextProvider = UserContext.Provider
export const UserContextConsumer = UserContext.Consumer
