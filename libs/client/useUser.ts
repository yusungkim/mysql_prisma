import { VerifiedUserResponse } from "@api/users/me"
import { useRouter } from "next/router"
import { useEffect } from "react"
import useSWR from "swr"

export default function useUser(isPravatePage = false) {
  const router = useRouter()
  const { data, error } = useSWR<VerifiedUserResponse>("/api/users/me")

  useEffect(()=>{
    if (isPravatePage && data && !data.ok) {
      console.log("Please login")
      router.push("/login")
    }
  }, [isPravatePage, router, data])

  return { user: data?.user, loading: !Boolean(data) && !Boolean(error)}
}