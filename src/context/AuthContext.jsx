import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../firebase/config'
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if (userDoc.exists()) {
                    const userData = userDoc.data()
                    setUser({ ...currentUser, ...userData })
                    setRole(userData.role)
                } else {
                    // If Google login and no doc exists, create one
                    const userData = {
                        uid: currentUser.uid,
                        name: currentUser.displayName || 'Staff Member',
                        email: currentUser.email,
                        phone: currentUser.phoneNumber || '',
                        role: 'staff',
                        createdAt: serverTimestamp()
                    }
                    await setDoc(doc(db, 'users', currentUser.uid), userData)
                    setUser({ ...currentUser, ...userData })
                    setRole('staff')
                }
            } else {
                setUser(null)
                setRole(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signup = async (email, password, name, phone, secretCode) => {
        let role = ''

        if (secretCode === '#AdminAkothee') {
            role = 'admin'
        } else if (secretCode === '#FikaPlaces') {
            role = 'staff'
        } else {
            throw new Error('Invalid Secret Code. Access Denied.')
        }

        const res = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'users', res.user.uid), {
            uid: res.user.uid,
            name,
            email,
            phone,
            role,
            createdAt: serverTimestamp()
        })
        return res.user
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const loginWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        return signInWithPopup(auth, provider)
    }

    const logout = () => {
        return signOut(auth)
    }

    const value = {
        user,
        role,
        signup,
        login,
        loginWithGoogle,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
