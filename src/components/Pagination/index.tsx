import React, { FC } from "react"

interface PaginationProps {
  page?: number | null
  perPage?: number | null
  totalItems: number
  setPagination: (pagination: { page?: number; perPage?: number }) => void
  onPageChange: (newPage: number) => void
  maxVisiblePages?: number
}

const Pagination: FC<PaginationProps> = ({
  page,
  perPage,
  totalItems,
  setPagination,
  onPageChange,
  maxVisiblePages = 4,
}) => {
  if (!page || !perPage) return null

  const totalPages = Math.ceil(totalItems / perPage)

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage })
    onPageChange(newPage)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
    let startPage = Math.max(page - halfMaxVisiblePages, 1)
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages)

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1)
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 mx-2 bg-black/20 text-white rounded-full hover:bg-black/60">
          1
        </button>
      )

      if (startPage > 2) {
        pageNumbers.push(<span key="ellipsis-start">...</span>)
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-2 ${
            i === page
              ? "bg-black/60 text-white"
              : "bg-black/20 text-white hover:bg-black/60"
          } rounded-full`}>
          {i}
        </button>
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="ellipsis-end">...</span>)
      }

      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 mx-2 bg-black/20 text-white rounded-full hover:bg-black/60">
          {totalPages}
        </button>
      )
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className={`px-4 py-2 mx-2 bg-black/20 text-white rounded-full hover:bg-black/60 ${
          page <= 1 ? "disabled:invisible" : ""
        }`}>
        Previous
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page >= totalPages}
        className={`px-4 py-2 mx-2 bg-black/20 text-white rounded-full hover:bg-black/60 ${
          page >= totalPages ? "disabled:invisible" : ""
        }`}>
        Next
      </button>
    </div>
  )
}

export default Pagination
