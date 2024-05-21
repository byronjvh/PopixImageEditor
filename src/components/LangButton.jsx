import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowDown, ESFlag, USFlag } from './Icons'
import { useClickOutside } from '../hooks/useClickOutside'
import { useAuth } from '../hooks/useAuth'

const LANGUAGES = [
  {
    name: 'English',
    flag: USFlag(),
    code: 'en'
  },
  {
    name: 'Español',
    flag: ESFlag(),
    code: 'es'
  }
]

export function LangButton () {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(LANGUAGES[0])
  const { menuRef, open, updateOpen } = useClickOutside()
  const { updateConfig, config, user } = useAuth()

  // change lang state when i18n changes
  useEffect(() => {
    if (i18n.language === lang.code) return
    setLang(LANGUAGES.find(language => language.code === i18n.language))
  }, [i18n])

  const handleLanguage = (lang) => {
    setLang(LANGUAGES.find(language => language.name === lang.name))
    i18n.changeLanguage(lang.code)
    if (user) updateConfig('language', lang.code) // updates language in db config if user exist
    updateOpen(false)
  }
  // change the lang state when db config changes
  useEffect(() => {
    if (!user) return
    setLang(LANGUAGES.find(lang => lang.code === config.language))
    i18n.changeLanguage(config.language)
  }, [config])

  return (
    <div className='relative w-max bg-blue-50 rounded-md hover:bg-blue-100 transition-colors' ref={menuRef}>
      <button className='flex justify-between px-1 pl-[6px] py-1 gap-[2px]' onClick={() => updateOpen(!open)}>
        <span>
          {lang?.flag}
        </span>
        <span><ArrowDown /></span>
      </button>
      <ul className={`langButton min-w-full z-50 absolute top-full left-0 rounded-md overflow-hidden shadow-md bg-white ${open ? 'open' : ''}`} >
        {
          LANGUAGES?.map(lang => (
            <li className='flex justify-between gap-1 px-2 py-1 hover:bg-sky-100 cursor-pointer' onClick={() => handleLanguage(lang)} key={lang.name}>
              {lang.name}
              <span>
                {lang?.flag}
              </span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
