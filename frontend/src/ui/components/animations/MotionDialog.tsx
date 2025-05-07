"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "../Button"
import { useState, useCallback, useRef, type ReactNode, useEffect } from "react"
import { createSafeContext } from "@/presentation/providers/CreateSafeContext"

type MotionDialogContextType = {
  isOpen: boolean
  originRect: DOMRect | null
  open: (rect: DOMRect) => void
  close: () => void
}

export const [MotionDialogContextProvider, useMotionDialog] =
  createSafeContext<MotionDialogContextType>(
    "Must use within <MotionDialogRoot />"
  )

export function MotionDialogRoot({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)

  const open = useCallback((rect: DOMRect) => {
    setOriginRect(rect)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <MotionDialogContextProvider value={{ isOpen, originRect, open, close }}>
      {children}
    </MotionDialogContextProvider>
  )
}

export function MotionDialogTrigger({
  children,
}: {
  children: React.ReactElement
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { open } = useMotionDialog()

  return (
    <div
      ref={ref}
      onClick={() => {
        const rect = ref.current?.getBoundingClientRect()
        if (rect) open(rect)
      }}
      className='inline-block'
    >
      {children}
    </div>
  )
}

export function MotionDialogContent({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen, originRect, close } = useMotionDialog()
  return (
    <MotionDialog isOpen={isOpen} originRect={originRect} onClose={close}>
      {children}
    </MotionDialog>
  )
}

type MotionDialogProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  originRect?: DOMRect | null
}

export function MotionDialog({
  isOpen,
  onClose,
  children,
  originRect,
}: MotionDialogProps) {
  const [origin, setOrigin] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  })
  const [originSnapshot, setOriginSnapshot] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (isOpen && originRect) {
      const id = requestAnimationFrame(() => {
        setOrigin({
          top: originRect.top + window.scrollY,
          left: originRect.left + window.scrollX,
        })
        setOriginSnapshot(originRect)
      })
      return () => cancelAnimationFrame(id)
    }
  }, [isOpen, originRect])

  if (!originSnapshot) return null

  const width = originSnapshot?.width || 300
  const height = originSnapshot?.height || 200

  return (
    <AnimatePresence
      onExitComplete={() => {
        setOriginSnapshot(null)
      }}
    >
      {isOpen && originRect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 px-10 z-[9999] bg-black/70 flex items-center justify-center'
        >
          <motion.div
            initial={{
              opacity: 0,
              x: origin.left - window.innerWidth / 2,
              y: origin.top - window.innerHeight / 2,
              width,
              height,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: 0,
              width: "100%",
              height: "auto",
            }}
            exit={{
              opacity: 0,
              x: origin.left - window.innerWidth / 2,
              y: origin.top - window.innerHeight / 2,
              width,
              height,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className='relative max-w-5xl w-full bg-neutral-900 text-white overflow-hidden shadow-2xl'
          >
            <Button
              onClick={onClose}
              variant='outline'
              size='icon'
              className='absolute rounded-full top-4 right-4 z-10 text-white bg-black'
            >
              <X className='w-6 h-6' />
            </Button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
