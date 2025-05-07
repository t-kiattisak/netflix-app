"use client"

import { useMemo } from "react"
import { Bell, ChevronDown, Search } from "lucide-react"
import Image from "next/image"
import { cn } from "@/presentation/utils"
import { useWindowScroll } from "@/presentation/hooks/useWindowScroll"

const navItems = [
  "Home",
  "TV Shows",
  "Movies",
  "New & Popular",
  "My List",
  "Browse by Languages",
]

export function Topbar() {
  const [scroll] = useWindowScroll()

  const hasScroll = useMemo(() => scroll.y > 90, [scroll])

  return (
    <header
      className={cn(
        "h-fit md:h-20 fixed top-0 left-0 right-0 z-50 px-6 py-4",
        "transition-all duration-500 ease-in-out",
        hasScroll
          ? "bg-black/90 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      )}
    >
      <div className='flex flex-wrap items-center w-full text-white'>
        <div className='order-1'>
          <Image
            src='/images/netflix-logo.png'
            width={100}
            height={50}
            alt='Netflix Logo'
          />
        </div>

        <div className='order-2 md:order-3 flex items-center space-x-3 ml-auto'>
          <div className='flex items-center space-x-4 text-white'>
            <Search className='w-5 h-5 cursor-pointer' />
            <div className='relative'>
              <Bell className='w-5 h-5 cursor-pointer' />
              <span className='absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                3
              </span>
            </div>
            <Image
              src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              alt='User Avatar'
              width={32}
              height={32}
              className='rounded-md cursor-pointer'
            />
            <ChevronDown className='w-4 h-4' />
          </div>
        </div>

        <nav className='order-3 w-full md:order-2 md:w-auto flex flex-wrap gap-4 mt-2 md:mt-0 px-2'>
          {navItems.map((item) => (
            <span
              key={item}
              className='hover:underline cursor-pointer text-sm whitespace-nowrap'
            >
              {item}
            </span>
          ))}
        </nav>
      </div>
    </header>
  )
}
