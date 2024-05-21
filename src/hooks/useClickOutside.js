import { useEffect, useRef, useState } from 'react'

export function useClickOutside () {
  const menuRef = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [])

  const updateOpen = (value) => {
    setOpen(value)
  }

  return { menuRef, open, updateOpen }
}
