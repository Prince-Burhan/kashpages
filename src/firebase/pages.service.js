import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from './firebase'

const pagesCollection = collection(db, 'pages')

export const createPage = async (pageData) => {
  try {
    const docRef = await addDoc(pagesCollection, {
      ...pageData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: 'draft',
      isPaid: false
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating page:', error)
    throw error
  }
}

export const updatePage = async (pageId, updates) => {
  try {
    await updateDoc(doc(pagesCollection, pageId), {
      ...updates,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error('Error updating page:', error)
    throw error
  }
}

export const setPaymentStatus = async (pageId, isPaid, purchaseDate, expiryDate) => {
  try {
    await updateDoc(doc(pagesCollection, pageId), {
      isPaid,
      purchaseDate,
      expiryDate,
      lastPaymentUpdatedAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error('Error updating payment status:', error)
    throw error
  }
}

export const publishPage = async (pageId, isPaid = false) => {
  try {
    await updateDoc(doc(pagesCollection, pageId), {
      status: 'published',
      isPaid,
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error('Error publishing page:', error)
    throw error
  }
}

export const unpublishPage = async (pageId) => {
  try {
    await updateDoc(doc(pagesCollection, pageId), {
      status: 'draft',
      updatedAt: Timestamp.now()
    })
  } catch (error) {
    console.error('Error unpublishing page:', error)
    throw error
  }
}

export const getPageBySlug = async (slug) => {
  try {
    const q = query(pagesCollection, where('slug', '==', slug))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.empty) return null
    const doc = querySnapshot.docs[0]
    return { id: doc.id, ...doc.data() }
  } catch (error) {
    console.error('Error fetching page:', error)
    throw error
  }
}

export const getPageById = async (pageId) => {
  try {
    const docSnapshot = await getDoc(doc(pagesCollection, pageId))
    if (!docSnapshot.exists()) return null
    return { id: docSnapshot.id, ...docSnapshot.data() }
  } catch (error) {
    console.error('Error fetching page:', error)
    throw error
  }
}

export const getUserPages = async (userId) => {
  try {
    const q = query(pagesCollection, where('ownerId', '==', userId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching user pages:', error)
    throw error
  }
}

export const getPublishedPages = async () => {
  try {
    const q = query(pagesCollection, where('status', '==', 'published'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching published pages:', error)
    throw error
  }
}

export const getAllPages = async () => {
  try {
    const querySnapshot = await getDocs(query(pagesCollection, orderBy('createdAt', 'desc')))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    console.error('Error fetching pages:', error)
    throw error
  }
}

export const deletePage = async (pageId) => {
  try {
    await deleteDoc(doc(pagesCollection, pageId))
  } catch (error) {
    console.error('Error deleting page:', error)
    throw error
  }
}

export const checkSlugExists = async (slug) => {
  try {
    const q = query(pagesCollection, where('slug', '==', slug))
    const querySnapshot = await getDocs(q)
    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking slug:', error)
    throw error
  }
}
