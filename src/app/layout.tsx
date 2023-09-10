import { Footer } from "@/components"
import {NavigationHeader} from "@/components"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"

export const metadata = {
  title: "True Crime",
  description: "Discover true crime stories.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="relative">
        <NavigationHeader />
        <div className="z-10">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
