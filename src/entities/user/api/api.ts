import { axiosClient } from "../../../shared/api/client"

import { User } from "../types"

export async function fetchUserList(): Promise<User[]> {
  const { data } = await axiosClient.get("api/users", {
    params: { limit: 0, select: "username,image" },
  })
  return data.users
}

export async function fetchUserDetail(userId: number): Promise<User> {
  const { data } = await axiosClient.get(`api/users/${userId}`)
  return data
}
