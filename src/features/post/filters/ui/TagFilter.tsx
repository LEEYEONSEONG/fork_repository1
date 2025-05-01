import { usePostStore } from "../../../../entities/post/model/postStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui"
import { useTagsQuery } from "../../../../entities/post/queries/usePostsQuery"

export const TagFilter = () => {
  const { selectedTag, setSelectedTag } = usePostStore()
  const { data: tags, isSuccess } = useTagsQuery()

  const handleChange = (value: string) => {
    setSelectedTag(value)
  }

  return (
    <Select value={selectedTag} onValueChange={handleChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {isSuccess &&
          tags.map((tag) => (
            <SelectItem key={tag.slug} value={tag.slug}>
              {tag.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
