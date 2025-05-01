import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Post } from "../../../entities/post/types"
import { CommentList } from "../../../features/comment/list/ui/CommentList"

interface PostDetailDialogProps {
  isOpen: boolean
  onClose: () => void
  post: Post | null
  onAddComment: () => void
  onEditComment: () => void
}

export const PostDetailDialog = ({ isOpen, onClose, onAddComment, onEditComment, post }: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{post.body}</p>
          <CommentList postId={post.id} onAddComment={onAddComment} onEditComment={onEditComment} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
