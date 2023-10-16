import OrganizationCircles from "./OrganizationCircles"

const OrganizationsSection = () => {
  return (
    <div>
      <div className="text-center mt-48">
        <h2 className="italic m-24 text-2xl">
          Thanks to our fans who visit every week, we have been able to support
          the following organizations:
        </h2>
      </div>
      <OrganizationCircles />
    </div>
  )
}

export default OrganizationsSection
