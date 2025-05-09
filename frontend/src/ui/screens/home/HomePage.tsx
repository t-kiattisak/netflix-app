"use client"

import {
  nowMovieOptions,
  popularMoviesOptions,
  recommendedMoviesOptions,
  top10MoviesInThailandOptions,
} from "@/application/useCases/moviesOptions"
import { useSuspenseQuery } from "@tanstack/react-query"
import React, { useMemo } from "react"

const MovieSection = dynamic(
  () =>
    import("@/ui/components/MovieSection").then((m) => ({
      default: m.MovieSection,
    })),
  { loading: () => <div style={{ height: 200 }}>Loading section...</div> }
)

import { TopTrailer } from "@/ui/components/TopTrailer"

import { genreMoviesOptions } from "@/application/useCases/genreOptions"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"

export const HomePage = () => {
  const t = useTranslations("Home")
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
        <MovieSection title={t("weThinkYouLove")} movies={moviePoplars} />
        <MovieSection title={t("nowMovies")} movies={nowMovie} />
        <MovieSection
          title={t("top10Thailand")}
          movies={top10MoviesInThailand}
        />
      </div>
    </div>
  )
}
