import React from "react"
import CasesCard from "./Card"

const FeaturedCasesSection = () => {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold tracking-widest mt-4">
        Featured Cases
      </h1>
      <div className="flex justify-center my-24 mx-24 space-x-48">
        <CasesCard />
        <CasesCard />
      </div>
    </div>
  )
}
export default FeaturedCasesSection
