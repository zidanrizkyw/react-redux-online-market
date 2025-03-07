import { AxiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const useHydration = () => {
    const [isHydrated, setIsHydrated] = useState(false)
    const dispatch = useDispatch()

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");

      if (!currentUser) return;

      const userResponse = await AxiosInstance.get("/user/" + currentUser);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data.username,
          id: userResponse.data.id,
          role: userResponse.data.role
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsHydrated(true)
    }
  }

  useEffect(() => {
    hydrateAuth()
  }, [])

  return {
    isHydrated,
  }
}