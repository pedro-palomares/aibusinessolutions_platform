import React, { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  Bars3Icon,
  UserCircleIcon,
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import ProductComparison from './ProductComparison'
import ProductDetail from './ProductDetail'
import useStore from '../../store/useStore'

const Marketplace = () => {
  const { user } = useStore()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showComparison, setShowComparison] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: false },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBagIcon, current: true },
    { name: 'Red de Afiliados', href: '/affiliates', icon: UsersIcon, current: false },
    { name: 'Configuración', href: '/settings', icon: CogIcon, current: false },
  ]

  // Datos de ejemplo
  const products = [
    {
      id: 1,
      name: 'AI Image Generator Pro',
      shortDescription: 'Genera imágenes realistas con IA avanzada',
      price: 299.99,
      category: 'Visión Artificial',
      rating: 4.8,
      reviewCount: 128,
      accuracy: 98,
      tags: ['Imágenes', 'Deep Learning', 'GPU Optimized']
    },
    {
      id: 2,
      name: 'NLP Analytics Suite',
      shortDescription: 'Análisis de texto y sentimientos avanzado',
      price: 199.99,
      category: 'Procesamiento de Lenguaje',
      rating: 4.6,
      reviewCount: 89,
      accuracy: 95,
      tags: ['NLP', 'Análisis', 'API REST']
    },
    {
      id: 3,
      name: 'Business Intelligence AI',
      shortDescription: 'IA para análisis de datos empresariales',
      price: 499.99,
      category: 'Analytics y BI',
      rating: 4.9,
      reviewCount: 234,
      accuracy: 99,
      tags: ['BI', 'Machine Learning', 'Predicción']
    },
    {
      id: 4,
      name: 'Document AI Processor',
      shortDescription: 'Procesamiento automático de documentos',
      price: 349.99,
      category: 'Procesamiento Documentos',
      rating: 4.7,
      reviewCount: 156,
      accuracy: 97,
      tags: ['OCR', 'PDF', 'Automatización']
    }
  ]

  const categories = [
    'Todas las categorías',
    'Procesamiento de Lenguaje',
    'Visión Artificial',
    'Analytics y BI',
    'Procesamiento Documentos',
    'Automatización'
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

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

          {/* Search */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 items-center">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar soluciones..."
                className="h-full w-full border-0 bg-gray-700 py-0 pl-11 pr-4 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Categories */}
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === 'Todas las categorías' ? 'all' : category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === (category === 'Todas las categorías' ? 'all' : category)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          {selectedProduct ? (
            <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          ) : showComparison ? (
            <ProductComparison
              products={selectedProducts}
              onClose={() => {
                setShowComparison(false)
                setSelectedProducts([])
              }}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Marketplace