"use client"
import { useRouter } from "next/navigation"
import { FC, PropsWithChildren, useEffect, useState } from "react"

const ProtectedHoC: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  return isAuthenticated ? children : null
}

export default ProtectedHoC
