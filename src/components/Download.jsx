import { useContext } from 'react'
import { editorContext } from '../context/editorContext'
import { useTranslation } from 'react-i18next'
import { Back } from './Icons'
import { ActionButton } from './ActionButton'

export function Download () {
  const { t } = useTranslation()
  const { imageName, updateImageName, download } = useContext(editorContext)

  return (
    <form className='flex flex-wrap gap-1' onSubmit={(e) => e.preventDefault()}>
      <label className='w-full text-sm' htmlFor="download-name">{t('downloadName')}</label>
      <div className='flex flex-wrap gap-2'>
        <input className='w-full max-w-[200px] border-2 border-cyan-500 rounded-md px-2' value={imageName} onChange={updateImageName} type="text" name="" id="download-name" placeholder={t('imageName')} />
        <ActionButton type='success' onClick={download}>
          <Back className="-rotate-90" />
        </ActionButton>
      </div>
    </form>
  )
}
