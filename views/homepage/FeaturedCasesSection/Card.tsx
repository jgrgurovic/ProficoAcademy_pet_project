import Image from "next/image"

const CasesCard = () => {
  return (
    <div className="max-w-sm mx-auto">
      <div className="card text-white backdrop-blur-md bg-opacity-30 backdrop-filter bg-white bg-opacity-10 p-3 rounded-md ">
        <Image
          className="card-img-top rounded-md"
          src="/images/bella_fiori_mm.jpg"
          alt="Card image cap"
          width={400}
          height={400}
        />
        <h1 className="card-header text-lg font-bold">Case title</h1>
        <div className="card-body">
          <h5 className="card-title text-sm font-light">Case description</h5>
        </div>
        <div className="mt-2 flex items-center justify-end">
          <button className="ml-2 bg-zinc-900 bg-opacity-60 text-white font-medium px-2 py-1 rounded-md">
            Read more
          </button>
        </div>
      </div>
    </div>
  )
}

export default CasesCard
