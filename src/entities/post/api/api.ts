import { axiosClient } from "../../../shared/api/client"

import { User } from "../../user/types"
import { Post, Tag } from "../types"

export async function fetchPosts(skip: number, limit: number): Promise<{ posts: Post[]; total: number }> {
  const { data: postData } = await axiosClient.get(`/api/posts?limit=${limit}&skip=${skip}`)
  const { data: userData } = await axiosClient.get("/api/users?limit=0&select=username,image")

  const postsWithAuthor = postData.posts.map((post: Post) => ({
    ...post,
    author: userData.users.find((u: User) => u.id === post.userId),
  }))

  return { posts: postsWithAuthor, total: postData.total }
}

export async function fetchPostsByTag(tag: string): Promise<{ posts: Post[]; total: number }> {
  const { data: postData } = await axiosClient.get(`/api/posts/tag/${tag}`)
  const { data: userData } = await axiosClient.get("/api/users?limit=0&select=username,image")

  const postsWithAuthor = postData.posts.map((post: Post) => ({
    ...post,
    author: userData.users.find((u: User) => u.id === post.userId),
  }))

  return { posts: postsWithAuthor, total: postData.total }
}

export async function fetchPostsBySearch(query: string): Promise<{ posts: Post[]; total: number }> {
  const { data } = await axiosClient.get(`/api/posts/search?q=${query}`)
  return data
}

export async function fetchTags(): Promise<Tag[]> {
  const { data } = await axiosClient.get("/api/posts/tags")
  return data
}

export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const payload = {
    ...post,
    userId: 1, // 기본 유저 설정
  }
  const { data } = await axiosClient.post("/api/posts/add", payload)
  return data
}

export async function updatePost(post: Post): Promise<Post> {
  const { data } = await axiosClient.put(`/api/posts/${post.id}`, post)
  return data
}

export async function deletePost(id: number): Promise<void> {
  await axiosClient.delete(`/api/posts/${id}`)
}
