"use client"

import { popularMoviesOptions } from "@/application/useCases/moviesOptions"
import { useSuspenseQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/components/Carousel"
import { TopTrailer } from "@/ui/components/TopTrailer"
import {
  HoverPreviewContent,
  HoverPreviewRoot,
  HoverPreviewTrigger,
} from "@/ui/components/HoverPreview"
import { MovieHoverCard } from "@/ui/components/MovieHoverCard"
import Image from "next/image"
import { genreMoviesOptions } from "@/application/useCases/genreOptions"

export const HomePage = () => {
  const { data, isLoading } = useSuspenseQuery(popularMoviesOptions)
  const { data: genreMoviesData } = useSuspenseQuery(genreMoviesOptions)

  const movieVideo = useMemo(() => {
    const video = data.filter(({ backdropPath }) => !!backdropPath)
    return video[0]
  }, [data])

  const moviePoplars = useMemo(
    () =>
      data.map(({ genreIds, ...others }) => {
        const genres = genreMoviesData
          .filter(({ id }) => genreIds.includes(id))
          .map(({ name }) => name)
        return { ...others, genreIds, genres }
      }),
    [data, genreMoviesData]
  )

  if (isLoading) return <div>...isLoading</div>
  return (
    <div>
      {movieVideo.id && <TopTrailer movieId={movieVideo.id} />}

      <p className='text-white font-bold text-4xl pb-2'>Popular on Netflix</p>
      <Carousel
        opts={{
          loop: true,
          align: "start",
          skipSnaps: false,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-4'>
          {moviePoplars.map((movie, index) => (
            <CarouselItem className='px-2 basis-[289px]' key={index}>
              <HoverPreviewRoot>
                <HoverPreviewTrigger>
                  <div className='relative w-full h-[219px] rounded-[5px]'>
                    <Image
                      src={movie.posterUrl}
                      alt={movie.title}
                      className='object-center object-cover'
                      fill
                    />
                  </div>
                </HoverPreviewTrigger>
                <HoverPreviewContent>
                  <MovieHoverCard
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
          className='w-34 [&>svg]:hidden hover:[&>svg]:block bg-transparent hover:bg-black/40 h-full rounded-none left-0 text-white'
        />
        <CarouselNext
          variant='link'
          className='w-34 [&>svg]:hidden hover:[&>svg]:block bg-transparent hover:bg-black/40 h-full rounded-none right-0 text-white'
        />
      </Carousel>
    </div>
  )
}
