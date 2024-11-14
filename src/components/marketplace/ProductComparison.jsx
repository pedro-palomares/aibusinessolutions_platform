import React from 'react'
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'

function ProductComparison({ products, onClose }) {
  const features = [
    'Precisión',
    'Tiempo de respuesta',
    'API REST',
    'SDK',
    'Soporte 24/7',
    'Personalización',
    'Implementación on-premise',
    'SLA garantizado'
  ]

  return (
    <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Comparación de Soluciones</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Característica
              </th>
              {products.map(product => (
                <th key={product.id} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {product.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                Precio
              </td>
              {products.map(product => (
                <td key={product.id} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  ${product.price}
                </td>
              ))}
            </tr>
            {features.map((feature, index) => (
              <tr key={feature} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-750'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {feature}
                </td>
                {products.map(product => (
                  <td key={product.id} className="px-6 py-4 whitespace-nowrap text-sm text-white">
                    {Math.random() > 0.3 ? (
                      <CheckIcon className="h-5 w-5 text-green-400" />
                    ) : (
                      <XMarkIcon className="h-5 w-5 text-red-400" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="bg-gray-700/50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-300">{product.shortDescription}</p>
            <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductComparison