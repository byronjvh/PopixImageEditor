import { useTranslation } from 'react-i18next'
import useDropImage from '../hooks/useDropImage'
import { useContext, useEffect, useRef } from 'react'
import { editorContext } from '../context/editorContext'
import { QualitySwitch } from './QualitySwitch'
import { CtaButton } from './CtaButton'
import { Tooltip } from './Tooltip'

export function DropZone () {
  const { t } = useTranslation()
  const { updateImage, updateFormat } = useContext(editorContext)
  const { image, format, dragging, handleDragOver, handleDragLeave, handleDrop, handleInput } = useDropImage()
  const inputRef = useRef(null)

  useEffect(() => {
    if (!image || !format) return
    updateFormat(format)
    updateImage(image)
  }, [image, format])

  const handleClick = () => {
    if (!inputRef.current) return
    inputRef.current.click()
  }

  return (
    <section className='flex flex-col items-center px-2 gap-4'>
      <div className='flex relative'>
        <QualitySwitch />
        <Tooltip
          className='-right-6 top-1/2 -translate-y-1/2 '
          content={t('qualityTooltip')}
          />

      </div>
      <div
        className={`dropZone ${dragging ? 'dragging ' : ''}self-center w-[80%] max-w-[350px] aspect-square flex flex-col items-center justify-center gap-1`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave} >
        <span className='text-lg mb-1 font-ubuntu font-medium'>{t('dropImage')}</span>
        <label className='cursor-pointer text-xs mb-1' htmlFor="drop-image">{t('selectImage')}</label>
        <CtaButton onClick={handleClick}>{t('uploadImage')}</CtaButton>
        <input ref={inputRef} className='cursor-pointer text-[10px] hidden' type="file" id="drop-image" name="drop-image" accept="image/*" onChange={handleInput}/>
      </div>
    </section>
  )
}
