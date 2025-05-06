"use client"

import { popularMoviesOptions } from "@/application/use-cases/moviesOptions"
import { useSuspenseQuery } from "@tanstack/react-query"
import React from "react"

export const HomePage = () => {
  const { data } = useSuspenseQuery(popularMoviesOptions)
  console.log("data", data)
  return <div>HomePage</div>
}
