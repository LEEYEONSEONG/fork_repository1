import { ThumbsUp } from "lucide-react"
import { useCommentStore } from "../../../../entities/comment/model/commentStore"
import { Button } from "../../../../shared/ui"

interface LikeButtonProps {
  commentId: number
  postId: number
  count: number
}

export const LikeButton = ({ commentId, postId, count }: LikeButtonProps) => {
  const { likeComment } = useCommentStore()

  const handleLike = () => {
    likeComment(commentId, postId)
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{count}</span>
    </Button>
  )
}
