import organizations from "../../../constants/organizations"
import Image from "next/image"
const OrganizationCircles = () => {
  return (
    <div className="flex justify-center">
      {organizations.map((org) => (
        <a
          key={org.id}
          href={org.websiteURL}
          target="_blank"
          rel="noopener noreferrer">
          <div
            key={org.id}
            className="w-40 h-40 rounded-full  m-3 transition-transform duration-300 ease-in-out hover:scale-110">
            <Image src={org.image} alt={org.alt} width={150} height={150} />
          </div>
        </a>
      ))}
    </div>
  )
}

export default OrganizationCircles
