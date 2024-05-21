import { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from '../utils/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export const authContext = createContext()
const docRef = doc(db, 'usuarios', 'config')

export function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const [config, setConfig] = useState({})

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  const logout = () => {
    return signOut(auth)
  }

  const updateConfig = async (key, value) => {
    try {
      await updateDoc(docRef, { [key]: value })
    } catch (e) {
      console.log(e)
    } finally {
      getConfig()
    }
  }

  const getConfig = async () => {
    if (!user) return
    try {
      const document = await getDoc(docRef)
      setConfig(document.data())
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, currentUser => setUser(currentUser))
  }, [])

  useEffect(() => {
    getConfig()
  }, [user])

  return (
    <authContext.Provider value={{ loginWithGoogle, logout, user, updateConfig, config }}>
      {children}
    </authContext.Provider>
  )
}
