import { useContext, useState } from 'react'
import { FILTERS, MENU_OPTIONS } from '../constants'
import { OptionButton } from './OptionButton'
import { Slider } from './Slider'
import { editorContext } from '../context/editorContext'
import { Aberration, Angle, Back, Blur, Brightness, Check, Compare, Contrast, Delete, Grayscale, Noise, Saturation, Sharpness, Temperature, Undo } from './Icons'
import { Download } from './Download'
import { ActionButton } from './ActionButton'
import { ColorRing } from 'react-loader-spinner'
import { useTranslation } from 'react-i18next'

export function Menu () {
  const { t } = useTranslation()
  const [menuOption, setMenuOption] = useState(MENU_OPTIONS.default)
  const { updateAberration, filterIsLoading, historyState, deleteImage, updateProperty, apply, discard, startCompare, stopCompare, undo, redo } = useContext(editorContext)

  const updateOption = (value) => {
    setMenuOption(value)
  }

  const handleBack = () => {
    setMenuOption(MENU_OPTIONS.default)
    discard()
  }

  const handleApply = () => {
    setMenuOption(MENU_OPTIONS.default)
    apply()
  }

  const handleUndo = () => {
    undo()
  }
  const handleRedo = () => {
    redo()
  }

  return (
    <div className='flex flex-col gap-2'>
        {menuOption === MENU_OPTIONS.default && (
            <>
                <div className='flex gap-2'>
                        <ActionButton className={`${!historyState.hasPrev ? 'brightness-90 cursor-default hover:bg-cyan-100' : ''}`} onClick={handleUndo}>
                            <Undo />
                        </ActionButton>
                        <ActionButton className={`${!historyState.hasNext ? 'brightness-90 cursor-default hover:bg-cyan-100' : ''}`} onClick={handleRedo}>
                            <Undo className="-scale-x-[1]" />
                        </ActionButton>
                        <ActionButton onClick={deleteImage} type='danger'>
                            <Delete />
                        </ActionButton>

                </div>
                <div className='flex pb-2 gap-2 max-w-full overflow-auto sm:flex-wrap'>
                    {
                        Object.keys(FILTERS).map((option, i) => (
                            <OptionButton className='py-1 px-3' key={i} name={option.toLowerCase()} onClick={updateOption}>
                                {t(option.toLowerCase())}
                            </OptionButton>
                        ))
                    }
                </div>
                <div>
                    <Download />
                </div>
            </>
        )}
        {
            menuOption !== MENU_OPTIONS.default && (
                <div className='flex gap-2'>
                    <OptionButton onClick={handleBack}>
                        <Back />
                    </OptionButton>
                    <OptionButton onClick={handleApply}>
                        <Check />
                    </OptionButton>
                    <OptionButton onHold={startCompare} onLeave={stopCompare}>
                        <Compare />
                    </OptionButton>
                    {
                            filterIsLoading && (
                                <ColorRing
                                visible={true}
                                height="40"
                                width="40"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{ }}
                                wrapperClass="color-ring-wrapper"
                                colors={['#2563EB', '#CF52D0', '#FF599F', '#FF8970', '#FFC358']}
                                />)
                        }
                </div>
            )
        }
        {menuOption === MENU_OPTIONS.brightness && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={-100} maxValue={100} property={FILTERS.BRIGHTNESS} icon={<Brightness size={22} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.contrast && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={-100} maxValue={100} property={FILTERS.CONTRAST} icon={<Contrast size={18} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.saturation && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={-100} maxValue={100} property={FILTERS.SATURATION} icon={<Saturation size={22} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.temperature && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={-100} maxValue={100} property={FILTERS.TEMPERATURE} icon={<Temperature size={22} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.sharpen && (
                <div className='flex flex-col gap-2'>
                    <Slider maxValue={100} property={FILTERS.SHARPEN} icon={<Sharpness size={22} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.grayscale && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={50} minValue={0} maxValue={100} property={FILTERS.GRAYSCALE} icon={<Grayscale size={28} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.noise && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={0} maxValue={100} property={FILTERS.NOISE} icon={<Noise size={24} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.blur && (
                <div className='flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={0} maxValue={100} property={FILTERS.BLUR} icon={<Blur size={22} />} updateProperty={updateProperty} />
                </div>
        )}
        {menuOption === MENU_OPTIONS.aberration && (
                <div className=' flex flex-col gap-2'>
                    <Slider initialValue={0} minValue={0} maxValue={10} property={FILTERS.ABERRATION.intensity} icon={<Aberration size={22} />} updateProperty={updateAberration} />
                    <Slider initialValue={0} minValue={0} maxValue={360} property={FILTERS.ABERRATION.redAngle} icon={<Angle color='red' />} updateProperty={updateAberration} />
                    <Slider initialValue={0} minValue={0} maxValue={360} property={FILTERS.ABERRATION.greenAngle} icon={<Angle color='green' />} updateProperty={updateAberration} />
                    <Slider initialValue={0} minValue={0} maxValue={360} property={FILTERS.ABERRATION.blueAngle} icon={<Angle color='blue' />} updateProperty={updateAberration} />
                </div>
        )}
    </div>
  )
}
