import { createNavigation } from "next-intl/navigation"
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en-US", "th-TH"],
  defaultLocale: "en-US",
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
