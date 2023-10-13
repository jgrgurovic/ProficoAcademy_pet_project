"use client"
import NextAdapterApp from "next-query-params/app"
import { FC, PropsWithChildren } from "react"
import { QueryParamProvider } from "use-query-params"

const PodcastsPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>{children}</QueryParamProvider>
  )
}

export default PodcastsPage
