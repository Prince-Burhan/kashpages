import { format, isAfter, isBefore, addDays } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return format(d, 'MMM dd, yyyy')
}

export const formatDateLong = (date) => {
  if (!date) return ''
  const d = date.toDate ? date.toDate() : new Date(date)
  return format(d, 'EEEE, MMMM dd, yyyy')
}

export const isPageExpired = (expiryDate) => {
  if (!expiryDate) return false
  const expiry = expiryDate.toDate ? expiryDate.toDate() : new Date(expiryDate)
  return isBefore(expiry, new Date())
}

export const daysUntilExpiry = (expiryDate) => {
  if (!expiryDate) return null
  const expiry = expiryDate.toDate ? expiryDate.toDate() : new Date(expiryDate)
  const today = new Date()
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))
}
