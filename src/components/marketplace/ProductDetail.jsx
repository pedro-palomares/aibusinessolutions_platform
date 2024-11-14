import React from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

function ProductDetail({ product, onClose, isPublic = false }) {
  return (
    <div className="mt-8 bg-gray-800 rounded-xl p-8 border border-gray-700/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{product.name}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg overflow-hidden">
            {product.demoUrl ? (
              <iframe
                src={product.demoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                Demo no disponible
              </div>
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-white mb-4">Características Principales</h3>
            <ul className="space-y-3">
              {['API REST', 'SDK disponible', 'Soporte 24/7', 'Implementación on-premise'].map((feature) => (
                <li key={feature} className="flex items-center text-gray-300">
                  <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="bg-gray-700/50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-white">${product.price}</span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {product.category}
              </span>
            </div>
            {isPublic ? (
              <Link 
                to="/register"
                className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors"
              >
                Registrarse para Comprar
              </Link>
            ) : (
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Comprar Ahora
              </button>
            )}
          </div>

          <div className="prose prose-invert">
            <h3 className="text-lg font-medium text-white mb-4">Descripción</h3>
            <p className="text-gray-300">
              {product.shortDescription}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <h3 className="text-lg font-medium text-white mt-6 mb-4">Especificaciones Técnicas</h3>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Precisión</dt>
                  <dd className="text-white">{product.accuracy}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Tiempo de respuesta</dt>
                  <dd className="text-white">&lt; 100ms</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Llamadas API/mes</dt>
                  <dd className="text-white">100,000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">SLA</dt>
                  <dd className="text-white">99.9%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail