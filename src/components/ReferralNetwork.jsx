import React from 'react'
import useStore from '../store/useStore'

function ReferralNetwork() {
  const { user, referrals } = useStore()
  
  const salesNeededForCloser = user?.role === 'SETTER' ? 2 - referrals.length : 0

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Referral Network</h2>
      {user?.role === 'SETTER' && salesNeededForCloser > 0 && (
        <div className="mb-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-700">
            {salesNeededForCloser} more sales needed to become a Closer
          </p>
        </div>
      )}
      <div className="space-y-4">
        {referrals.map((referral) => (
          <div key={referral.id} className="p-4 border rounded-md">
            <p className="font-medium">{referral.name}</p>
            <p className="text-sm text-gray-500">Sales: {referral.sales}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReferralNetwork