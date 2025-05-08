import axios from "axios"

const network = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
})

network.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    const pathLocale = window.location.pathname.split("/")[1] || "en-US"
    config.params = {
      ...config.params,
      language: pathLocale,
    }
  }
  return config
})

network.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error)
  }
)

export { network }
