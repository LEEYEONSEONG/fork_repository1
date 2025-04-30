import { useEffect } from "react"

import { Edit2, Trash2 } from "lucide-react"
import { useCommentStore } from "../../../entities/comment/model/commentStore"
import { LikeButton } from "../../../features/comment/likes/ui/LikeButton"
import { Button } from "../../../shared/ui"

interface CommentListProps {
  postId: number
}

export const CommentList = ({ postId }: CommentListProps) => {
  const { comments, fetchComments, deleteComment, setSelectedComment } = useCommentStore()

  useEffect(() => {
    fetchComments(postId)
  }, [fetchComments, postId])

  const commentList = comments[postId] || []

  return (
    <div className="mt-2">
      <h3 className="text-sm font-semibold mb-2">댓글</h3>
      <div className="space-y-1">
        {commentList.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{comment.body}</span>
            </div>
            <div className="flex items-center space-x-1">
              <LikeButton commentId={comment.id} postId={postId} count={comment.likes} />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
