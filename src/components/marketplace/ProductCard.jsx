import React from 'react'
import { StarIcon, ArrowTrendingUpIcon, BeakerIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function ProductCard({ product, onViewDetails, isPublic = false }) {
  if (!product) return null

  const rating = product.rating || 4.5
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <div className="aspect-w-16 aspect-h-9 bg-gray-900">
        {product.demoUrl ? (
          <iframe
            src={product.demoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <BeakerIcon className="w-12 h-12" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-400">{product.shortDescription}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {product.category}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < fullStars ? (
                  <StarSolidIcon className="h-5 w-5 text-yellow-400" />
                ) : hasHalfStar && i === fullStars ? (
                  <StarIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <StarIcon className="h-5 w-5 text-gray-500" />
                )}
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-400">({product.reviewCount || 0})</span>
          </div>
          <div className="flex items-center text-emerald-400">
            <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
            <span className="text-sm font-medium">{product.accuracy || 95}% precisión</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${product.price}</span>
          {isPublic ? (
            <button 
              onClick={() => onViewDetails && onViewDetails(product)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ver Detalles
            </button>
          ) : (
            <button 
              onClick={() => onViewDetails && onViewDetails(product)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Comprar
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags && product.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductCard