import { useMutation, useQueryClient } from "@tanstack/react-query"

import { addComment, updateComment, deleteComment, likeComment } from "../api/api"
import { Comment } from "../types"

export const useAddCommentMutation = () => {
  // const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addComment,
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    // },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => updateComment(id, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comments", data.postId] })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteComment(id),
    onMutate: async ({ id, postId }) => {
      await queryClient.cancelQueries({ queryKey: ["comments", postId] })

      const previousComments = queryClient.getQueryData<Comment[]>(["comments", postId])

      queryClient.setQueryData<Comment[]>(["comments", postId], (old = []) => old.filter((c) => c.id !== id))

      return { previousComments }
    },
  })
}

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onMutate: async ({ id }) => {
      // 옵티미스틱 UI
      const matchingQuery = queryClient
        .getQueryCache()
        .findAll({ queryKey: ["comments"] })
        .find((query) => {
          const data = queryClient.getQueryData<Comment[]>(query.queryKey as [string, number])
          return data?.some((comment) => comment.id === id)
        })

      const postId = (matchingQuery?.queryKey as [string, number])?.[1]

      if (postId === undefined) return

      const previousComments = queryClient.getQueryData<Comment[]>(["comments", postId])

      queryClient.setQueryData<Comment[]>(["comments", postId], (old = []) =>
        old.map((comment) => (comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment)),
      )

      return { previousComments, postId }
    },
  })
}
