import { ThumbsUp } from "lucide-react"

import { Button } from "../../../../shared/ui"

import { useLikeCommentMutation } from "../../../../entities/comment/queries/useCommentMutation"

interface LikeButtonProps {
  commentId: number
  count: number
}

export const LikeButton = ({ commentId, count }: LikeButtonProps) => {
  const { mutate } = useLikeCommentMutation()

  const handleLike = () => {
    mutate({ id: commentId, likes: count })
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{count}</span>
    </Button>
  )
}
