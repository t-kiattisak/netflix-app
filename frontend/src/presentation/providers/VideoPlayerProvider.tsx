"use client"

import { useRef, useState } from "react"
import type Player from "video.js/dist/types/player"
import { createSafeContext } from "./CreateSafeContext"

type VideoPlayerContextType = {
  players: Record<string, Player>
  mutedMap: Record<string, boolean>
  setPlayer: (videoId: string, player: Player) => void
  toggleMute: (videoId: string) => void
  isMuted: (videoId: string) => boolean
  playOnly: (videoId: string) => void
  pauseVideo: (videoId: string) => void
  pauseButKeepActive: (videoId: string) => void
  activeVideoId: string | null
}

export const [VideoPlayerContextProvider, useVideoPlayer] =
  createSafeContext<VideoPlayerContextType>(
    "useVideoPlayer must be used within a VideoPlayerProvider"
  )

export const VideoPlayerProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const playersRef = useRef<Record<string, Player>>({})
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({})
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const setPlayer = (videoId: string, player: Player) => {
    playersRef.current[videoId] = player
    player.muted(mutedMap[videoId] ?? true)
    setActiveVideoId(videoId)
  }

  const toggleMute = (videoId: string) => {
    const player = playersRef.current[videoId]
    if (!player) return

    const newMuted = !(mutedMap[videoId] ?? true)
    player.muted(newMuted)
    setMutedMap((prev) => ({ ...prev, [videoId]: newMuted }))
  }

  const isMuted = (videoId: string) => mutedMap[videoId] ?? true

  const playOnly = (videoId: string) => {
    Object.entries(playersRef.current).forEach(([id, player]) => {
      if (id === videoId) {
        player.play()
      } else {
        player.pause()
      }
    })
    setActiveVideoId(videoId)
  }

  const pauseButKeepActive = (videoId: string) => {
    const player = playersRef.current[videoId]
    if (player) player.pause()
  }

  const pauseVideo = (videoId: string) => {
    const player = playersRef.current[videoId]
    if (player) {
      player.pause()
      if (activeVideoId === videoId) {
        setActiveVideoId(null)
      }
    }
  }

  return (
    <VideoPlayerContextProvider
      value={{
        activeVideoId,
        players: playersRef.current,
        mutedMap,
        setPlayer,
        toggleMute,
        isMuted,
        playOnly,
        pauseVideo,
        pauseButKeepActive,
      }}
    >
      {children}
    </VideoPlayerContextProvider>
  )
}
