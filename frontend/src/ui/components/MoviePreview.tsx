import Image from "next/image"
import { Play, Plus, ThumbsUp, VolumeX, Flame, Volume2 } from "lucide-react"
import { YoutubePlayer } from "./YoutubePlayer"
import { useVideoPlayer } from "@/presentation/providers/VideoPlayerProvider"
import { useEffect } from "react"

type MoviePreviewProps = {
  backdropUrl: string
  videoId?: string
  year: string
  maturityRating: string
  genre: string
  description: string
}

export function MoviePreview({ preview }: { preview: MoviePreviewProps }) {
  const { videoId, backdropUrl, year, maturityRating, genre, description } =
    preview

  const { toggleMute, isMuted, pauseVideo, playOnly } = useVideoPlayer()

  useEffect(() => {
    if (videoId) playOnly(videoId)
    return () => {
      if (videoId) pauseVideo(videoId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='w-full'>
      <div className='relative w-full aspect-video'>
        {videoId ? (
          <YoutubePlayer videoId={videoId} />
        ) : (
          <Image
            src={backdropUrl}
            alt='backdrop'
            fill
            sizes='(min-width: 60em) 24vw,(min-width: 28em) 45vw, 100vw'
            className='object-cover'
          />
        )}

        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 z-50'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <button className='flex items-center bg-white text-black px-4 py-2 rounded-sm font-semibold text-sm'>
                <Play className='w-5 h-5 mr-2' /> Play
              </button>
              <button className='rounded-full border p-2 border-white'>
                <Plus className='w-5 h-5 text-white' />
              </button>
              <button className='rounded-full border p-2 border-white'>
                <ThumbsUp className='w-5 h-5 text-white' />
              </button>
              {videoId && (
                <button
                  onClick={() => toggleMute(videoId)}
                  className='ml-auto rounded-full border p-2 border-white bg-black/60 hover:bg-white/20 transition'
                >
                  {isMuted(videoId) ? (
                    <VolumeX className='w-5 h-5 text-white' />
                  ) : (
                    <Volume2 className='w-5 h-5 text-white' />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex p-6 space-x-2'>
        <div className='text-white space-y-4 flex-1'>
          <div className='flex items-center gap-3 text-sm'>
            <span className='text-green-400 font-semibold flex items-center'>
              <Flame className='w-4 h-4 mr-1' /> Most Liked
            </span>
            <span className='text-gray-400'>{year}</span>
            <span className='border px-1'>{maturityRating}</span>
            <span className='text-sm text-gray-400'>HD</span>
          </div>

          <p className='text-sm'>{description}</p>
        </div>

        <div className='text-sm text-gray-300 min-w-32'>
          <p>
            <span className='text-gray-400'>Genres: </span>
            {genre}
          </p>
        </div>
      </div>
    </div>
  )
}
