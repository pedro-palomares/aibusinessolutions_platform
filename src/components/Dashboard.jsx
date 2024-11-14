import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  PlusIcon,
  UserCircleIcon,
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import ProductUpload from './ProductUpload'
import ProductList from './ProductList'
import Profile from './Profile'

function Dashboard() {
  const { user, sales, commissions } = useStore()
  const [showProductUpload, setShowProductUpload] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBagIcon, current: false },
    { name: 'Red de Afiliados', href: '/affiliates', icon: UsersIcon, current: false },
    { name: 'Configuración', href: '/settings', icon: CogIcon, current: false },
  ]

  // Datos de ejemplo
  const stats = [
    {
      name: 'Ventas Totales',
      value: sales.length || 145,
      change: '+4.75%',
      icon: ChartBarIcon,
    },
    {
      name: 'Comisiones',
      value: `$${commissions.reduce((sum, comm) => sum + comm.amount, 0) || 2450.75}`,
      change: '+54.02%',
      icon: CurrencyDollarIcon,
    },
    {
      name: 'Referidos Activos',
      value: '12',
      change: '+9.05%',
      icon: UserGroupIcon,
    },
    {
      name: 'Tasa de Conversión',
      value: '24.57%',
      change: '+6.67%',
      icon: ArrowTrendingUpIcon,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="text-xl font-bold text-white">AIBusiness</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-8 px-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-6 w-6" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={() => setShowProfile(true)}
            className="w-full flex items-center space-x-3 p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {user?.profileImage ? (
              <img src={user.profileImage} alt="" className="h-10 w-10 rounded-full" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-sm text-gray-400 truncate">{user?.role}</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 border-b border-gray-700 bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex flex-1 items-center justify-end gap-x-4">
            <div className="flex items-center space-x-4">
              {user?.role === 'PRODUCER' && (
                <button
                  type="button"
                  onClick={() => setShowProductUpload(true)}
                  className="hidden sm:flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Nuevo Producto
                </button>
              )}
            </div>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          {showProfile ? (
            <Profile onClose={() => setShowProfile(false)} />
          ) : showProductUpload ? (
            <ProductUpload onComplete={() => setShowProductUpload(false)} />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.name} className="bg-gray-800 rounded-xl p-6 border border-gray-700/50">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-400">{stat.name}</div>
                      <stat.icon className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="mt-2 text-3xl font-semibold text-white">{stat.value}</div>
                    <div className="flex items-baseline mt-4">
                      <span className="text-sm font-semibold text-emerald-400">
                        {stat.change}
                      </span>
                      <span className="ml-2 text-sm text-gray-400">vs último mes</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Products List */}
              <div className="mt-8">
                <ProductList />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default Dashboard