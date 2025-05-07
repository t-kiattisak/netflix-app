"use client"

import { motion, MotionProps } from "framer-motion"
import { cn } from "@/presentation/utils"
import { Portal } from "../Portal"

interface MotionContainerProps extends MotionProps {
  open?: boolean
  className?: string
}

const variants = {
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: "easeIn" },
  },
}

export function MotionContainer({
  open,
  children,
  className,
  ...others
}: MotionContainerProps) {
  return (
    <motion.div
      variants={variants}
      initial={false}
      animate={open ? "animate" : "exit"}
      className={cn("relative", className)}
      {...others}
    >
      {children}
    </motion.div>
  )
}

MotionContainer.Portal = Portal
