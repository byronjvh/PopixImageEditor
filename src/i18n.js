import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          downloadName: 'Write a name for your image',
          downloadBtn: 'Download',
          dropImage: 'Drop your image here',
          selectImage: 'Or select the image',
          brandName: 'Popix',
          language: 'Language',
          plus: 'Plus',
          deleteImage: 'Delete image',
          signin: 'Signin',
          title: 'Your photos, with a "pix" of creativity',
          description: 'Popix is a free, fast and easy online photo editor.',
          uploadImage: 'Upload image',
          logout: 'Logout',
          loginTitle: 'Login',
          loginDescription: 'Edit images with resolution up to 2k',
          loginWithGoogle: 'Login with Google',
          brightness: 'Brightness',
          contrast: 'Contrast',
          saturation: 'Saturation',
          sharpen: 'Sharpen',
          blur: 'Blur',
          noise: 'Noise',
          aberration: 'Aberration',
          grayscale: 'Grayscale',
          temperature: 'Temperature',
          defaultQuality: 'FullHD',
          plusQuality: 'Native',
          qualityTooltip: 'Choose between FullHD (1080) or Native (original resolution)',
          imageName: 'Image name'
        }
      },
      es: {
        translation: {
          downloadName: 'Escribe un nombre para tu imagen',
          downloadBtn: 'Descargar',
          dropImage: 'Suelta tu imagen aquí',
          selectImage: 'O selecciona la imagen',
          brandName: 'Popix',
          language: 'Idioma',
          plus: 'Plus',
          deleteImage: 'Eliminar imagen',
          signin: 'Acceder',
          title: 'Tus fotos, con un "pix" de creatividad',
          description: 'Popix es un editor de fotos online fácil, gratis y rápido.',
          uploadImage: 'Subir imagen',
          logout: 'Salir',
          loginTitle: 'Iniciar Sesión',
          loginDescription: 'Edita imágenes con resolución de hasta 2K',
          loginWithGoogle: 'Iniciar con Google',
          brightness: 'Brillo',
          contrast: 'Contraste',
          saturation: 'Saturación',
          sharpen: 'Nitidez',
          blur: 'Desenfoque',
          noise: 'Ruido',
          aberration: 'Aberración',
          grayscale: 'Escala Grises',
          temperature: 'Temperatura',
          defaultQuality: 'FullHD',
          plusQuality: 'Nativo',
          qualityTooltip: 'Elige entre resolución FullHD(1080) o Nativo(resolución original)',
          imageName: 'Nombre imagen'
        }
      }
      // Puedes añadir más idiomas y traducciones según lo necesites
    },
    lng: 'en', // Idioma por defecto
    fallbackLng: 'en', // Idioma de respaldo si la traducción no está disponible
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
