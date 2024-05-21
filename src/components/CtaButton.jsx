export function CtaButton ({ className, onClick, children }) {
  return (
        <button onClick={() => onClick()} className={`bg-yellow-600 px-4 py-2 font-medium text-white rounded-full hover:brightness-110 transition-[filter] ease-in-out duration-200 ${className}`} >{children}</button>
  )
}
