import { useState } from 'react'

const validateImage = (file) => {
  if (!file) return

  if (file.type.startsWith('image/')) {
    const splitedType = file.type.split('/')
    const extension = splitedType[1]
    const ObjectURL = URL.createObjectURL(file)
    return { file: ObjectURL, extension }
  } else {
    return { file: null, extension: '' }
  }
}

const useDropImage = () => {
  const [image, setImage] = useState(null)
  const [format, setFormat] = useState('')
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)

    const filetoValidate = e.dataTransfer.files[0]

    const { file, extension } = validateImage(filetoValidate)
    setImage(file)
    setFormat(extension)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleInput = (e) => {
    const fileToValidate = e.target.files[0]
    const { file, extension } = validateImage(fileToValidate)
    setImage(file)
    setFormat(extension)
  }

  return { dragging, image, handleDragOver, handleDragLeave, handleDrop, handleInput, format }
}

export default useDropImage
