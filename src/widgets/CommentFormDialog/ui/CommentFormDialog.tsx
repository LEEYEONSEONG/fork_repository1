import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentEditorForm } from "../../../features/comment/editor/ui/CommentEditorForm"
import { Comment } from "../../../entities/comment/types"

interface CommentFormDialogProps {
  isOpen: boolean
  onClose: () => void
  mode: "create" | "edit"
  comment: Pick<Comment, "body" | "postId" | "likes"> & { userId: number }
  onChange: (updated: Pick<Comment, "body" | "postId" | "likes"> & { userId: number }) => void
  onSubmit: () => void
}

export const CommentFormDialog = ({ isOpen, onClose, mode, comment, onChange, onSubmit }: CommentFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "새 댓글 추가" : "댓글 수정"}</DialogTitle>
        </DialogHeader>
        <CommentEditorForm mode={mode} comment={comment} onChange={onChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
