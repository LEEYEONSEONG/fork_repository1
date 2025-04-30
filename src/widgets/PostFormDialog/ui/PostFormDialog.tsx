import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { Post } from "../../../entities/post/types"
import { PostEditorForm } from "../../../features/post/editor/ui/PostEditorForm"

interface PostFormDialogProps {
  isOpen: boolean
  onClose: () => void
  mode: "create" | "edit"
  post: Omit<Post, "id" | "author" | "reactions">
  onChange: (post: Omit<Post, "id" | "author" | "reactions">) => void
  onSubmit: () => void
}

export const PostFormDialog = ({ isOpen, onClose, mode, post, onChange, onSubmit }: PostFormDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "새 게시물 추가" : "게시물 수정"}</DialogTitle>
        </DialogHeader>
        <PostEditorForm mode={mode} post={post} onChange={onChange} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
