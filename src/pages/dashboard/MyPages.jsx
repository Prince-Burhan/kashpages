import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getUserPages } from '../../firebase/pages.service'
import { Link } from 'react-router-dom'
import Badge from '../../components/ui/Badge'
import { formatDate, isPageExpired, daysUntilExpiry } from '../../utils/date'

export default function MyPages() {
  const { user } = useAuth()
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPages = async () => {
      try {
        const userPages = await getUserPages(user.uid)
        setPages(userPages)
      } catch (error) {
        console.error('Error fetching pages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [user])

  if (loading) {
    return <div className="text-center py-8">Loading your pages...</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Landing Pages</h2>

      {pages.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">No pages yet. Contact admin to create your landing page.</p>
          <a href="mailto:burhan@kashpages.in" className="text-primary hover:underline">
            Contact Admin
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {pages.map(page => (
            <div key={page.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{page.title}</h3>
                  <a
                    href={`https://kashpages.in/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    https://kashpages.in/{page.slug}
                  </a>
                </div>
                <Badge variant={page.status === 'published' ? 'success' : 'warning'}>
                  {page.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <p className="text-gray-600">Plan</p>
                  <p className="font-medium text-gray-900">{page.plan}</p>
                </div>
                <div>
                  <p className="text-gray-600">Purchase Date</p>
                  <p className="font-medium text-gray-900">
                    {page.purchaseDate ? formatDate(page.purchaseDate) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Expiry Date</p>
                  <p className="font-medium text-gray-900">
                    {page.expiryDate ? formatDate(page.expiryDate) : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className={`font-medium ${isPageExpired(page.expiryDate) ? 'text-danger' : 'text-success'}`}>
                    {isPageExpired(page.expiryDate) ? 'Expired' : daysUntilExpiry(page.expiryDate) + ' days left'}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 text-sm">
                Status: {page.isPaid ? 'Paid ✓' : 'Pending Payment'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
