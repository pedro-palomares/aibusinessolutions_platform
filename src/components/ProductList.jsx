import React from 'react'
import { CloudArrowDownIcon, PlayIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

function ProductList({ products, type = 'purchased' }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-medium text-white mb-6">
        {type === 'purchased' ? 'Productos Comprados' : 'Mis Productos'}
      </h3>
      
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-700/50 rounded-lg p-6 border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-medium text-white">{product.title}</h4>
                  <p className="mt-1 text-sm text-gray-400">{product.description}</p>
                </div>
                {type === 'uploaded' && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Activo
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                {product.videoUrl && (
                  <button
                    className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => window.open(product.videoUrl, '_blank')}
                  >
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Ver Tutorial
                  </button>
                )}
                
                {product.downloadUrl && (
                  <button
                    className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => window.open(product.downloadUrl, '_blank')}
                  >
                    <CloudArrowDownIcon className="mr-2 h-5 w-5" />
                    Descargar
                  </button>
                )}

                <button
                  className="inline-flex items-center px-4 py-2 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {/* Mostrar instrucciones */}}
                >
                  <DocumentTextIcon className="mr-2 h-5 w-5" />
                  Instrucciones
                </button>

                {type === 'uploaded' && (
                  <button
                    className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {/* Copiar enlace de afiliado */}}
                  >
                    Copiar Link de Afiliado
                  </button>
                )}
              </div>

              {type === 'uploaded' && (
                <div className="mt-4 border-t border-gray-600 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Ventas Totales</span>
                    <span className="text-white font-medium">{product.totalSales || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-400">Ingresos Generados</span>
                    <span className="text-white font-medium">
                      ${product.totalRevenue?.toFixed(2) || '0.00'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">
            {type === 'purchased' 
              ? 'Aún no has comprado ningún producto' 
              : 'Aún no has subido ningún producto'}
          </p>
          {type === 'uploaded' && (
            <button
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {/* Mostrar formulario de subida */}}
            >
              Subir mi primer producto
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default ProductList