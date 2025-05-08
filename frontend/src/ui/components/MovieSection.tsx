"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/components/Carousel"
import {
  HoverPreviewRoot,
  HoverPreviewTrigger,
  HoverPreviewContent,
} from "@/ui/components/HoverPreview"
import Image from "next/image"
import { MovieHoverCard } from "@/ui/components/MovieHoverCard"

type MovieSectionProps = {
  title: string
  movies: {
    id: number
    title: string
    posterUrl: string
    match: number
    genres: string[]
  }[]
}

export const MovieSection = ({ title, movies }: MovieSectionProps) => {
  return (
    <div>
      <p className='text-white font-bold text-sm md:text-2xl pb-2 pl-4'>
        {title}
      </p>
      <Carousel
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
          slidesToScroll: 6,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-4'>
          {movies.map((movie, index) => (
            <CarouselItem
              className='px-2 basis-[150px] md:basis-[220px]'
              key={index}
            >
              <HoverPreviewRoot>
                <HoverPreviewTrigger>
                  <div className='relative w-full h-[180px] rounded-[5px]'>
                    <Image
                      src={movie.posterUrl}
                      alt={movie.title}
                      className='object-center object-cover'
                      fill
                      sizes='(min-width: 60em) 24vw,(min-width: 28em) 45vw, 100vw'
                    />
                  </div>
                </HoverPreviewTrigger>
                <HoverPreviewContent>
                  <MovieHoverCard
                    movieID={movie.id}
                    posterUrl={movie.posterUrl}
                    title={movie.title}
                    duration='1h 49m'
                    maturityRating='16+'
                    matchPercentage={`${movie.match}%`}
                    genres={movie.genres}
                  />
                </HoverPreviewContent>
              </HoverPreviewRoot>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          variant='link'
          className='w-fit md:w-34 [&>svg]:hidden hover:[&>svg]:block bg-transparent hover:bg-black/40 h-full rounded-none left-0 text-white'
        />
        <CarouselNext
          variant='link'
          className='w-fit md:w-34 [&>svg]:hidden hover:[&>svg]:block bg-transparent hover:bg-black/40 h-full rounded-none right-0 text-white'
        />
      </Carousel>
    </div>
  )
}
