export const QUALITY = Object.freeze({
  fullhd: 'fullhd',
  native: 'native'
})

export const LANGUAGE = Object.freeze({
  en: 'en',
  es: 'es'
})

export const THEME = Object.freeze({
  light: 'light',
  dark: 'dark'
})

export const CONFIG_OPTIONS = Object.freeze({
  theme: 'theme',
  language: 'language',
  plus: 'plus',
  quality: 'quality'
})

export const DEFAULT_USER_CONFIG = Object.freeze({
  theme: THEME.light,
  language: LANGUAGE.en,
  plus: false, // true or false
  quality: QUALITY.fullhd
})

export const MENU_OPTIONS = Object.freeze({
  default: 'default',
  contrast: 'contrast',
  brightness: 'brightness',
  saturation: 'saturation',
  temperature: 'temperature',
  noise: 'noise',
  blur: 'blur',
  grayscale: 'grayscale',
  aberration: 'aberration',
  sharpen: 'sharpen'
})

export const FILTERS = Object.freeze({
  BRIGHTNESS: 'BRIGHTNESS',
  CONTRAST: 'CONTRAST',
  SATURATION: 'SATURATION',
  SHARPEN: 'SHARPEN',
  BLUR: 'BLUR',
  NOISE: 'NOISE',
  TEMPERATURE: 'TEMPERATURE',
  ABERRATION: {
    intensity: 'intensity',
    redAngle: 'redangle',
    greenAngle: 'greenangle',
    blueAngle: 'blueangle'
  },
  GRAYSCALE: 'GRAYSCALE'
})

export const DEFAULT_FILTERS_VALUE = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  sharpen: 0,
  temperature: 0,
  blur: 0,
  noise: 0,
  aberration: {
    intensity: 0,
    redangle: 0,
    greenangle: 0,
    blueangle: 0
  },
  grayscale: null
}
