export interface BaseResponse<T> {
  success: boolean
  data: T
  message: string
  timestamp: string
}
