const TYPES = {
  default: 'bg-cyan-100 border-cyan-500 text-cyan-950 hover:bg-cyan-50',
  danger: 'bg-red-100 border-red-500 text-red-950 hover:bg-red-50',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-950 hover:bg-yellow-50',
  success: 'bg-green-100 border-green-500 text-green-950 hover:bg-green-50'
}

export function ActionButton ({ className, children, type = 'default', onClick }) {
  return (
    <button onClick={(e) => onClick(e)} className= {`${TYPES[type]} py-2 px-2 rounded-md border-2 font-medium capitalize ${className}`}>{ children }</button>
  )
}
