import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Button } from "../../shared/ui"
import { Plus } from "lucide-react"
import { usePostStore } from "../../entities/post/model/postStore"
import { PostFiltersPanel } from "../../widgets/PostFiltersPanel/ui/PostFiltersPanel"
import { PostTable } from "../../widgets/PostTable/ui/PostTable"
import { PostFormDialog } from "../../widgets/PostFormDialog/ui/PostFormDialog"
import { PostDetailDialog } from "../../widgets/PostDetailDialog/ui/PostDetailDialog"
import { Pagination } from "../../features/post/pagination/ui/Pagination"
import { useAddPostMutation, useUpdatePostMutation } from "../../entities/post/queries/usePostMutation"
import { Post } from "../../entities/post/types"
import { useAddCommentMutation, useUpdateCommentMutation } from "../../entities/comment/queries/useCommentMutation"
import { useCommentStore } from "../../entities/comment/model/commentStore"
import { CommentFormDialog } from "../../widgets/CommentFormDialog/ui/CommentFormDialog"
import { UserDetailDialog } from "../../widgets/UserDetailDialog/ui/UserDetailDialog.tsx"

const PostManagerPage = () => {
  const { newPost, selectedPost, setNewPost, setSelectedPost } = usePostStore()
  const { newComment, selectedComment, setNewComment, setSelectedComment } = useCommentStore()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  const { mutateAsync: addComment } = useAddCommentMutation()
  const { mutateAsync: updateComment } = useUpdateCommentMutation()

  const { mutateAsync: addMutation } = useAddPostMutation()
  const { mutateAsync: updateMutation } = useUpdatePostMutation()

  const handleAddComment = async () => {
    await addComment(newComment)
    setNewComment({ body: "", postId: selectedPost?.id || 0, userId: 1, likes: 0 })
    setShowAddCommentDialog(false)
  }

  const handleUpdateComment = async () => {
    if (selectedComment) {
      await updateComment({ id: selectedComment.id, body: selectedComment.body })
      setShowEditCommentDialog(false)
    }
  }

  const handleAddPost = async () => {
    const success = await addMutation(newPost)
    if (success) {
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    }
  }

  const handleUpdatePost = async () => {
    if (selectedPost) {
      await updateMutation(selectedPost)
      setShowEditDialog(false)
    }
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  const openUserDetail = (post: Post) => {
    setSelectedPost(post)
    setShowUserModal(true)
  }

  const openPostEditor = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFiltersPanel />
          <PostTable onOpenDetail={openPostDetail} onOpenUser={openUserDetail} onEdit={openPostEditor} />
          <Pagination />
        </div>
      </CardContent>
      <PostFormDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        mode="create"
        post={newPost}
        onChange={setNewPost}
        onSubmit={handleAddPost}
      />

      {selectedPost && (
        <PostFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          mode="edit"
          post={selectedPost}
          onChange={(updated) => setSelectedPost({ ...selectedPost, ...updated })}
          onSubmit={handleUpdatePost}
        />
      )}

      <PostDetailDialog
        isOpen={showDetailDialog}
        onClose={() => setShowDetailDialog(false)}
        post={selectedPost}
        onAddComment={() => {
          setShowAddCommentDialog(true)
        }}
        onEditComment={() => {
          setShowEditCommentDialog(true)
        }}
      />
      <CommentFormDialog
        isOpen={showAddCommentDialog}
        onClose={() => setShowAddCommentDialog(false)}
        mode="create"
        comment={newComment}
        onChange={setNewComment}
        onSubmit={handleAddComment}
      />

      {selectedComment && (
        <CommentFormDialog
          isOpen={showEditCommentDialog}
          onClose={() => setShowEditCommentDialog(false)}
          mode="edit"
          comment={{
            body: selectedComment.body,
            postId: selectedComment.postId,
            likes: selectedComment.likes,
            userId: selectedComment.user.id,
          }}
          onChange={(updated) => setSelectedComment({ ...selectedComment, body: updated.body })}
          onSubmit={handleUpdateComment}
        />
      )}

      <UserDetailDialog
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        userId={selectedPost?.author?.id || 0}
      />
    </Card>
  )
}

export default PostManagerPage
