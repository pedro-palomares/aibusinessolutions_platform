import React from 'react'
import { ShieldCheckIcon, BeakerIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

const badges = {
  verified: {
    icon: ShieldCheckIcon,
    label: 'Verificado',
    color: 'text-blue-400 bg-blue-400/10'
  },
  expert: {
    icon: AcademicCapIcon,
    label: 'Experto',
    color: 'text-purple-400 bg-purple-400/10'
  },
  innovator: {
    icon: BeakerIcon,
    label: 'Innovador',
    color: 'text-emerald-400 bg-emerald-400/10'
  }
}

function VerificationBadge({ type, className = '' }) {
  const badge = badges[type]
  if (!badge) return null

  const { icon: Icon, label, color } = badge

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}>
      <Icon className="w-4 h-4 mr-1" />
      {label}
    </div>
  )
}

export default VerificationBadge