import Link from "next/link"
import { FaSearch } from "react-icons/fa"
import NavigationBar from "./NavigationBar"

const NavigationHeader = () => {
  return (
    <div className="bg-black py-1">
      <div className="container mx-auto flex justify-between items-center py-2">
        <NavigationBar />
        <form className="flex items-center space-x-2 ml-auto">
          <div className="relative">
            <input
              type="text"
              className="py-1 px-3 pr-10 text-white border-none bg-opacity-10 bg-gray-300 rounded-lg focus:outline-none"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaSearch className="text-white" />
            </div>
          </div>
        </form>
        <div className="ml-auto">
          <Link href="/login" className="text-xl text-white">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavigationHeader
