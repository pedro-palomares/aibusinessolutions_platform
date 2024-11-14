import React from 'react'
import useStore from '../store/useStore'

function PlatformCommissions() {
  const { sales } = useStore()
  
  const platformFee = 0.1 // 10%
  const totalPlatformCommission = sales.reduce((sum, sale) => sum + (sale.amount * platformFee), 0)
  
  const getMonthlyPlatformCommission = () => {
    const currentMonth = new Date().getMonth()
    return sales
      .filter(sale => new Date(sale.date).getMonth() === currentMonth)
      .reduce((sum, sale) => sum + (sale.amount * platformFee), 0)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Comisiones de la Plataforma</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Comisión Total (10%)</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalPlatformCommission.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Comisión Mensual</p>
          <p className="text-2xl font-bold text-gray-900">
            ${getMonthlyPlatformCommission().toFixed(2)}
          </p>
        </div>
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            La plataforma cobra un 10% de comisión sobre todas las ventas antes de distribuir las comisiones a los roles.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PlatformCommissions