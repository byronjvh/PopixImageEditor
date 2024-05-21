import { Question } from './Icons'

export function Tooltip ({ className, content = 'contenido' }) {
  return (
        <button className={`tooltip ${className}`} >
            <Question size={16} className="fill-cyan-950" />
            <span className="tooltip__content text-[10px]">{content}</span>
        </button>
  )
}
