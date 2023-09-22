import { ReactNode } from "react"

const LoginLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="login-layout">
      <div className="login-layout__content">{children}</div>
    </div>
  )
}

export default LoginLayout
