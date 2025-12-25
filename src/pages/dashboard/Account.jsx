import { useAuth } from '../../hooks/useAuth'
import { formatDate } from '../../utils/date'

export default function Account() {
  const { userProfile } = useAuth()

  if (!userProfile) {
    return <div>Loading account details...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>

      <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <p className="text-gray-900 font-medium">{userProfile.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <p className="text-gray-900 font-medium">{userProfile.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <p className="text-gray-900 font-medium capitalize">{userProfile.role}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
            <p className="text-gray-900 font-medium">{formatDate(userProfile.createdAt)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Owned Pages</label>
            <p className="text-gray-900 font-medium">{userProfile.ownedPages?.length || 0} pages</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            For account changes or support, please contact admin at{' '}
            <a href="mailto:burhan@kashpages.in" className="text-primary hover:underline">
              burhan@kashpages.in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
