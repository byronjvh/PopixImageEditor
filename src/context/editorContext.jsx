import { createContext, useEffect, useState } from 'react'
import { DEFAULT_FILTERS_VALUE, FILTERS, QUALITY } from '../constants'
import { useAuth } from '../hooks/useAuth'
import { resizeImage } from '../logic/resizeImage'
import Worker from './EditorWorker.js?worker'

export const editorContext = createContext()

export function EditorContextProvider ({ children }) {
  const { user, config } = useAuth()
  const [imageName, setImageName] = useState('')
  const [originalSrc, setOriginalSrc] = useState('')
  const [editingSrc, setEditingSrc] = useState('')
  const [tempEditingSrc, setTempEditingSrc] = useState('')
  const [history, setHistory] = useState([])
  const [index, setIndex] = useState(0)
  const [format, setFormat] = useState('')
  const [size, setSize] = useState({ width: 1920, height: 1080 })
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS_VALUE })
  const [blurFilter, setBlurFilter] = useState(0)
  const [filterIsLoading, setFilterIsLoading] = useState(false)
  const [historyState, setHistoryState] = useState({
    hasPrev: false,
    hasNext: false
  })

  const updateImage = (img) => {
    const droppedImage = new Image()
    droppedImage.src = img

    droppedImage.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      let maxWidth = 0
      let maxHeight = 0

      // default quality is fullhd
      if (!user) {
        maxWidth = 1920
        maxHeight = 1080
      } else {
        maxWidth = (config.quality === QUALITY.fullhd) ? 1920 : droppedImage.width
        maxHeight = (config.quality === QUALITY.fullhd) ? 1080 : droppedImage.height
      }

      const { width, height } = resizeImage(maxWidth, maxHeight, droppedImage.width, droppedImage.height)

      setSize({ width, height })
      canvas.width = width
      canvas.height = height
      droppedImage.width = width
      droppedImage.height = height
      ctx.drawImage(droppedImage, 0, 0, width, height)

      const url = canvas.toDataURL(`image/${format}`)

      setOriginalSrc(url)
      setEditingSrc(url)
      setHistory([url])
      setIndex(0)
    }
  }

  const deleteImage = () => {
    setOriginalSrc('')
    setHistory([])
    setEditingSrc('')
    setIndex(0)
  }

  const updateFormat = (ext) => {
    setFormat(ext)
  }

  const apply = () => {
    if (history.length > index + 1) {
      setHistory(prev => {
        const newHistory = [...prev]

        newHistory.splice(index + 1)
        newHistory.push(editingSrc)
        return newHistory
      })
      setIndex(index + 1)
    } else if (history.length >= 9) {
      setHistory(prev => {
        const newHistory = [...prev]

        newHistory.shift()
        newHistory.push(editingSrc)
        return newHistory
      })
    } else {
      setHistory([...history, editingSrc])
      setIndex(index + 1)
    }

    setFilters({ ...DEFAULT_FILTERS_VALUE })
  }

  const discard = () => {
    if (filterIsLoading) return
    setEditingSrc(history[index])
    setFilters({ ...DEFAULT_FILTERS_VALUE })
  }

  const startCompare = () => {
    setTempEditingSrc(editingSrc)
    setEditingSrc(history[index])
  }

  const stopCompare = () => {
    setEditingSrc(tempEditingSrc)
    setTempEditingSrc('')
  }

  const undo = () => {
    if (history.length <= 1 || index < 1) return
    setEditingSrc(history[index - 1])
    setIndex(index - 1)
  }

  const redo = () => {
    if (index + 1 >= history.length) return
    setEditingSrc(history[index + 1])
    setIndex(index + 1)
  }

  const updateImageName = (e) => {
    setImageName(e.target.value)
  }

  const download = () => {
    const name = imageName.length > 0 ? imageName : 'edited_image'
    // Crea un elemento <a> para la descarga
    const link = document.createElement('a')
    link.href = editingSrc // El src de la imagen que deseas descargar
    link.download = name // El nombre del archivo a descargar (puedes personalizarlo)

    // Simula un clic en el elemento <a> para iniciar la descarga
    link.click()
    setImageName('')
  }

  const updateProperty = ({ property, value }) => {
    if (property.toLowerCase() === FILTERS.BLUR.toLowerCase()) return setBlurFilter(value)

    setFilters(prev => ({
      ...prev,
      [property.toLowerCase()]: value
    }))
  }

  const updateAberration = ({ property, value }) => {
    setFilters(prev => (
      {
        ...prev,
        aberration: {
          ...prev.aberration,
          [property.toLowerCase()]: value
        }
      }
    ))
  }

  const someFilter = Object.values(filters).some(el => el !== 0 && el !== null)

  useEffect(() => {
    if (!someFilter) return
    const worker = new Worker()

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const { width, height } = size
    canvas.width = width
    canvas.height = height
    const newImage = new Image()
    newImage.src = history[index]

    setFilterIsLoading(true)
    newImage.onload = () => {
      ctx.drawImage(newImage, 0, 0, width, height)
      const data = ctx.getImageData(0, 0, width, height)
      worker.postMessage({ filters, data, width, height })
    }
    worker.onmessage = function (e) {
      if (!e.data) return
      const data = e.data
      ctx.putImageData(data, 0, 0)
      const url = canvas.toDataURL(`image/${format}`)
      setEditingSrc(url)
      setFilterIsLoading(false)
    }

    return () => {
      worker.terminate()
    }
  }, [filters, history, index])

  useEffect(() => {
    setFilterIsLoading(true)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const { width, height } = size
    canvas.width = width
    canvas.height = height

    const image = new Image()
    image.src = history[index]
    image.onload = () => {
      ctx.drawImage(image, 0, 0, width, height)
      ctx.filter = `blur(${blurFilter / 10}px)`
      ctx.drawImage(image, 0, 0, width, height)

      const url = canvas.toDataURL(`image/${format}`)
      setEditingSrc(url)
      setFilterIsLoading(false)
    }
  }, [blurFilter])

  useEffect(() => {
    const newHistoryState = {
      hasPrev: !!history[index - 1],
      hasNext: !!history[index + 1]
    }
    setHistoryState(newHistoryState)
  }, [index])

  return (
    <editorContext.Provider value={{ size, historyState, filterIsLoading, originalSrc, editingSrc, format, updateImage, updateFormat, deleteImage, updateProperty, updateAberration, apply, discard, startCompare, stopCompare, undo, redo, download, updateImageName, imageName }} >
      <main className='flex flex-col gap-2 p-1 '>
        { children }
      </main>
    </editorContext.Provider>
  )
}
