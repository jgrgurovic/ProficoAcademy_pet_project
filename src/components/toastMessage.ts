import { toast } from "react-toastify"

export const showToast = (message: React.ReactNode) => {
  toast.warn(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "text-white rounded-3xl",
  })
}
