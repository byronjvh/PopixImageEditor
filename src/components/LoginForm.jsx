import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Google } from './Icons'
import { ColorRing } from 'react-loader-spinner'
import { useTranslation } from 'react-i18next'

export function LoginForm () {
  const { t } = useTranslation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { loginWithGoogle } = useAuth()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const result = await loginWithGoogle()
      if (result) navigate('/')
    } catch {
      setError('Error al iniciar sesión')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className='self-center max-w-max text-center flex flex-col items-center py-4 px-2 gap-2'>
        <h3 className='text-xl font-medium'>{t('loginTitle')}</h3>
        <p>{t('loginDescription')}</p>
        <button className='w-full min-w-fit flex gap-2 items-center justify-center bg-white border-2 border-cyan-500 rounded-md p-2 hover:bg-cyan-200 transition-colors duration-300' onClick={handleLogin}>
          {
            !loading
              ? (
                  <>
                    <Google size={32} />
                    <span className='hidden xs:block text-lg'>{t('loginWithGoogle')}</span>
                  </>
                )
              : (<ColorRing height={32} />)

          }
        </button>
        {
          error && (
            <span className='text-red-500'>{error}</span>
          )
        }
      </div>
    </>
  )
}
