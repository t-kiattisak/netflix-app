import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import { Topbar } from "@/ui/components/layouts/Topbar"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Head from "next/head"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Netflix",
  description: "Netflix app",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      <Head>
        <link rel='preconnect' href='https://www.youtube.com' />
        <link rel='preconnect' href='https://img.youtube.com' />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <NextIntlClientProvider>
          <Topbar />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
