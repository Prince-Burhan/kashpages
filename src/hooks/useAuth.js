import { useState, useEffect, useCallback } from 'react'
import { onAuthStateChange } from '../firebase/auth'
import { getUserById } from '../firebase/users.service'

export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser)
          const profile = await getUserById(firebaseUser.uid)
          setUserProfile(profile)
        } else {
          setUser(null)
          setUserProfile(null)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  const isAdmin = useCallback(() => {
    return userProfile && userProfile.role === 'admin'
  }, [userProfile])

  return {
    user,
    userProfile,
    loading,
    error,
    isAdmin: isAdmin()
  }
}
