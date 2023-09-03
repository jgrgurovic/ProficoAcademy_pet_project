import Image from "next/image"
const Card = () => {
  return (
    <div className="card text-white bg-white bg-opacity-25 ">
      <Image
        className="card-img-top"
        src="/bella_fiori_mm.jpg"
        alt="Card image cap"
        width={100}
        height={100}
      />
      <div className="card-header">Where is Leigh Occhi?</div>
      <div className="card-body">
        <h5 className="card-title ">Bella Fiori</h5>
        <p className="card-text">Where is Leigh Occhi?</p>
      </div>
    </div>
  )
}

export default Card
