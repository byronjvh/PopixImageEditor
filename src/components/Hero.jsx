import { useTranslation } from 'react-i18next'

export function Hero () {
  const { t } = useTranslation()
  return (
    <section id="hero" className='text-center h-[30svh] flex flex-col justify-center'>
      <h1 className='font-raleway font-black text-balance text-5xl sm:text-6xl px-2 mb-1 sm:mb-3'>{t('title')}</h1>
      <p className='text-lg'>{t('description')}</p>
    </section>
  )
}
