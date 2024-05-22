import { useState } from 'react'

const TYPES = {
  default: 'bg-cyan-100 border-cyan-500 text-cyan-950 hover:bg-cyan-50',
  danger: 'bg-red-100 border-red-500 text-red-950 hover:bg-red-50',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-950 hover:bg-yellow-50',
  success: 'bg-green-100 border-green-500 text-green-950 hover:bg-green-50'
}

export function OptionButton ({ className, children, type = 'default', onClick, name, onHold, onLeave }) {
  const [hold, setHold] = useState(false)
  const handleMouseDown = () => {
    if (!onHold || !onLeave) return
    setHold(true)
    onHold()
  }

  const handleMouseUp = () => {
    if (!onHold || !onLeave) return
    setHold(false)
    onLeave()
  }

  const handleMouseLeave = () => {
    if (!onHold || !onLeave) return
    if (!hold) return
    setHold(false)
    onLeave()
  }

  const handleClick = () => {
    if (!onClick) return
    onClick(name)
  }
  return (
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        name={name}
        onClick={handleClick}
        className= {`${TYPES[type]} text-nowrap p-2 rounded-md border-2 font-medium capitalize ${className}`}>
          { children }
      </button>
  )
}
