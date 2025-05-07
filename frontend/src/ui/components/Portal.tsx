"use client"

import { createPortal } from "react-dom"
import type { ReactNode } from "react"

interface PortalProps {
  children: ReactNode
  container?: HTMLElement | null
}

export function Portal({ children, container }: PortalProps) {
  const root =
    container ?? (typeof document !== "undefined" ? document.body : null)
  return root ? createPortal(children, root) : null
}
