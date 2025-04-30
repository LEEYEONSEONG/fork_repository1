import { usePostStore } from "../../../../entities/post/model/postStore"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../shared/ui"

export const Pagination = () => {
  const { skip, limit, total, setSkip, setLimit } = usePostStore()

  const handlePrev = () => {
    setSkip(Math.max(0, skip - limit))
  }

  const handleNext = () => {
    setSkip(skip + limit)
  }

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(v) => setLimit(Number(v))}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={handlePrev}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}
