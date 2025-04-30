import { User } from "../types"

export async function fetchUserList(): Promise<User[]> {
  const res = await fetch("/api/users?limit=0&select=username,image")
  const data = await res.json()
  return data.users
}

export async function fetchUserDetail(userId: number): Promise<User> {
  const res = await fetch(`/api/users/${userId}`)
  return await res.json()
}
