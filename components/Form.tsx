const Form = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <form>
        <div className="mb-4">
          <input
            type="text"
            className="border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none "
            id="caseName"
            placeholder="Enter case name"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="border rounded w-full h-40 py-2 px-3 text-gray-600 leading-tight focus:outline-none"
            id="caseDescription"
            placeholder="Enter case description"
          />
        </div>
        <button
          type="submit"
          className="bg-red-600 text-whitw font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
