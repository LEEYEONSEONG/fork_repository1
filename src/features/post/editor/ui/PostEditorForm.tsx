import { Post } from "../../../../entities/post/types"
import { Button, Input, Textarea } from "../../../../shared/ui"

interface PostEditorFormProps {
  mode: "create" | "edit"
  post: Omit<Post, "id" | "author" | "reactions">
  onChange: (post: Omit<Post, "id" | "author" | "reactions">) => void
  onSubmit: () => void
}

export const PostEditorForm = ({ mode, post, onChange, onSubmit }: PostEditorFormProps) => {
  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={post.title} onChange={(e) => onChange({ ...post, title: e.target.value })} />
      <Textarea
        rows={15}
        placeholder="내용"
        value={post.body}
        onChange={(e) => onChange({ ...post, body: e.target.value })}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={post.userId}
        onChange={(e) => onChange({ ...post, userId: Number(e.target.value) })}
      />
      <Button onClick={onSubmit}>{mode === "create" ? "게시물 추가" : "게시물 업데이트"}</Button>
    </div>
  )
}
