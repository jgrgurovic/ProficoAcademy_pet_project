"use client"
import React, { useState } from "react"

export const CaseForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    caseTitle: "",
    caseStory: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
  }

  return (
    <div className="flex items-center h-screen justify-center ">
      <form onSubmit={handleSubmit} className="p-4  rounded-lg shadow-md ">
        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full sm:w-2/3 py-2 px-3 text-black leading-tight focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="caseTitle"
            name="caseTitle"
            placeholder="Case name"
            value={formData.caseTitle}
            onChange={handleChange}
            className="border rounded w-full sm:w-2/3 py-2 px-3 text-black leading-tight focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <textarea
            id="caseStory"
            name="caseStory"
            placeholder="About the case ..."
            rows={10}
            cols={40}
            value={formData.caseStory}
            onChange={handleChange}
            className=" border rounded w-full h-45 py-2 px-3 text-black leading-tight focus:outline-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline hover:scale-110"
            style={{ backgroundColor: "#ac0000" }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
