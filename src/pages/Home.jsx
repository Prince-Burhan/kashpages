import { Link } from 'react-router-dom'
import SeoHead from '../components/seo/SeoHead'
import Button from '../components/ui/Button'
import { PLAN_DETAILS } from '../utils/constants'

export default function Home() {
  return (
    <>
      <SeoHead
        title="KashPages"
        description="Contact-based landing page publishing platform for Kashmir businesses"
        keywords={['Kashmir businesses', 'landing pages', 'contact-based', 'KashPages']}
      />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-r from-primary/10 to-blue-100 py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              KashPages
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Trusted landing page publishing platform for Kashmir businesses.
            </p>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              No e-commerce. No online payments. No bookings. Pure contact-based leads via phone,
              WhatsApp, Instagram, Google Maps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg">Explore Pages</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Why KashPages?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Easy to Manage</h3>
                <p className="text-gray-600">
                  Admin-managed landing pages. No self-edit complexity. Professional presentation
                  every time.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">SEO-Ready</h3>
                <p className="text-gray-600">
                  Every page is optimized for search engines. Proper meta tags, sitemap, and
                  robots.txt included.
                </p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Contact-Based</h3>
                <p className="text-gray-600">
                  Direct contact options: phone, WhatsApp, Instagram, Google Maps. No payment
                  gatewaysneeded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Plans & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(PLAN_DETAILS).map(([key, plan]) => (
                <div key={key} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-3xl font-bold text-primary mb-1">{plan.price}</p>
                  <p className="text-gray-600 mb-6">{plan.period}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full">
                    Contact Admin
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Page?</h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us to create a professional landing page for your Kashmir business.
            </p>
            <a href="mailto:burhan@kashpages.in" className="inline-block">
              <Button variant="secondary" size="lg">
                Contact Admin
              </Button>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
