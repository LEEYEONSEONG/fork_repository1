import { useQuery } from "@tanstack/react-query"

import { fetchPosts, fetchPostsBySearch, fetchPostsByTag, fetchTags } from "../api/api"

import { UsePostsQueryParams } from "../types"

export const usePostsQuery = ({ skip, limit, search, tag }: UsePostsQueryParams) => {
  return useQuery({
    queryKey: ["posts", { skip, limit, search, tag }],
    queryFn: () => {
      if (tag) return fetchPostsByTag(tag)
      if (search) return fetchPostsBySearch(search)
      return fetchPosts(skip, limit)
    },
  })
}

export const usePostsBySearchQuery = (query: string) => {
  return useQuery({
    queryKey: ["posts", "search", query],
    queryFn: () => fetchPostsBySearch(query),
    enabled: !!query,
  })
}

export const usePostsByTagQuery = (tag: string) => {
  return useQuery({
    queryKey: ["posts", "tag", tag],
    queryFn: () => fetchPostsByTag(tag),
    enabled: !!tag,
  })
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  })
}
