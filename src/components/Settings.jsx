import React, { useState } from 'react'
import { 
  BellIcon, 
  ShieldCheckIcon, 
  CreditCardIcon,
  GlobeAltIcon,
  EnvelopeIcon,
  Bars3Icon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import useStore from '../store/useStore'

function Settings() {
  const { user } = useStore()
  const [activeTab, setActiveTab] = useState('notifications')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBagIcon, current: false },
    { name: 'Red de Afiliados', href: '/affiliates', icon: UsersIcon, current: false },
    { name: 'Configuración', href: '/settings', icon: CogIcon, current: true },
  ]

  const tabs = [
    { id: 'notifications', name: 'Notificaciones', icon: BellIcon },
    { id: 'security', name: 'Seguridad', icon: ShieldCheckIcon },
    { id: 'billing', name: 'Facturación', icon: CreditCardIcon },
    { id: 'integrations', name: 'Integraciones', icon: GlobeAltIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="mt-8 max-w-3xl">
            <div className="space-y-6">
              <div className="bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Preferencias de Notificación</h3>
                {['Ventas', 'Nuevos referidos', 'Actualizaciones de productos', 'Noticias y ofertas'].map((item) => (
                  <div key={item} className="flex items-center justify-between py-4 border-t border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-white">{item}</p>
                      <p className="text-sm text-gray-400">Recibe notificaciones sobre {item.toLowerCase()}</p>
                    </div>
                    <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                      <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="mt-8 max-w-3xl">
            <div className="space-y-6">
              <div className="bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Seguridad de la Cuenta</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-6 w-6 text-gray-400 mr-3" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Cambiar contraseña</p>
                        <p className="text-sm text-gray-400">Actualiza tu contraseña regularmente</p>
                      </div>
                    </div>
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-700 rounded-lg hover:bg-gray-600">
                    <div className="flex items-center">
                      <CogIcon className="h-6 w-6 text-gray-400 mr-3" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Autenticación de dos factores</p>
                        <p className="text-sm text-gray-400">Añade una capa extra de seguridad</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'billing':
        return (
          <div className="mt-8 max-w-3xl">
            <div className="space-y-6">
              <div className="bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Información de Facturación</h3>
                <div className="space-y-4">
                  <div className="border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCardIcon className="h-8 w-8 text-gray-400" />
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-400">Expira 12/24</p>
                        </div>
                      </div>
                      <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div className="mt-8 max-w-3xl">
            <div className="space-y-6">
              <div className="bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Integraciones Disponibles</h3>
                <div className="grid grid-cols-1 gap-4">
                  {['Zapier', 'Slack', 'Google Analytics', 'Stripe'].map((integration) => (
                    <div key={integration} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-gray-600 flex items-center justify-center">
                          <GlobeAltIcon className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">{integration}</p>
                          <p className="text-sm text-gray-400">No conectado</p>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Conectar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case 'email':
        return (
          <div className="mt-8 max-w-3xl">
            <div className="space-y-6">
              <div className="bg-gray-800 shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">Preferencias de Email</h3>
                <div className="space-y-4">
                  {['Resumen diario', 'Resumen semanal', 'Alertas importantes', 'Boletín mensual'].map((pref) => (
                    <div key={pref} className="flex items-center justify-between py-4 border-t border-gray-700">
                      <div>
                        <p className="text-sm font-medium text-white">{pref}</p>
                        <p className="text-sm text-gray-400">Recibe {pref.toLowerCase()} por email</p>
                      </div>
                      <button className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-blue-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        <span className="translate-x-5 inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
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
          {/* Tabs */}
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center py-4 px-1 border-b-2 text-sm font-medium
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
                  `}
                >
                  <tab.icon className="h-5 w-5 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </main>
      </div>
    </div>
  )
}

export default Settings