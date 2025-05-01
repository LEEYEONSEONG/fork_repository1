import { useQuery } from "@tanstack/react-query"

import { fetchUserList, fetchUserDetail } from "../api/api"

export const useUserListQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUserList,
  })
}

export const useUserDetailQuery = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserDetail(userId),
    enabled: !!userId,
  })
}
