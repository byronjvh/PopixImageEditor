import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { CONFIG_OPTIONS, QUALITY } from '../constants'
import { useTranslation } from 'react-i18next'

export function QualitySwitch () {
  const { t } = useTranslation()
  const [HD, setHD] = useState(true)
  const { updateConfig, config, user } = useAuth()

  const handleHD = (bol) => {
    if (!user) return setHD(true)
    if (bol && !HD) {
      setHD(true)
      updateConfig(CONFIG_OPTIONS.quality, QUALITY.fullhd)
    }
    if (!bol && HD) {
      setHD(false)
      updateConfig(CONFIG_OPTIONS.quality, QUALITY.native)
    }
  }

  useEffect(() => {
    if (config.quality === QUALITY.fullhd) {
      setHD(true)
    }
    if (config.quality === QUALITY.native) {
      setHD(false)
    }
  }, [config])

  useEffect(() => {
    if (!user) return setHD(true)
  }, [user])

  return (
    <div className={`quality-switch ${HD ? ' HD' : ''} bg-white overflow-hidden rounded-full outline outline-1 outline-sky-500`}>
      <span className='selected-bg'></span>
      <button className={`py-1 pl-3 pr-2 font-medium ${HD ? 'text-white' : ''}`} onClick={() => handleHD(true)}>{t('defaultQuality')}</button>
      <button className={`w-[70px] py-1 pr-3 pl-2 font-medium ${HD ? '' : 'text-white'}`} onClick={() => handleHD(false)}>{t('plusQuality')}</button>
    </div>
  )
}
