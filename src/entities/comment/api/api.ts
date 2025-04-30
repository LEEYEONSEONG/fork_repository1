import { Comment } from "../types"

export async function fetchComments(postId: number): Promise<Comment[]> {
  const res = await fetch(`/api/comments/post/${postId}`)
  const data = await res.json()
  return data.comments
}

export async function addComment(comment: {
  body: string
  postId: number
  userId: number
  likes: number
}): Promise<Comment> {
  const res = await fetch("/api/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })
  if (!res.ok) throw new Error("댓글 추가 실패")
  return await res.json()
}

export async function updateComment(id: number, body: string): Promise<Comment> {
  const res = await fetch(`/api/comments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body }),
  })
  return await res.json()
}

export async function deleteComment(id: number): Promise<void> {
  await fetch(`/api/comments/${id}`, {
    method: "DELETE",
  })
}

export async function likeComment(id: number, likes: number): Promise<Comment> {
  const res = await fetch(`/api/comments/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })
  return await res.json()
}
