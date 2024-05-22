import { useTranslation } from 'react-i18next'
import { LangButton } from './LangButton'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Header () {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  return (
    <header className="py-2 flex justify-between items-center font-ubuntu font-medium tracking-wide text-sm px-2">
        <div>
          <Link to={'/PopixImageEditor/'}>
            {t('brandName')}
          </Link>
        </div>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <LangButton />
            </li>
            <li>
              <Link className='link_effect' to={'/PopixImageEditor/plus'}>
                {t('plus')}
              </Link>
            </li>
            <li>
              {
                !user
                  ? (
                  <Link className='link_effect' to={'/PopixImageEditor/signin'}>
                    {t('signin')}
                  </Link>
                    )
                  : (
                  <button className='link_effect' onClick={() => logout()} >{t('logout')}</button>
                    )
              }
            </li>
          </ul>
        </nav>
    </header>
  )
}
