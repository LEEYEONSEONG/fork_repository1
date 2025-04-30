import { create } from "zustand"
import { Post, Tag } from "../types"
import * as postApi from "../api/api"

interface PostStoreState {
  posts: Post[]
  total: number
  newPost: Omit<Post, "id">
  selectedPost: Post | null
  tags: Tag[]
  loading: boolean
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string

  setSkip: (v: number) => void
  setLimit: (v: number) => void
  setSearchQuery: (v: string) => void
  setSortBy: (v: string) => void
  setSortOrder: (v: string) => void
  setSelectedTag: (v: string) => void
  setNewPost: (p: Omit<Post, "id">) => void
  setSelectedPost: (p: Post | null) => void

  fetchPosts: () => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  fetchPostsBySearch: () => Promise<void>
  fetchTags: () => Promise<void>
  addPost: () => Promise<boolean>
  updatePost: () => Promise<boolean>
  deletePost: (id: number) => Promise<void>
}

export const usePostStore = create<PostStoreState>((set, get) => ({
  posts: [],
  total: 0,
  tags: [],
  newPost: { title: "", body: "", userId: 1 },
  selectedPost: null,
  loading: false,
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",

  setSkip: (v) => set({ skip: v }),
  setLimit: (v) => set({ limit: v }),
  setSearchQuery: (v) => set({ searchQuery: v }),
  setSortBy: (v) => set({ sortBy: v }),
  setSortOrder: (v) => set({ sortOrder: v }),
  setSelectedTag: (v) => set({ selectedTag: v }),
  setNewPost: (p) => set({ newPost: p }),
  setSelectedPost: (p) => set({ selectedPost: p }),

  fetchPosts: async () => {
    const { skip, limit } = get()
    set({ loading: true })
    try {
      const res = await postApi.fetchPosts(skip, limit)
      set({ posts: res.posts, total: res.total })
    } finally {
      set({ loading: false })
    }
  },

  fetchPostsByTag: async (tag) => {
    set({ loading: true })
    try {
      const res = await postApi.fetchPostsByTag(tag)
      set({ posts: res.posts, total: res.total })
    } finally {
      set({ loading: false })
    }
  },

  fetchPostsBySearch: async () => {
    const { searchQuery } = get()
    set({ loading: true })
    try {
      const res = await postApi.fetchPostsBySearch(searchQuery)
      set({ posts: res.posts, total: res.total })
    } finally {
      set({ loading: false })
    }
  },

  fetchTags: async () => {
    try {
      const data = await postApi.fetchTags()
      set({ tags: data })
    } catch (e) {
      console.error("태그 가져오기 오류", e)
    }
  },
  addPost: async () => {
    try {
      const created = await postApi.addPost(get().newPost)
      set((state) => ({
        posts: [created, ...state.posts],
        newPost: { title: "", body: "", userId: 1 },
      }))
      return true
    } catch {
      return false
    }
  },

  updatePost: async () => {
    const current = get().selectedPost
    if (!current) return false
    try {
      const updated = await postApi.updatePost(current)
      set((state) => ({
        posts: state.posts.map((p) => (p.id === updated.id ? updated : p)),
      }))
      return true
    } catch {
      return false
    }
  },

  deletePost: async (id) => {
    await postApi.deletePost(id)
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    }))
  },
}))
