"use client"

import { useRef, useState } from "react"
import type { YouTubePlayer } from "react-youtube"
import { createSafeContext } from "./CreateSafeContext"

type VideoPlayerContextType = {
  players: Record<string, YouTubePlayer>
  mutedMap: Record<string, boolean>
  setPlayer: (videoId: string, player: YouTubePlayer) => void
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
  const playersRef = useRef<Record<string, YouTubePlayer>>({})
  const [mutedMap, setMutedMap] = useState<Record<string, boolean>>({})
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)

  const setPlayer = (videoId: string, player: YouTubePlayer) => {
    playersRef.current[videoId] = player
    player.mute()
    setActiveVideoId(videoId)
  }

  const toggleMute = (videoId: string) => {
    const player = playersRef.current[videoId]
    if (!player) return

    const currentlyMuted = mutedMap[videoId] ?? true
    if (currentlyMuted) {
      player.unMute()
    } else {
      player.mute()
    }
    setMutedMap((prev) => ({ ...prev, [videoId]: !currentlyMuted }))
  }

  const isMuted = (videoId: string) => mutedMap[videoId] ?? true

  const playOnly = (videoId: string) => {
    Object.entries(playersRef.current).forEach(([id, player]) => {
      try {
        if (id === videoId) {
          player.playVideo?.()
        } else {
          player.pauseVideo?.()
        }
      } catch (err) {
        console.warn("Video control failed for", id, err)
      }
    })
    setActiveVideoId(videoId)
  }

  const pauseButKeepActive = (videoId: string) => {
    const player = playersRef.current[videoId]
    player?.pauseVideo()
  }

  const pauseVideo = (videoId: string) => {
    try {
      const player = playersRef.current[videoId]
      if (player) {
        player.pauseVideo?.()
        if (activeVideoId === videoId) {
          setActiveVideoId(null)
        }
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
