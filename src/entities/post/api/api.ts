import { User } from "../../user/types"
import { Post, Tag } from "../types"

export async function fetchPosts(skip: number, limit: number): Promise<{ posts: Post[]; total: number }> {
  const postRes = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const postData = await postRes.json()

  const userRes = await fetch("/api/users?limit=0&select=username,image")
  const userData = await userRes.json()

  const postsWithAuthor = postData.posts.map((post: Post) => ({
    ...post,
    author: userData.users.find((u: User) => u.id === post.userId),
  }))

  return { posts: postsWithAuthor, total: postData.total }
}

export async function fetchPostsByTag(tag: string): Promise<{ posts: Post[]; total: number }> {
  const postRes = await fetch(`/api/posts/tag/${tag}`)
  const postData = await postRes.json()

  const userRes = await fetch("/api/users?limit=0&select=username,image")
  const userData = await userRes.json()

  const postsWithAuthor = postData.posts.map((post: Post) => ({
    ...post,
    author: userData.users.find((u: User) => u.id === post.userId),
  }))

  return { posts: postsWithAuthor, total: postData.total }
}

export async function fetchPostsBySearch(query: string): Promise<{ posts: Post[]; total: number }> {
  const res = await fetch(`/api/posts/search?q=${query}`)
  return await res.json()
}

export async function fetchTags(): Promise<Tag[]> {
  const res = await fetch("/api/posts/tags")
  return await res.json()
}

export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const payload = {
    ...post,
    userId: 1,
  }

  const res = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  return await res.json()
}

export async function updatePost(post: Post): Promise<Post> {
  const res = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return await res.json()
}

export async function deletePost(id: number): Promise<void> {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}
