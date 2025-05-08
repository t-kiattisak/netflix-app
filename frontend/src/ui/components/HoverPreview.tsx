"use client"

import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type RefObject,
  useLayoutEffect,
} from "react"
import { AnimatePresence } from "framer-motion"
import { MotionContainer } from "@/ui/components/animations/MotionContainer"
import { Portal } from "@/ui/components/Portal"
import { createSafeContext } from "@/presentation/providers/CreateSafeContext"

type HoverPreviewContextType = {
  show: boolean
  anchorRef: RefObject<HTMLDivElement | null>
  previewRef: RefObject<HTMLDivElement | null>
}

const [HoverPreviewContextProvider, useHoverPreview] =
  createSafeContext<HoverPreviewContextType>(
    "useHoverPreview must be used within a HoverPreviewProvider"
  )

export function HoverPreviewRoot({ children }: { children: ReactNode }) {
  const anchorRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Node
      const isInAnchor = anchorRef.current?.contains(target) ?? false
      const isInPreview = previewRef.current?.contains(target) ?? false
      setShow(isInAnchor || isInPreview)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <HoverPreviewContextProvider value={{ show, anchorRef, previewRef }}>
      {children}
    </HoverPreviewContextProvider>
  )
}

export function HoverPreviewTrigger({
  children,
}: {
  children: React.ReactNode
}) {
  const context = useHoverPreview()
  return (
    <div ref={context.anchorRef} className='relative'>
      {children}
    </div>
  )
}

export function HoverPreviewContent({ children }: { children: ReactNode }) {
  const context = useHoverPreview()
  const rect = context.anchorRef.current?.getBoundingClientRect()
  const cardWidth = (rect?.width ?? 0) * 1.4
  const [contentHeight, setContentHeight] = useState(0)

  useLayoutEffect(() => {
    if (context.previewRef.current) {
      setContentHeight(context.previewRef.current.offsetHeight)
    }
  }, [context.previewRef, context.show])

  const position = (() => {
    if (!rect) return { top: 0, left: 0 }

    const top = rect.top + window.scrollY + rect.height / 2 - contentHeight / 2

    let left = rect.left + rect.width / 2 - cardWidth / 2
    const maxLeft = window.innerWidth - cardWidth - 12
    const minLeft = 12
    left = Math.max(minLeft, Math.min(left, maxLeft))

    return { top, left }
  })()

  return (
    <Portal container={context.previewRef.current}>
      <AnimatePresence mode='wait'>
        {context.show && rect && (
          <MotionContainer
            open
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className='absolute z-[9999] shadow-xl bg-neutral-900 overflow-hidden'
            style={{
              width: cardWidth,
              top: position.top,
              left: position.left,
            }}
          >
            <div ref={context.previewRef}>{children}</div>
          </MotionContainer>
        )}
      </AnimatePresence>
    </Portal>
  )
}
