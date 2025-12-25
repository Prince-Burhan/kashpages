import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPages } from '../../firebase/pages.service'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import { formatDate, isPageExpired } from '../../utils/date'

export default function PagesList() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const allPages = await getAllPages()
        setPages(allPages)
      } catch (error) {
        console.error('Error fetching pages:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading pages...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Pages</h2>
        <Link to="/admin/pages/create">
          <Button>Create Page</Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Plan</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Paid</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Expiry</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map(page => (
              <tr key={page.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{page.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{page.slug}</td>
                <td className="px-6 py-4 text-sm">
                  <Badge variant={page.status === 'published' ? 'success' : page.status === 'expired' ? 'danger' : 'warning'}>
                    {page.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{page.plan}</td>
                <td className="px-6 py-4 text-sm">
                  <Badge variant={page.isPaid ? 'success' : 'warning'}>
                    {page.isPaid ? 'Yes' : 'No'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {page.expiryDate
                    ? isPageExpired(page.expiryDate)
                      ? 'Expired'
                      : formatDate(page.expiryDate)
                    : 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm space-x-2">
                  <Link to={`/admin/pages/${page.id}/edit`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
