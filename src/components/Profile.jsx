import React, { useState, useRef } from 'react'
import useStore from '../store/useStore'
import { XMarkIcon, CameraIcon } from '@heroicons/react/24/outline'

function Profile({ onClose }) {
  const { user, updateUserProfile, updateProfileImage } = useStore()
  const fileInputRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    bio: user?.bio || ''
  })

  const getRoleName = (role) => {
    switch (role) {
      case 'PRODUCER':
        return 'Productor'
      case 'SETTER':
        return 'Setter'
      case 'CLOSER':
        return 'Closer'
      default:
        return role
    }
  }

  const getRoleDescription = (role) => {
    switch (role) {
      case 'PRODUCER':
        return 'Creas y vendes tus propias soluciones de IA. Obtienes el 90% de las ventas directas y 45% de las indirectas.'
      case 'SETTER':
        return 'Generas leads y referencias. Ganas 25% de comisión en ventas directas.'
      case 'CLOSER':
        return 'Cierras ventas y ganas mayores comisiones. 50% en ventas directas y 25% en indirectas.'
      default:
        return ''
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        // En un entorno real, aquí subiríamos la imagen a un servidor
        // y obtendríamos una URL permanente
        updateProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateUserProfile(formData)
    onClose()
  }

  return (
    <div className="bg-gray-800 rounded-xl p-8 border border-gray-700/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Mi Perfil</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-8">
          <div className="relative group">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <CameraIcon className="h-8 w-8" />
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 w-full h-full rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <CameraIcon className="h-6 w-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="flex-1">
            <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    Rol: <span className="text-blue-400">{getRoleName(user?.role)}</span>
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {getRoleDescription(user?.role)}
                  </p>
                </div>
                <div className="bg-blue-500/10 px-4 py-2 rounded-full">
                  <span className="text-blue-400 font-medium">{getRoleName(user?.role)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Nombre completo
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Teléfono
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-300">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
            Biografía
          </label>
          <textarea
            id="bio"
            rows={4}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile