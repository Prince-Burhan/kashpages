import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'

const usersCollection = collection(db, 'users')

export const getUserById = async (userId) => {
  try {
    const docSnapshot = await getDoc(doc(usersCollection, userId))
    if (!docSnapshot.exists()) return null
    return { id: docSnapshot.id, ...docSnapshot.data() }
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

export const getPageOwner = async (ownerId) => {
  try {
    return await getUserById(ownerId)
  } catch (error) {
    console.error('Error fetching page owner:', error)
    return null
  }
}

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(query(usersCollection, orderBy('createdAt', 'desc')))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const addPageToUser = async (userId, pageId) => {
  try {
    const userRef = doc(usersCollection, userId)
    const userDoc = await getDoc(userRef)
    const ownedPages = userDoc.data().ownedPages || []
    if (!ownedPages.includes(pageId)) {
      ownedPages.push(pageId)
      await updateDoc(userRef, { ownedPages })
    }
  } catch (error) {
    console.error('Error adding page to user:', error)
    throw error
  }
}

export const removePageFromUser = async (userId, pageId) => {
  try {
    const userRef = doc(usersCollection, userId)
    const userDoc = await getDoc(userRef)
    const ownedPages = userDoc.data().ownedPages || []
    await updateDoc(userRef, {
      ownedPages: ownedPages.filter(id => id !== pageId)
    })
  } catch (error) {
    console.error('Error removing page from user:', error)
    throw error
  }
}
