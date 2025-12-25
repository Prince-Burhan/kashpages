import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import classNames from 'classnames'

const adminNavItems = [
  { label: 'Pages', path: '/admin/pages' },
  { label: 'Users', path: '/admin/users' }
]

export default function AdminLayout() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>
        
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="hidden md:flex flex-col gap-2 min-w-[200px]">
            {adminNavItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={classNames(
                  'px-4 py-2 rounded transition-colors',
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
