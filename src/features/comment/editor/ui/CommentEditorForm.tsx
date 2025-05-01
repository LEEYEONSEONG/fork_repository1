import { Comment } from "../../../../entities/comment/types"
import { Button, Textarea } from "../../../../shared/ui"

interface CommentEditorFormProps {
  mode: "create" | "edit"
  comment: Pick<Comment, "body" | "postId" | "likes"> & { userId: number }
  onChange: (comment: CommentEditorFormProps["comment"]) => void
  onSubmit: () => void
}

export const CommentEditorForm = ({ mode, comment, onChange, onSubmit }: CommentEditorFormProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="댓글 내용"
        value={comment.body}
        onChange={(e) => onChange({ ...comment, body: e.target.value })}
      />
      <Button onClick={onSubmit}>{mode === "create" ? "댓글 추가" : "댓글 업데이트"}</Button>
    </div>
  )
}
