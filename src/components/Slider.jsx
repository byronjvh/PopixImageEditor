import { useEffect, useState } from 'react'
import { Minus, Plus, Reset } from './Icons'

export function Slider ({ icon, updateProperty, initialValue = 0, maxValue = 100, minValue = 0, property, delay = 100 }) {
  const [value, setValue] = useState(initialValue)

  const handleValueChange = (event) => {
    setValue(Number(event.target.value))
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateProperty({ property, value })
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value, property])

  const handleIncrementValue = () => {
    setValue((prevValue) => Math.min(prevValue + 1, maxValue))
  }

  const handleDecrementValue = () => {
    setValue((prevValue) => Math.max(prevValue - 1, minValue))
  }

  const handleResetValue = () => {
    setValue(initialValue)
  }

  return (
    <div className='flex justify-between gap-x-1'>
        <label className='flex min-w-[64px] gap-2 items-center' title={property} htmlFor={`Slider${property}`}>
          <span className='w-6 flex justify-center'>{icon}</span>
          {value}
        </label>
        <input
        className='flex-1'
          type="range"
          id={`Slider${property}`}
          name={`slider${property}`}
          min={minValue}
          max={maxValue}
          value={value}
          onChange={handleValueChange}
        />
        <button title='Plus' onClick={handleIncrementValue}>{<Plus size={28} />}</button>
        <button title='Minus' onClick={handleDecrementValue}>{<Minus size={28} />}</button>
        <button title='Reset' onClick={handleResetValue}>{<Reset size={20} />}</button>
      </div>
  )
}
