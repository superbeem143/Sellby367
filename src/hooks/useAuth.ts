import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../lib/firebase'
import { getUserProfile } from '../lib/auth'
import { AuthUser } from '../types/sellby'

type AuthContextType = { user: AuthUser | null, initializing:boolean }
const AuthContext = createContext<AuthContextType>({ user: null, initializing: true })

export function AuthProvider({ children }:{ children:React.ReactNode }){
  const [user, setUser] = useState<AuthUser | null>(null)
  const [initializing, setInitializing] = useState(true)

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (u:User | null)=>{
      if(u){
        const profile = await getUserProfile(u.uid)
        setUser(profile)
      } else {
        setUser(null)
      }
      setInitializing(false)
    })
    return ()=>unsub()
  },[])

  return <AuthContext.Provider value={{ user, initializing }}>{children}</AuthContext.Provider>
}

export function useAuth(){
  return useContext(AuthContext)
}
