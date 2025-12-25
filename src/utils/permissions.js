export const isAdmin = (user) => {
  return user && user.role === 'admin'
}

export const isPageOwner = (page, userId) => {
  return page && page.ownerId === userId
}

export const canEditPage = (page, user) => {
  if (!user || !page) return false
  return isAdmin(user) || isPageOwner(page, user.uid)
}

export const canViewPage = (page, user) => {
  if (!page) return false
  if (page.status === 'published') return true
  if (user && isPageOwner(page, user.uid)) return true
  if (user && isAdmin(user)) return true
  return false
}
