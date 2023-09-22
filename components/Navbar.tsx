import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex justify-between p-2">
      <ul className="flex justify-between">
        <li className="ml-12 flex justify-center items-center font-courier-prime text-xl text-white">
          <Link href="/">Home</Link>
        </li>
        <li className="ml-12 flex justify-center items-center font-courier-prime text-xl text-white">
          <Link href="">Cases</Link>
        </li>
        <li className="ml-12 flex justify-center items-center font-courier-prime text-xl text-white">
          <Link href="">Videos</Link>
        </li>
        <li className="ml-12 flex justify-center items-center font-courier-prime text-xl text-white">
          <Link href="">Podcasts</Link>
        </li>
      </ul>
      <form className="form-inline flex ">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"></input>
        <button
          className=" border border-red-600 text-red-600 py-2 px-4 rounded-lg transition-colors hover:bg-red-600 hover:text-white"
          type="submit">
          Search
        </button>
      </form>
      <div>
        <Link href="/login" className="mr-12 text-xl text-white">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Navbar
