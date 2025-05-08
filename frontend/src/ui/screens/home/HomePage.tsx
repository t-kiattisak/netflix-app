"use client"

import {
  nowMovieOptions,
  popularMoviesOptions,
  recommendedMoviesOptions,
  top10MoviesInThailandOptions,
} from "@/application/useCases/moviesOptions"
import { useSuspenseQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"

import { TopTrailer } from "@/ui/components/TopTrailer"

import { genreMoviesOptions } from "@/application/useCases/genreOptions"
import { MovieSection } from "@/ui/components/MovieSection"

export const HomePage = () => {
  const { data, isLoading } = useSuspenseQuery(popularMoviesOptions)
  const { data: genreMoviesData } = useSuspenseQuery(genreMoviesOptions)
  const { data: recommendedMoviesData } = useSuspenseQuery(
    recommendedMoviesOptions
  )

  const { data: top10MoviesInThailandData } = useSuspenseQuery(
    top10MoviesInThailandOptions
  )

  const { data: nowMovieData } = useSuspenseQuery(nowMovieOptions)

  const movieVideo = useMemo(() => {
    const video = data.filter(({ backdropPath }) => !!backdropPath)
    return video[0]
  }, [data])

  const moviePoplars = useMemo(
    () =>
      recommendedMoviesData.map(({ genreIds, ...others }) => {
        const genres = genreMoviesData
          .filter(({ id }) => genreIds.includes(id))
          .map(({ name }) => name)
        return { ...others, genreIds, genres }
      }),
    [recommendedMoviesData, genreMoviesData]
  )

  const top10MoviesInThailand = useMemo(
    () =>
      top10MoviesInThailandData.map(({ genreIds, ...others }) => {
        const genres = genreMoviesData
          .filter(({ id }) => genreIds.includes(id))
          .map(({ name }) => name)
        return { ...others, genreIds, genres }
      }),
    [genreMoviesData, top10MoviesInThailandData]
  )

  const nowMovie = useMemo(
    () =>
      nowMovieData.map(({ genreIds, ...others }) => {
        const genres = genreMoviesData
          .filter(({ id }) => genreIds.includes(id))
          .map(({ name }) => name)
        return { ...others, genreIds, genres }
      }),
    [genreMoviesData, nowMovieData]
  )

  if (isLoading) return <div>...isLoading</div>
  return (
    <div>
      {movieVideo.id && <TopTrailer movieId={movieVideo.id} />}

      <div className='flex flex-col gap-10'>
        <MovieSection
          title='We Think You’ll Love These'
          movies={moviePoplars}
        />
        <MovieSection title='Now Movies' movies={nowMovie} />
        <MovieSection
          title='Top 10 Movies in Thailand Today'
          movies={top10MoviesInThailand}
        />
      </div>
    </div>
  )
}
