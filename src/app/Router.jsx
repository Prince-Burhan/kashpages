import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

// Layouts
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

// Pages
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'

// Landing
import LandingRenderer from '../pages/landing/LandingRenderer'

// Dashboard
import DashboardLayout from '../pages/dashboard/DashboardLayout'
import MyPages from '../pages/dashboard/MyPages'
import PlanDetails from '../pages/dashboard/PlanDetails'
import Account from '../pages/dashboard/Account'

// Admin
import AdminLayout from '../pages/admin/AdminLayout'
import PagesList from '../pages/admin/PagesList'
import Users from '../pages/admin/Users'

const PageWrapper = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/explore"
          element={
            <PageWrapper>
              <Explore />
            </PageWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/:businessSlug"
          element={<LandingRenderer />}
        />

        {/* Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to="pages" replace />} />
          <Route path="pages" element={<MyPages />} />
          <Route path="plans" element={<PlanDetails />} />
          <Route path="account" element={<Account />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Navigate to="pages" replace />} />
          <Route path="pages" element={<PagesList />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
