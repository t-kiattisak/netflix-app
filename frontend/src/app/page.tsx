import { HomePage } from "../ui/screens/home/HomePage"

// import { getQueryClient } from "@/infrastructure/query/queryClient"
// import { popularMoviesOptions } from "@/application/use-cases/popularMovies.options"
// import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
/**
 * คอมโพเนนต์ `Home` เป็นคอมโพเนนต์ที่เรนเดอร์ฝั่งเซิร์ฟเวอร์
 * เมื่อคอมโพเนนต์นี้ถูกเรนเดอร์ จะมีการดำเนินการฝั่งเซิร์ฟเวอร์
 * เช่น การ prefetch ข้อมูลโดยใช้ `getQueryClient` และ `prefetchQuery`
 * เพื่อให้มั่นใจว่าข้อมูลที่ต้องการพร้อมใช้งานก่อนที่คอมโพเนนต์
 * จะถูก hydrate บนฝั่งไคลเอนต์
 *
 * `HydrationBoundary` ถูกใช้เพื่อส่งสถานะ dehydrated ของ query client
 * ไปยังฝั่งไคลเอนต์เพื่อการ hydrate ที่ราบรื่น
 */
// export default function Home() {
//   const queryClient = getQueryClient()
//   queryClient.prefetchQuery(popularMoviesOptions)
//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <HomePage />
//     </HydrationBoundary>
//   )
// }

export default function Home() {
  return <HomePage />
}
