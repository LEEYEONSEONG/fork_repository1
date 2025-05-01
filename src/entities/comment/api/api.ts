import { axiosClient } from "../../../shared/api/client"

import { Comment } from "../types"

export async function fetchComments(postId: number): Promise<Comment[]> {
  const { data } = await axiosClient.get(`/api/comments/post/${postId}`)
  return data.comments
}

export async function addComment(comment: {
  body: string
  postId: number
  userId: number
  likes: number
}): Promise<Comment> {
  const { data } = await axiosClient.post("/api/comments/add", comment)
  return data
}

export async function updateComment(id: number, body: string): Promise<Comment> {
  const { data } = await axiosClient.put(`/api/comments/${id}`, { body })
  return data
}

export async function deleteComment(id: number): Promise<void> {
  await axiosClient.delete(`/api/comments/${id}`)
}

export async function likeComment(id: number, likes: number): Promise<Comment> {
  const { data } = await axiosClient.patch(`/api/comments/${id}`, { likes })
  return data
}
