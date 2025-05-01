import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Button } from "../../shared/ui"
import { Plus } from "lucide-react"
import { usePostStore } from "../../entities/post/model/postStore"
import { PostFiltersPanel } from "../../widgets/PostFiltersPanel/ui/PostFiltersPanel"
import { PostTable } from "../../widgets/PostTable/ui/PostTable"
import { PostFormDialog } from "../../widgets/PostFormDialog/ui/PostFormDialog"
import { PostDetailDialog } from "../../widgets/PostDetailDialog/ui/PostDetailDialog"
import { Pagination } from "../../features/post/pagination/ui/Pagination"
import { usePostsQuery } from "../../entities/post/queries/usePostsQuery"
import {
  useAddPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../entities/post/queries/usePostMutation"
import { Post } from "../../entities/post/types"

const PostManagerPage = () => {
  const { skip, limit, newPost, selectedPost, selectedTag, searchQuery, setNewPost, setSelectedPost } = usePostStore()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const { data, isLoading } = usePostsQuery({ skip, limit, search: searchQuery, tag: selectedTag })
  const posts = useMemo(() => data?.posts || [], [data])

  const { mutateAsync: addMutation } = useAddPostMutation()
  const { mutateAsync: updateMutation } = useUpdatePostMutation()
  const { mutateAsync: deleteMutation } = useDeletePostMutation()

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

  const handleDeletePost = async (id: number) => {
    await deleteMutation(id)
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
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
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              onOpenDetail={openPostDetail}
              onEdit={openPostEditor}
              onDelete={handleDeletePost}
            />
          )}
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

      <PostDetailDialog isOpen={showDetailDialog} onClose={() => setShowDetailDialog(false)} post={selectedPost} />
    </Card>
  )
}

export default PostManagerPage
