export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  author?: {
    id: number
    username: string
    image: string
  }
}

export interface Tag {
  slug: string
  name: string
  url: string
}

export interface UsePostsQueryParams {
  skip: number
  limit: number
  search?: string
  tag?: string
}
