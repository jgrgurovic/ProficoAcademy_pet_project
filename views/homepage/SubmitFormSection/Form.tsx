"use client"
import React, { useEffect, useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"

interface FormData {
  email: string
  caseTitle: string
  caseStory: string
}

export function CaseForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    trigger,
  } = useForm<FormData>()
  const [emailFieldInteracted, setEmailFieldInteracted] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  useEffect(() => {
    trigger("email")
  }, [trigger, watch("email")])

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newSubmission = {
      id: new Date().getTime(),
      ...data,
    }
    const existingSubmissions: any[] = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    )

    existingSubmissions.push(newSubmission)

    localStorage.setItem("submissions", JSON.stringify(existingSubmissions))

    setEmailFieldInteracted(false)
    setSubmissionSuccess(true)

    reset({}, { keepValues: false })
    setTimeout(() => {
      setSubmissionSuccess(false)
    }, 5000)
    const emailInput = document.querySelector(
      'input[name="email"]'
    ) as HTMLInputElement
    const caseTitleInput = document.querySelector(
      'input[name="caseTitle"]'
    ) as HTMLInputElement
    const caseStoryTextarea = document.querySelector(
      'textarea[name="caseStory"]'
    ) as HTMLTextAreaElement

    if (emailInput && caseTitleInput && caseStoryTextarea) {
      emailInput.value = ""
      caseTitleInput.value = ""
      caseStoryTextarea.value = ""
    }
  }

  const handleEmailFieldFocus = () => {
    setEmailFieldInteracted(true)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        key={submissionSuccess.toString()}
        onSubmit={handleSubmit(onSubmit)}>
        <div className="w-3/4">
          <label>Email:</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <div>
                <input
                  {...field}
                  type="text"
                  placeholder="Email"
                  value={field.value}
                  className="border rounded w-full h-45 py-2 px-3 text-black leading-tight focus:outline-none"
                  onFocus={handleEmailFieldFocus}
                  autoComplete="off"
                />
                {emailFieldInteracted && errors.email && (
                  <p className="text-mainRed font-bold">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-2"
                    />
                    {errors.email.message}!
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <div className="w-3/4">
          <label>Case Title:</label>
          <Controller
            name="caseTitle"
            control={control}
            rules={{ required: "Case Title is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Case Title"
                value={field.value}
                className="border rounded w-full h-45 py-2 px-3 text-black leading-tight focus:outline-none"
                autoComplete="off"
              />
            )}
          />
          {errors.caseTitle && (
            <p className="text-mainRed font-bold">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
              {errors.caseTitle.message}!
            </p>
          )}
        </div>

        <div>
          <label>Case Story:</label>
          <Controller
            name="caseStory"
            control={control}
            rules={{ required: "Case Story is required" }}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Case Story"
                value={field.value}
                className="border rounded w-full h-60 py-2 px-3 text-black leading-tight focus:outline-none"
                autoComplete="off"
              />
            )}
          />
          {errors.caseStory && (
            <p className="text-mainRed font-bold">
              <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
              {errors.caseStory.message}!
            </p>
          )}
        </div>
        <div className="flex items-center">
          <button
            type="submit"
            className="rounded-md text-white font-semibold bg-red p-2 mt-2 hover:scale-105">
            Submit
          </button>

          {submissionSuccess && (
            <p className="text-green-600 font-bold ml-3 ">
              Submission successful!
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
