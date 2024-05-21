import { useContext } from 'react'
import { DropZone } from '../components/DropZone'
import { Hero } from '../components/Hero'
import { editorContext } from '../context/editorContext'
import { Editor } from '../components/Editor'

export function Landing () {
  const { editingSrc } = useContext(editorContext)
  return (
    <>
      {
        editingSrc
          ? (
          <Editor />
            )
          : (
          <>
          <Hero />
          <DropZone />
          </>
            )
      }
    </>
  )
}
