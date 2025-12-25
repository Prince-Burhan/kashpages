import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const googleProvider = new GoogleAuthProvider()

export const signUpWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    // Create user document
    await setDoc(doc(db, 'users', result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      name: result.user.displayName || 'User',
      role: 'user',
      ownedPages: [],
      createdAt: new Date()
    })
    return result.user
  } catch (error) {
    throw error
  }
}

export const signInWithEmail = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    // Check if user exists, if not create
    const userDoc = await getDoc(doc(db, 'users', result.user.uid))
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || 'User',
        role: 'user',
        ownedPages: [],
        createdAt: new Date()
      })
    }
    return result.user
  } catch (error) {
    throw error
  }
}

export const signOut = async () => {
  await firebaseSignOut(auth)
}

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}
