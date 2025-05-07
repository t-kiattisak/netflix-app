/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react"

export function useHover<T extends HTMLElement = any>() {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<T>(null)
  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])

  useEffect(() => {
    const node = ref.current

    if (node) {
      node.addEventListener("mouseenter", onMouseEnter)
      node.addEventListener("mouseleave", onMouseLeave)

      return () => {
        node?.removeEventListener("mouseenter", onMouseEnter)
        node?.removeEventListener("mouseleave", onMouseLeave)
      }
    }

    return undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current])

  return { ref, hovered }
}
