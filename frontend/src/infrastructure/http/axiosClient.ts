import axios from "axios"

const network = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
})

network.interceptors.request.use((config) => {
  return config
})

network.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error)
  }
)

export { network }
