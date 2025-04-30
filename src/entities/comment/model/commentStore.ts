import { create } from "zustand"
import { Comment } from "../types"
import * as commentApi from "../api/api"

interface CommentStoreState {
  comments: Record<number, Comment[]>
  newComment: {
    body: string
    postId: number
    userId: number
    likes: number
  }
  selectedComment: Comment | null

  setNewComment: (v: { body: string; postId: number; userId: number; likes: number }) => void
  setSelectedComment: (c: Comment | null) => void

  fetchComments: (postId: number) => Promise<void>
  addComment: () => Promise<boolean>
  updateComment: () => Promise<boolean>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number) => Promise<void>
}

export const useCommentStore = create<CommentStoreState>((set, get) => ({
  comments: {},
  newComment: {
    body: "",
    postId: 0,
    userId: 1,
    likes: 0,
  },
  selectedComment: null,

  setNewComment: (v) => set({ newComment: v }),
  setSelectedComment: (c) => set({ selectedComment: c }),

  fetchComments: async (postId) => {
    const existing = get().comments[postId]
    if (existing) return
    try {
      const data = await commentApi.fetchComments(postId)
      set((state) => ({
        comments: { ...state.comments, [postId]: data },
      }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },

  addComment: async () => {
    const { newComment } = get()
    try {
      const created = await commentApi.addComment(newComment)
      set((state) => ({
        comments: {
          ...state.comments,
          [created.postId]: [...(state.comments[created.postId] || []), created],
        },
        newComment: { body: "", postId: 0, userId: 1, likes: 0 },
      }))
      return true
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      return false
    }
  },

  updateComment: async () => {
    const { selectedComment, comments } = get()
    if (!selectedComment) return false
    try {
      const updated = await commentApi.updateComment(selectedComment.id, selectedComment.body)
      set({
        comments: {
          ...comments,
          [updated.postId]: comments[updated.postId].map((c) => (c.id === updated.id ? updated : c)),
        },
      })
      return true
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
      return false
    }
  },

  deleteComment: async (id, postId) => {
    try {
      await commentApi.deleteComment(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].filter((c) => c.id !== id),
        },
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  },

  likeComment: async (id, postId) => {
    const current = get().comments[postId]?.find((c) => c.id === id)
    if (!current) return
    try {
      const updated = await commentApi.likeComment(id, current.likes + 1)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].map((c) => (c.id === updated.id ? { ...updated, likes: c.likes + 1 } : c)),
        },
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  },
}))
