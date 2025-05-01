import axios from "axios"

export const axiosClient = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
})
