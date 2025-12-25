import { useAuth } from './useAuth'

export const useAdmin = () => {
  const { isAdmin, userProfile, loading } = useAuth()

  return {
    isAdmin,
    adminUser: isAdmin ? userProfile : null,
    adminLoading: loading
  }
}
