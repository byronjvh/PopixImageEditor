import { BackgroundSVG } from './Icons'

export function Background () {
  return (
    <>
      <span id='backgroundSVG' className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-4/5 md:w-[720px] blur-3xl opacity-20 -z-50'>
        <BackgroundSVG />
      </span>
    </>
  )
}
