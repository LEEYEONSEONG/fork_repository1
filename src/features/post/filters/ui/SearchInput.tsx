import { Search } from "lucide-react"

import { Input } from "../../../../shared/ui"
import { usePostStore } from "../../../../entities/post/model/postStore"

export const SearchInput = () => {
  const { searchQuery, setSearchQuery } = usePostStore()

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="게시물 검색..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  )
}
