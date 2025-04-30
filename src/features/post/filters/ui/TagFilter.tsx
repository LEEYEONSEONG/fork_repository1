import { useEffect } from "react"
import { usePostStore } from "../../../../entities/post/model/postStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui"

export const TagFilter = () => {
  const { tags, selectedTag, setSelectedTag, fetchTags, fetchPostsByTag } = usePostStore()

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleChange = (value: string) => {
    setSelectedTag(value)
    fetchPostsByTag(value)
  }

  return (
    <Select value={selectedTag} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.slug} value={tag.slug}>
            {tag.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
