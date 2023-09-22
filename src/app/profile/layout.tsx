import ProtectedHoC from "@/components/ProtectedHOC"
import { FC, PropsWithChildren } from "react"

const ProfilePage: FC<PropsWithChildren> = ({ children }) => {
  return <ProtectedHoC>{children}</ProtectedHoC>
}

export default ProfilePage
