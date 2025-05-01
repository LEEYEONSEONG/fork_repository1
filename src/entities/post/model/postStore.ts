// src/entities/post/model/postStore.ts
import { create } from "zustand"
import { Post } from "../types"

interface PostStoreState {
  selectedPost: Post | null
  total: number
  newPost: Omit<Post, "id">
  selectedTag: string
  searchQuery: string
  sortBy: string
  sortOrder: string
  skip: number
  limit: number

  setSelectedPost: (post: Post | null) => void
  setNewPost: (post: Omit<Post, "id">) => void
  setSelectedTag: (tag: string) => void
  setSearchQuery: (query: string) => void
  setSortBy: (value: string) => void
  setSortOrder: (value: string) => void
  setSkip: (v: number) => void
  setLimit: (v: number) => void
}

export const usePostStore = create<PostStoreState>((set) => ({
  selectedPost: null,
  newPost: { title: "", body: "", userId: 1 },
  selectedTag: "",
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  skip: 0,
  limit: 10,

  setSelectedPost: (post) => set({ selectedPost: post }),
  setNewPost: (post) => set({ newPost: post }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (value) => set({ sortBy: value }),
  setSortOrder: (value) => set({ sortOrder: value }),
  setSkip: (v) => set({ skip: v }),
  setLimit: (v) => set({ limit: v }),
}))
