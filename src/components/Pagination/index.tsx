import React, { FC, useMemo } from "react"
import { MAX_VISIBLE_PAGES } from "@config/constants"
import { compute } from "@utils/static/compute"

interface PaginationProps {
  page?: number | null
  perPage?: number | null
  totalItems: number
  setPagination: (pagination: { page?: number; perPage?: number }) => void
  onPageChange: (newPage: number) => void
}

const Pagination: FC<PaginationProps> = ({
  page,
  perPage,
  totalItems,
  setPagination,
  onPageChange,
}) => {
  const currentPage: number = page ?? 1
  const itemsPerPage: number = perPage ?? 9

  const maxVisiblePages = MAX_VISIBLE_PAGES
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handlePageChange = (newPage: number) => {
    setPagination({ page: newPage })
    onPageChange(newPage)
  }

  const renderPageNumbers = useMemo(() => {
    const pageNumbers = []
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2)
    const [startPage, endPage] = compute<[number, number]>(() => {
      const halfPoint = Math.max(currentPage - halfMaxVisiblePages, 1)
      const lastPage = maxVisiblePages - 1
      const calculatedEndPage = Math.min(
        halfPoint + maxVisiblePages - 1,
        totalPages
      )
      const calculatedStartPage =
        calculatedEndPage - halfPoint < lastPage
          ? Math.max(calculatedEndPage - maxVisiblePages + 1, 1)
          : halfPoint

      return [calculatedStartPage, calculatedEndPage]
    })

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

    Array.from({ length: endPage - startPage + 1 }).forEach((_, index) => {
      const i = startPage + index
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
    })

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
  }, [page, totalItems])

  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-4 py-2 mx-2 bg-black/20 text-white rounded-full hover:bg-black/60 ${
          currentPage <= 1 ? "disabled:invisible" : ""
        }`}>
        Previous
      </button>
      {renderPageNumbers}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 mx-2 bg-black/20 text-white rounded-full hover:bg-black/60 ${
          currentPage >= totalPages ? "disabled:invisible" : ""
        }`}>
        Next
      </button>
    </div>
  )
}

export default Pagination
