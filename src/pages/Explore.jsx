import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPublishedPages } from '../firebase/pages.service'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'

export default function Explore() {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const publishedPages = await getPublishedPages()
        setPages(publishedPages)
      } catch (err) {
        setError('Failed to load pages')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  return (
    <>
      <SeoHead
        title="Explore"
        description="Browse all published Kashmir business pages on KashPages"
        ogUrl="https://kashpages.in/explore"
      />

      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Businesses</h1>
        <p className="text-gray-600 text-lg mb-12">
          Discover amazing businesses and services from Kashmir.
        </p>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading pages...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No published pages yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map(page => (
              <Link key={page.id} to={`/${page.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="bg-gradient-to-r from-primary/20 to-blue-100 h-32 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-gray-800 text-center px-4">
                      {page.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-4">
                      {page.meta?.description || 'View this business page'}
                    </p>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded text-sm font-medium">
                      {page.plan}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
