import React from 'react'

function CommissionStats({ commissions }) {
  const totalCommission = commissions.reduce((sum, comm) => sum + comm.amount, 0)
  
  const getMonthlyCommission = () => {
    const currentMonth = new Date().getMonth()
    return commissions
      .filter(comm => new Date(comm.date).getMonth() === currentMonth)
      .reduce((sum, comm) => sum + comm.amount, 0)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Commission Stats</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500">Total Commission</p>
          <p className="text-2xl font-bold text-gray-900">
            ${totalCommission.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Monthly Commission</p>
          <p className="text-2xl font-bold text-gray-900">
            ${getMonthlyCommission().toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CommissionStats