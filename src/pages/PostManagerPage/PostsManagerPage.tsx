import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, Button } from "../../shared/ui"
import { Plus } from "lucide-react"
import { usePostStore } from "../../entities/post/model/postStore"
import { PostFiltersPanel } from "../../widgets/PostFiltersPanel/ui/PostFiltersPanel"
import { PostTable } from "../../widgets/PostTable/ui/PostTable"
import { PostFormDialog } from "../../widgets/PostFormDialog/ui/PostFormDialog"
import { PostDetailDialog } from "../../widgets/PostDetailDialog/ui/PostDetailDialog"
import { Post } from "../../entities/post/types"
import { Pagination } from "../../features/post/pagination/ui/Pagination"

const PostManagerPage = () => {
  const {
    skip,
    limit,
    posts,
    newPost,
    selectedPost,
    selectedTag,
    searchQuery,
    setNewPost,
    setSelectedPost,
    addPost,
    updatePost,
    deletePost,
    loading,
    fetchPosts,
    fetchPostsBySearch,
    fetchPostsByTag,
  } = usePostStore()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  const openPostEditor = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  useEffect(() => {
    if (selectedTag) fetchPostsByTag(selectedTag)
    else if (searchQuery) fetchPostsBySearch()
    else fetchPosts()
  }, [skip, limit, selectedTag, searchQuery])

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
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable posts={posts} onOpenDetail={openPostDetail} onEdit={openPostEditor} onDelete={deletePost} />
          )}
          <Pagination />
        </div>
      </CardContent>

      {/* 게시물 추가 다이얼로그 */}
      <PostFormDialog
        isOpen={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        mode="create"
        post={newPost}
        onChange={setNewPost}
        onSubmit={addPost}
      />

      {/* 게시물 수정 다이얼로그 */}
      {selectedPost && (
        <PostFormDialog
          isOpen={showEditDialog}
          onClose={() => setShowEditDialog(false)}
          mode="edit"
          post={selectedPost}
          onChange={(updated) => selectedPost && setSelectedPost({ ...selectedPost, ...updated })}
          onSubmit={updatePost}
        />
      )}

      {/* 게시물 상세보기 다이얼로그 */}
      <PostDetailDialog isOpen={showDetailDialog} onClose={() => setShowDetailDialog(false)} post={selectedPost} />
    </Card>
  )
}

export default PostManagerPage
