import React, { useState } from 'react'
import { 
  UserGroupIcon, 
  ChartBarIcon,
  LinkIcon,
  ArrowTrendingUpIcon,
  ClipboardDocumentIcon,
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

function Affiliates() {
  const { user } = useStore()
  const [copied, setCopied] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBagIcon, current: false },
    { name: 'Red de Afiliados', href: '/affiliates', icon: UsersIcon, current: true },
    { name: 'Configuración', href: '/settings', icon: CogIcon, current: false },
  ]

  const stats = [
    {
      name: 'Total Referidos',
      value: '245',
      change: '+12.5%',
      icon: UserGroupIcon,
    },
    {
      name: 'Referidos Activos',
      value: '156',
      change: '+8.2%',
      icon: ChartBarIcon,
    },
    {
      name: 'Tasa de Conversión',
      value: '24.57%',
      change: '+6.67%',
      icon: ArrowTrendingUpIcon,
    },
    {
      name: 'Comisiones Totales',
      value: '$12,456',
      change: '+54.02%',
      icon: ChartBarIcon,
    },
  ]

  const copyReferralLink = () => {
    const link = `https://aibusiness.com/ref/${user?.id}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Stats Grid */}
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

            {/* Referral Link Section */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-medium text-white mb-4">Tu Link de Referido</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <code className="text-gray-300">https://aibusiness.com/ref/{user?.id}</code>
                </div>
                <button
                  onClick={copyReferralLink}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {copied ? (
                    <CheckIcon className="h-5 w-5 mr-2" />
                  ) : (
                    <ClipboardDocumentIcon className="h-5 w-5 mr-2" />
                  )}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>

            {/* Referral Network */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-lg font-medium text-white mb-4">Tu Red de Referidos</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Referido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Comisiones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {[1, 2, 3].map((item) => (
                      <tr key={item}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                              <UserCircleIcon className="h-6 w-6 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">Usuario {item}</div>
                              <div className="text-sm text-gray-400">usuario{item}@email.com</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date().toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Activo
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          ${(Math.random() * 1000).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Affiliates