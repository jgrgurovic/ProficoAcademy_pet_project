import Image from "next/image"
import Link from "next/link"
import dummyLikes from "../../../config/dummyLikes"

const LikedSection = () => {
  return (
    <section className=" flex-col m-12">
      <div className="flex justify-between">
        <div className="ml-0">
          <Link
            href="/profile/liked_items"
            className="text-white text-3xl tracking-wide hover:underline">
            Your Likes
          </Link>
        </div>
        <div className="mr-0 ml-auto">
          <Link
            href="/profile/liked_items"
            className="text-gray-400 hover:underline">
            Display all
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-12 group">
        {dummyLikes.map((likes) => (
          <div
            key={likes.id}
            className="bg-white/10  hover:shadow-2xl rounded-lg overflow-hidden shadow-md mb-4 transform transition-transform duration-300 group-hover:scale-90 hover:!scale-110">
            <Link href={likes.url} target="_blank" rel="noopener noreferrer">
              <div className="p-4 group-hover:blur-sm hover:!blur-none">
                <Image src="" alt={likes.title} width={100} height={200} />
                <h3 className="text-lg font-semibold mt-2">{likes.title}</h3>
                <p className="text-gray-600">{likes.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
export default LikedSection
