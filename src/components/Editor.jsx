import { useContext, useEffect, useRef } from 'react'
import { editorContext } from '../context/editorContext'
import { Menu } from './Menu'

export function Editor () {
  const { size, editingSrc } = useContext(editorContext)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!size) return
    const canvas = canvasRef.current
    canvas.width = size.width
    canvas.height = size.height
  }, [size])

  useEffect(() => {
    if (!editingSrc || !size) return
    const canvas = canvasRef.current
    const newImage = new Image()
    newImage.src = editingSrc

    newImage.onload = () => {
      const ctx = canvas.getContext('2d')
      ctx.drawImage(newImage, 0, 0, size.width, size.height)
    }
  }, [editingSrc])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={'rounded-md p-2 bg-cyan-100 border-2 border-cyan-500'}
      />
      <Menu />
    </>
  )
}
