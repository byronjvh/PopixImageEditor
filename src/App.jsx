import './index.css'
import './fonts.css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource-variable/raleway'
import { Header } from './components/Header'
import { Landing } from './pages/Landing'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Plus } from './pages/Plus'
import { Background } from './components/Background'
import { AuthProvider } from './context/authContext'
import { EditorContextProvider } from './context/editorContext'

function App () {
  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <div className='App flex flex-col max-h-svh w-full max-w-[720px] font-ubuntu'>
          <Background />
          <BrowserRouter>
              <Header />
              <Routes>
                <Route path='/' element={
                  <EditorContextProvider>
                    <Landing />
                  </EditorContextProvider>
                  }/>
                <Route path='/signin' element={<Signin />}/>
                <Route path='/plus' element={<Plus />}/>
              </Routes>
          </BrowserRouter>
        </div>
      </AuthProvider>
    </I18nextProvider>
  )
}

export default App
