import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import classNames from 'classnames'

const navItems = [
  { label: 'My Pages', path: '/dashboard/pages' },
  { label: 'Plans', path: '/dashboard/plans' },
  { label: 'Account', path: '/dashboard/account' }
]

export default function DashboardLayout() {
  const location = useLocation()

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 min-h-screen">
        <div className="flex gap-8">
          {/* Sidebar */}
          <nav className="hidden md:flex flex-col gap-2 min-w-[200px]">
            {navItems.map(item => (
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
