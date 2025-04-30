import { SearchInput } from "../../../features/post/filters/ui/SearchInput"
import { SortSelector } from "../../../features/post/filters/ui/SortSelector"
import { TagFilter } from "../../../features/post/filters/ui/TagFilter"

export const PostFiltersPanel = () => {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1">
        <SearchInput />
      </div>
      <TagFilter />
      <SortSelector />
    </div>
  )
}
