import { create } from "zustand"
import { Comment } from "../types"

interface CommentStoreState {
  newComment: {
    body: string
    postId: number
    userId: number
    likes: number
  }
  selectedComment: Comment | null

  setNewComment: (v: { body: string; postId: number; userId: number; likes: number }) => void
  setSelectedComment: (c: Comment | null) => void
}

export const useCommentStore = create<CommentStoreState>((set) => ({
  newComment: {
    body: "",
    postId: 0,
    userId: 1,
    likes: 0,
  },
  selectedComment: null,

  setNewComment: (v) => set({ newComment: v }),
  setSelectedComment: (c) => set({ selectedComment: c }),
}))
