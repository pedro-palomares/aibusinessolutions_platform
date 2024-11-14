import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import useStore from '../store/useStore'

const Navbar = () => {
  const { user, logout } = useStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <Disclosure as="nav" className="bg-[#212121] shadow-lg fixed w-full z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#4A90E2] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">AI</span>
                </div>
                <span className="text-2xl font-bold text-white">AIBusiness</span>
              </Link>

              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-white hover:text-[#4A90E2] font-medium text-lg transition-colors">
                  Inicio
                </Link>
                <Link to="/marketplace" className="text-white hover:text-[#4A90E2] font-medium text-lg transition-colors">
                  Marketplace
                </Link>
                {user ? (
                  <>
                    <Link to="/dashboard" className="text-white hover:text-[#4A90E2] font-medium text-lg transition-colors">
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-white hover:text-[#4A90E2] font-medium text-lg transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-white hover:text-[#4A90E2] font-medium text-lg transition-colors">
                      Iniciar Sesión
                    </Link>
                    <Link to="/register"
                      className="px-6 py-3 bg-[#4A90E2] text-white rounded-xl font-medium text-lg
                               hover:bg-[#357ABD] transition-all transform hover:scale-105">
                      Registrarse
                    </Link>
                  </>
                )}
              </div>

              <Disclosure.Button className="md:hidden p-2 rounded-lg text-white hover:bg-[#2d2d2d]">
                {open ? (
                  <XMarkIcon className="h-8 w-8" />
                ) : (
                  <Bars3Icon className="h-8 w-8" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden bg-[#2d2d2d]">
            <div className="space-y-2 px-4 py-4">
              <Link to="/" className="block px-4 py-3 text-white hover:bg-[#4A90E2] rounded-lg text-lg">
                Inicio
              </Link>
              <Link to="/marketplace" className="block px-4 py-3 text-white hover:bg-[#4A90E2] rounded-lg text-lg">
                Marketplace
              </Link>
              {user ? (
                <>
                  <Link to="/dashboard" className="block px-4 py-3 text-white hover:bg-[#4A90E2] rounded-lg text-lg">
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-white hover:bg-[#4A90E2] rounded-lg text-lg"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-3 text-white hover:bg-[#4A90E2] rounded-lg text-lg">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register"
                    className="block px-4 py-3 bg-[#4A90E2] text-white rounded-lg text-lg text-center
                             hover:bg-[#357ABD] transition-all">
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar