import React, { useState } from 'react'
import { CloudArrowUpIcon, DocumentTextIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

function ProductUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    videoUrl: '',
    files: [],
    setupInstructions: ''
  })

  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...Array.from(files)]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here we would handle the product upload
    console.log('Product data:', formData)
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Subir Nuevo Producto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Información básica */}
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Nombre del Producto
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Descripción
            </label>
            <textarea
              id="description"
              rows={4}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">
              Precio (USD)
            </label>
            <input
              type="number"
              id="price"
              min="0"
              step="0.01"
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
          </div>
        </div>

        {/* Video de demostración */}
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-300">
            URL del Video de Demostración
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-400">
              <VideoCameraIcon className="h-5 w-5" />
            </span>
            <input
              type="url"
              id="videoUrl"
              className="flex-1 block w-full rounded-none rounded-r-md bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://youtube.com/..."
              value={formData.videoUrl}
              onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
            />
          </div>
          <p className="mt-1 text-sm text-gray-400">
            Sube tu video a YouTube o Vimeo y comparte el enlace aquí
          </p>
        </div>

        {/* Instrucciones de configuración */}
        <div>
          <label htmlFor="setupInstructions" className="block text-sm font-medium text-gray-300">
            Instrucciones de Configuración
          </label>
          <textarea
            id="setupInstructions"
            rows={6}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.setupInstructions}
            onChange={(e) => setFormData({...formData, setupInstructions: e.target.value})}
            placeholder="Explica paso a paso cómo configurar y usar tu producto..."
          />
        </div>

        {/* Área de archivos */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Archivos del Producto
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md
              ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 bg-gray-700/50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-400">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-500 hover:text-blue-400">
                  <span>Sube archivos</span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </label>
                <p className="pl-1">o arrastra y suelta</p>
              </div>
              <p className="text-xs text-gray-400">
                ZIP, RAR, PDF, DOC hasta 50MB
              </p>
            </div>
          </div>

          {/* Lista de archivos */}
          {formData.files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {formData.files.map((file, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-300">
                  <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="text-red-400 hover:text-red-300"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      files: prev.files.filter((_, i) => i !== index)
                    }))}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold
                     hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Publicar Producto
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductUpload