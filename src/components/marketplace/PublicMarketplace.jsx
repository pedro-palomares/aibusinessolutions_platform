import React, { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import ProductDetail from './ProductDetail'
import ProductComparison from './ProductComparison'

const PublicMarketplace = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showComparison, setShowComparison] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    'Todas las categorías',
    'Procesamiento de Lenguaje',
    'Visión Artificial',
    'Analytics y BI',
    'Procesamiento Documentos',
    'Automatización'
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-2xl font-bold text-white">AIBusiness</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white hover:text-blue-400">
                Iniciar Sesión
              </Link>
              <Link 
                to="/register"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="py-4">
            <div className="relative max-w-3xl mx-auto">
              <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="search"
                placeholder="Buscar soluciones de IA..."
                className="w-full h-12 pl-11 pr-4 rounded-lg bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content - Increased top padding from pt-32 to pt-40 */}
      <main className="pt-40 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

        {/* Products Display */}
        {selectedProduct ? (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)}
            isPublic={true}
          />
        ) : showComparison ? (
          <ProductComparison
            products={selectedProducts}
            onClose={() => {
              setShowComparison(false)
              setSelectedProducts([])
            }}
            isPublic={true}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={() => setSelectedProduct(product)}
                isPublic={true}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default PublicMarketplace