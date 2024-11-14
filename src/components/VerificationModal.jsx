import React, { useState } from 'react'
import { XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline'
import useStore from '../store/useStore'

function VerificationModal({ onClose }) {
  const { user, updateVerificationStatus } = useStore()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    linkedIn: '',
    experience: '',
    expertise: [],
    documents: []
  })

  const expertiseOptions = [
    'Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Robotics',
    'Data Science',
    'Deep Learning'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }
    
    // Simular envío y aprobación
    updateVerificationStatus('pending')
    onClose()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Sitio Web
              </label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">
                LinkedIn
              </label>
              <input
                type="url"
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={formData.linkedIn}
                onChange={(e) => setFormData({...formData, linkedIn: e.target.value})}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Experiencia en IA
              </label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                placeholder="Describe tu experiencia en el campo de la IA..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Áreas de Expertise
              </label>
              <div className="grid grid-cols-2 gap-2">
                {expertiseOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-3 rounded-lg border border-gray-600 cursor-pointer hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded border-gray-500"
                      checked={formData.expertise.includes(option)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            expertise: [...formData.expertise, option]
                          })
                        } else {
                          setFormData({
                            ...formData,
                            expertise: formData.expertise.filter(item => item !== option)
                          })
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-gray-300">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Documentos de Verificación
              </label>
              <div
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-700/50"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <div className="space-y-1 text-center">
                  <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400"
                    >
                      <span>Sube archivos</span>
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            documents: [...formData.documents, ...Array.from(e.target.files)]
                          })
                        }}
                      />
                    </label>
                    <p className="pl-1">o arrastra y suelta</p>
                  </div>
                  <p className="text-xs text-gray-400">
                    PDF, DOC hasta 10MB
                  </p>
                </div>
              </div>
              {formData.documents.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {formData.documents.map((file, index) => (
                    <li key={index} className="flex items-center justify-between py-2 px-3 bg-gray-700 rounded-lg">
                      <span className="text-sm text-gray-300">{file.name}</span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            documents: formData.documents.filter((_, i) => i !== index)
                          })
                        }}
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-gray-800 text-gray-400 hover:text-gray-300"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-semibold leading-6 text-white mb-6">
                Verificación de Productor
                <span className="ml-2 text-sm text-gray-400">
                  Paso {step} de 3
                </span>
              </h3>

              <form onSubmit={handleSubmit}>
                {renderStep()}

                <div className="mt-8 flex justify-end gap-3">
                  {step > 1 && (
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
                      onClick={() => setStep(step - 1)}
                    >
                      Anterior
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {step === 3 ? 'Enviar Solicitud' : 'Siguiente'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerificationModal