import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css"
import Footer from "@/components/Footer"
import NavigationHeader from "@/components/Navigation"

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
        <ToastContainer />
        <div className="z-10">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
