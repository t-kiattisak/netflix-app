import Image from "next/image"
import { Play, Plus, ThumbsUp, VolumeX, Flame } from "lucide-react"

type Episode = {
  id: number
  title: string
  duration: string
  thumbnailUrl: string
  description: string
}

type MoviePreviewProps = {
  backdropUrl: string
  year: number
  episodeCount: number
  maturityRating: string
  genre: string
  cast: string
  description: string
  episodes: Episode[]
}

export function MoviePreview({ preview }: { preview: MoviePreviewProps }) {
  const {
    backdropUrl,
    year,
    episodeCount,
    maturityRating,
    genre,
    cast,
    description,
    episodes,
  } = preview
  return (
    <div className='w-full'>
      <div className='relative w-full aspect-video'>
        <Image src={backdropUrl} alt='backdrop' fill className='object-cover' />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6'>
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-2'>
              <button className='flex items-center bg-white text-black px-4 py-2 rounded-md font-semibold text-sm'>
                <Play className='w-5 h-5 mr-2' /> Play
              </button>
              <button className='rounded-full border p-2 border-white'>
                <Plus className='w-5 h-5 text-white' />
              </button>
              <button className='rounded-full border p-2 border-white'>
                <ThumbsUp className='w-5 h-5 text-white' />
              </button>
              <button className='ml-auto rounded-full border p-2 border-white'>
                <VolumeX className='w-5 h-5 text-white' />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='p-6 text-white space-y-4'>
        <div className='flex items-center gap-3 text-sm'>
          <span className='text-green-400 font-semibold flex items-center'>
            <Flame className='w-4 h-4 mr-1' /> Most Liked
          </span>
          <span className='text-gray-400'>{year}</span>
          <span>{episodeCount} Episodes</span>
          <span className='border px-1'>{maturityRating}</span>
          <span className='text-sm text-gray-400'>HD</span>
        </div>

        <p className='text-sm'>{description}</p>

        <div className='text-sm text-gray-300'>
          <p>
            <span className='text-gray-400'>Cast: </span>
            {cast}
          </p>
          <p>
            <span className='text-gray-400'>Genres: </span>
            {genre}
          </p>
        </div>

        <div className='pt-4'>
          <h4 className='text-lg font-semibold mb-3'>Episodes</h4>
          <div className='space-y-4'>
            {episodes.map((ep) => (
              <div key={ep.id} className='flex gap-4'>
                <div className='relative w-28 aspect-video'>
                  <Image
                    src={ep.thumbnailUrl}
                    alt={ep.title}
                    fill
                    className='rounded-md object-cover'
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='font-semibold'>{ep.title}</p>
                  <p className='text-sm text-gray-400'>{ep.duration}</p>
                  <p className='text-xs text-gray-300'>{ep.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
