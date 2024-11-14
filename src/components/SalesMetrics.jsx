import React from 'react'

function SalesMetrics({ sales }) {
  const totalSales = sales.length
  const directSales = sales.filter(sale => sale.isDirectSale).length
  const indirectSales = totalSales - directSales

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Metrics</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Direct Sales</p>
          <p className="text-2xl font-bold text-gray-900">{directSales}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Indirect Sales</p>
          <p className="text-2xl font-bold text-gray-900">{indirectSales}</p>
        </div>
      </div>
    </div>
  )
}

export default SalesMetrics