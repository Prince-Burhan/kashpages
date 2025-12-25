import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPageBySlug } from '../../firebase/pages.service'
import { getPageOwner } from '../../firebase/users.service'
import { useAuth } from '../../hooks/useAuth'
import SeoHead from '../../components/seo/SeoHead'
import TemporaryNotice from '../../components/notices/TemporaryNotice'
import ContactBar from '../../components/landing/ContactBar'
import HtmlRenderer from '../../components/landing/HtmlRenderer'
import { isPageExpired } from '../../utils/date'

export default function LandingRenderer() {
  const { businessSlug } = useParams()
  const { user } = useAuth()
  const [page, setPage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showTemporaryNotice, setShowTemporaryNotice] = useState(false)
  const [owner, setOwner] = useState(null)

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const fetchedPage = await getPageBySlug(businessSlug)

        if (!fetchedPage) {
          setError('Page not found')
          setLoading(false)
          return
        }

        // Check if page can be viewed
        const isPublished = fetchedPage.status === 'published'
        const isOwner = user && fetchedPage.ownerId === user.uid
        const isAdmin = user?.role === 'admin' // Assuming this is set in user

        if (!isPublished && !isOwner && !isAdmin) {
          setError('Page not available')
          setLoading(false)
          return
        }

        // Check if published but unpaid
        if (isPublished && !fetchedPage.isPaid && !isOwner && !isAdmin) {
          setShowTemporaryNotice(true)
        }

        // Check if expired
        if (isPageExpired(fetchedPage.expiryDate)) {
          setError('This page has expired')
          setLoading(false)
          return
        }

        const owner = await getPageOwner(fetchedPage.ownerId)
        setOwner(owner)
        setPage(fetchedPage)
      } catch (err) {
        setError('Error loading page')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPage()
  }, [businessSlug, user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading page...</p>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-danger">{error || 'Page not found'}</p>
      </div>
    )
  }

  return (
    <>
      <SeoHead
        title={page.meta?.title || page.title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        ogImage={page.meta?.ogImage}
        ogUrl={`https://kashpages.in/${page.slug}`}
      />

      <TemporaryNotice
        isOpen={showTemporaryNotice}
        onClose={() => setShowTemporaryNotice(false)}
        ownerEmail={owner?.email}
      />

      <div className="pb-20">
        <HtmlRenderer htmlContent={page.html} />
      </div>

      {page.meta?.phone || page.meta?.whatsapp || page.meta?.instagram || page.meta?.mapUrl ? (
        <ContactBar
          phone={page.meta?.phone}
          whatsapp={page.meta?.whatsapp}
          instagram={page.meta?.instagram}
          mapUrl={page.meta?.mapUrl}
        />
      ) : null}
    </>
  )
}
