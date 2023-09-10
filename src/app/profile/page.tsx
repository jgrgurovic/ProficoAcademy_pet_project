"use client"

import useAuth from "@/hooks/useAuth"

const ProfilePage = () => {
  const { user, loading, error } = useAuth()

  if (loading) return <div>Loading...</div>

  if (error) return <div>{error}</div>

  if (!loading && !user) return <div>Not logged in</div>

  if (!user) {
    // added for TS, should not happen
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  return (
    <section className=" bg-[#071e34] flex font-medium items-center justify-center h-screen">
      <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">2d ago</span>
          <span className="text-emerald-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </span>
        </div>
        <div className="mt-6 w-fit mx-auto">
          <img
            src={user.avatar}
            className="rounded-full w-28 "
            alt="profile picture"
          />
        </div>

        <div className="mt-8 ">
          <h2 className="text-white font-bold text-2xl tracking-wide">
            {user.name.split(" ")[0]} <br /> {user.name.split(" ")[1]}
          </h2>
        </div>
        <p className="text-emerald-400 font-semibold mt-2.5">Active</p>

        <div className="h-1 w-full bg-black mt-8 rounded-full">
          <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
        </div>
        <div className="mt-3 text-white text-sm">
          <span className="text-gray-400 font-semibold">Storage:</span>
          <span>40%</span>
        </div>
        <button
          className="mt-8 bg-emerald-400 text-white font-semibold py-2 px-4 rounded-full"
          onClick={handleLogout}>
          Logout
        </button>
      </section>
    </section>
  )
}

export default ProfilePage
