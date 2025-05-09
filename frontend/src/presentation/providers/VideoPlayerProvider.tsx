"use client"

import { useRef, useState } from "react"
import { createSafeContext } from "./CreateSafeContext"

type SimplePlayer = {
  playVideo?: () => void
  pauseVideo?: () => void
  mute?: () => void
  unMute?: () => void
}

type VideoPlayerContextType = {
  players: Record<string, SimplePlayer>
  mutedMap: Record<string, boolean>
  setPlayer: (videoId: string, player?: SimplePlayer) => void
  toggleMute: (videoId: string) => void
  setMute: (videoId: string, muted: boolean) => void
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
  const playersRef = useRef<Record<string, SimplePlayer>>({})
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({})
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const setPlayer = (videoId: string, player?: SimplePlayer) => {
    if (player) playersRef.current[videoId] = player
    setActiveVideoId(videoId)
  }

  const toggleMute = (videoId: string) => {
    const player = playersRef.current[videoId]
    if (!player) return

    const currentlyMuted = mutedMap[videoId] ?? true
    setMute(videoId, !currentlyMuted)
  }

  const setMute = (videoId: string, muted: boolean) => {
    const player = playersRef.current[videoId]
    if (!player) return

    if (muted) {
      player.mute?.()
    } else {
      player.unMute?.()
    }

    setMutedMap((prev) => ({ ...prev, [videoId]: muted }))
  }

  const isMuted = (videoId: string) => mutedMap[videoId] ?? true

  const playOnly = (videoId: string) => {
    Object.entries(playersRef.current).forEach(([id, player]) => {
      try {
        if (id === videoId) {
          player?.playVideo?.()
        } else {
          player?.pauseVideo?.()
        }
      } catch (err) {
        console.warn("Video control failed for", id, err)
      }
    })
    setActiveVideoId(videoId)
  }

  const pauseButKeepActive = (videoId: string) => {
    playersRef.current[videoId]?.pauseVideo?.()
  }

  const pauseVideo = (videoId: string) => {
    try {
      const player = playersRef.current[videoId]
      player?.pauseVideo?.()
      if (activeVideoId === videoId) {
        setActiveVideoId(null)
      }
    } catch (err) {
      console.warn("Failed to pause video:", err)
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
        setMute,
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
