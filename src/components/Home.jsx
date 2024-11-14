import React from 'react'
import { Link } from 'react-router-dom'
import { SparklesIcon, UserGroupIcon, ChartBarIcon } from '@heroicons/react/24/outline'

function Home() {
  const features = [
    {
      name: 'Productores de IA',
      description: 'Obtén el 90% de tus ventas directas y 45% de las indirectas',
      icon: SparklesIcon,
    },
    {
      name: 'Red de Afiliados',
      description: 'Evoluciona de Setter a Closer y gana hasta 50% de comisión',
      icon: UserGroupIcon,
    },
    {
      name: 'Analytics Avanzado',
      description: 'Dashboard completo con métricas en tiempo real',
      icon: ChartBarIcon,
    },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-indigo-600/30 backdrop-blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Monetiza tus soluciones de IA
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              La primera plataforma que conecta creadores de soluciones IA 
              con una red profesional de ventas
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-all duration-300"
              >
                Empezar ahora
              </Link>
              <Link
                to="/marketplace"
                className="rounded-xl px-8 py-4 text-base font-semibold text-white ring-2 ring-white/80 hover:bg-white/10 transition-all duration-300"
              >
                Explorar Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 sm:py-32 bg-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              La forma más inteligente de vender IA
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Maximiza tus ingresos como productor de soluciones IA o como parte de nuestra red de ventas
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                      <feature.icon className="h-7 w-7 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-300">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿Listo para empezar?
            </h2>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-all duration-300"
              >
                Crear cuenta
              </Link>
              <Link
                to="/marketplace"
                className="rounded-xl px-8 py-4 text-base font-semibold text-white ring-2 ring-white/80 hover:bg-white/10 transition-all duration-300"
              >
                Explorar Marketplace
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home