import Api from "@/api"
import { User } from "../db"
import { useEffect, useState } from "react"

export enum UseUserError {
  Unauthorized = "Unauthorized",
  Unknown = "Unknown",
}

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<UseUserError | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setLoading(false);
      setError(UseUserError.Unknown);
      return;
    }
  
    Api.getInstance
    .self(token)
    .then((data) => {
      console.log("API Success:", data);
      setUser(data.user);
      setLoading(false);
    })
    .catch((error) => {
      console.error("API Error:", error);
      setError(UseUserError.Unauthorized);
      setLoading(false);
    });
  
  }, []);
  
  return { user, loading, error }
}

export default useAuth;
