import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import useStore from './store/useStore'
import Navbar from './components/Navbar'
import PublicNavbar from './components/PublicNavbar'
import Footer from './components/Footer'

// Lazy load components
const Dashboard = React.lazy(() => import('./components/Dashboard'))
const Marketplace = React.lazy(() => import('./components/marketplace/Marketplace'))
const PublicMarketplace = React.lazy(() => import('./components/marketplace/PublicMarketplace'))
const Affiliates = React.lazy(() => import('./components/Affiliates'))
const Settings = React.lazy(() => import('./components/Settings'))
const Login = React.lazy(() => import('./components/Login'))
const Register = React.lazy(() => import('./components/Register'))
const Home = React.lazy(() => import('./components/Home'))

// Loading component
const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p className="mt-4 text-gray-400">Cargando...</p>
    </div>
  </div>
)

const App = () => {
  const { user } = useStore()

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {user ? <Navbar /> : <PublicNavbar />}
        <div className="flex-grow">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/dashboard" 
                element={user ? <Dashboard /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/marketplace" 
                element={user ? <Marketplace /> : <PublicMarketplace />} 
              />
              <Route 
                path="/affiliates" 
                element={user ? <Affiliates /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/settings" 
                element={user ? <Settings /> : <Navigate to="/login" />} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App